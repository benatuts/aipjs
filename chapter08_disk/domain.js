const persistence = require('./persistence');

// Compute the total quantity of items
function computeTotalQuantity() {
    let total = 0;
    for (let item of persistence.findAllItems()) {
        total += item.quantity;
    }
    return total;
}

module.exports = { computeTotalQuantity };