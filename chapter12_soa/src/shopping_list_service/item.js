const uuid = require('uuid');

// This class represents Items in a simple shopping list
// Items are identified by their unique id
class Item {
    constructor(description, quantity) {
        this.description = description;
        this.quantity = quantity;
        
        // Identify each item by a randomly generated UUID
        this.id = uuid.v4(); 
    }

    // Generate a JSON representation of the public state
    // This representation is sent to clients of the web API
    toJSON() {
        return { 
            id: this.id, 
            description: this.description,
            quantity: this.quantity,
        }
    }
}

module.exports = { Item };