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

// A simple shopping list 
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

    render() {
        const { description, quantity, items } = this.state;

        // Generate a table of items in the shopping list
        let itemStatus = <p>No items are in the shopping list.</p>;
        if (items.length > 0) {
            const rows = items.map(item => 
                <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                </tr>
            );

            itemStatus = (
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
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