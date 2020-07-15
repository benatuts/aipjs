import * as React from 'react';

// Retrieve the current state of all shopping list items
async function fetchItems() {
    let result = await fetch('/api/items');
    let json = await result.json();
    return json.items;
}

// Create a new shopping list item
//
// Returns the updated list of items
async function createItem(description, quantity) {
    let result = await fetch('/api/items/new',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description,
                quantity
            })
        }
    );
    let json = await result.json();
    return json.items;
}

// Update a shopping list item
//
// Action is one of:
//   - 'ready': the item is ready to purchase
//   - 'purchase': the item has been bought
//   - 'delete': the item is no longer wanted
// Returns the updated list of items
async function performAction(id, action) {
    let result = await fetch(`/api/items/${id}/${action}`,
        {
            method: 'POST'
        }
    );
    let json = await result.json();
    return json.items;
}

// A team shopping list 
export class ShoppingList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            quantity: 0,
            items: []
        };
    }

    // On first page request, retrieve current items
    async componentDidMount() {
        this.setState({items: await fetchItems()});
    }

    // Handle "Add" button
    async doAdd() {
        let { description, quantity } = this.state;
        quantity = parseFloat(quantity);
        this.setState({ items: await createItem(description, quantity) });
    }

    // Handle "Ready to purchase" button
    async doReady(id) {
        this.setState({ items: await performAction(id, 'ready') });
    }

    // Handle "Delete" button
    async doDelete(id) {
        this.setState({ items: await performAction(id, 'delete') });
    }

    // Handle "Purchase" button
    async doPurchase(id) {
        this.setState({ items: await performAction(id, 'purchase') })
    }

    render() {
        const { description, quantity, items } = this.state;

        // Generate a table of items in the shopping list
        let itemStatus = <p>No items are in the shopping list.</p>;
        if (items.length > 0) {
            const rows = items.map(item => 
                <tr key={item.id}>
                    <td>{item.icon}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>
                        { item.isBuying
                        ? 
                            <button onClick={() => this.doPurchase(item.id)}>Purchase</button>
                        :
                            <React.Fragment>
                                <button onClick={() => this.doReady(item.id)}>Ready to Purchase</button>
                                <button onClick={() => this.doDelete(item.id)}>Delete</button>
                            </React.Fragment>
                        }           
                    </td>
                </tr>
            );

            itemStatus = (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            );
        }

        // Render the shopping list and editor inputs
        return (
            <React.Fragment>
                <h1>AIP team shopping list</h1>
                <h2>Current items:</h2>
                { itemStatus }
                <h2>Add item:</h2>
                <p>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={event => this.setState({description: event.target.value})} />
                    </label>
                </p>
                <p>
                    <label>
                        Quantity:
                        <input type="number" value={quantity} onChange={event => this.setState({quantity: event.target.value})} />
                    </label>
                </p>
                <p>
                    <button onClick={() => this.doAdd()}>Add</button>
                </p>
            </React.Fragment>
        );
    }
}