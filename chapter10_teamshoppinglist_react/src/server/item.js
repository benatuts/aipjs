const uuid = require('uuid');

// Services used by Item
const notificationService = require('./services/notification.js');
const iconService = require('./services/icon.js');
const expenseService = require('./services/expense.js');

// This class represents Items in the team shopping list
// Items are identified by their unique id
class Item {
    constructor(description, quantity) {
        this.description = description;
        this.quantity = quantity;
        
        // Identify each item by a randomly generated UUID
        this.id = uuid.v4(); 
        
        // Set the initial state
        this.isBuying = false;
        this.isBought = false;
        this.isDeleted = false;
        
        // Notify the team about the new item
        notificationService.notifyNewItem(this.description);

        // Generate an icon
        this.icon = iconService.generateIcon(this.description);
    }

    // An item in the initial state can be made ready to purchase
    readyToPurchase() {
        if (!this.isDeleted && !this.isBought) {
            this.isBuying = true;
            return true;
        } else {
            return false;
        }
    }

    // An item that is ready to purchase can be purchased
    // Once purchased, it should no longer be seen by users
    purchase() {
        if (this.isBuying) {
            this.isBuying = false;
            this.isBought = true;
            expenseService.createExpense(this.description, this.quantity);
            return true;
        } else {
            return false;
        }
    }

    // An item in the initial state can be permanently deleted
    // Once deleted, it should no longer be seen by users
    delete() {
        if (!this.isDeleted && !this.isBuying && !this.isBought) {
            notificationService.notifyDeletedItem(this.description);
            this.isDeleted = true;
            return true;
        } else {
            return false;
        }
    }

    // Generate a JSON representation of the public state
    // This representation is sent to clients of the web API
    toJSON() {
        return { 
            id: this.id, 
            description: this.description,
            quantity: this.quantity,
            isBuying: this.isBuying,
            icon: this.icon
        }
    }
}

module.exports = { Item };