const items = require('./item.js');

// An Array is being used as a simple "in-memory database"
let itemData = [];

// Persist an item in the database
function add(item) {
    itemData.push(item);
}

// Find items in the database by matching id (a UUID value)
function findById(id) {
    return itemData.find(item => item.id === id);
}

// Find all active items in the database: items that are neither bought not deleted
function findActive() {
    return itemData.filter(value => !value.isDeleted && !value.isBought);
}

module.exports = { add, findById, findActive };