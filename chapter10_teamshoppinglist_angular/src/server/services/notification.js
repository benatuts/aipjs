// Notify all team members that a new item has been added to the shopping list
function notifyNewItem(description) {
    console.log(`---------------------------------------------`);
    console.log(`To: Everyone`);
    console.log(`From: shopping list app`);
    console.log(`Please buy this item: ${description}`);
}

// Notify all team members that an item has been deleted from the shopping list
function notifyDeletedItem(description) {
    console.log(`---------------------------------------------`);
    console.log(`To: Everyone`);
    console.log(`From: shopping list app`);
    console.log(`Warning! Please don't buy this item: ${description}`);
}

module.exports = { notifyNewItem, notifyDeletedItem };