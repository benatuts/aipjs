db = new Mongo().getDB('shoppingDB');

print('Deleting existing shopping list items');
db.items.drop();
db.items.createIndex({description: 1});

print('Inserting shopping list items');
db.items.insert({description: 'Chocolate bar', quantity: 5});
db.items.insert({description: 'Pasta', quantity: 1});
db.items.insert({description: 'Banana', quantity: 5});
db.items.insert({description: 'Banana', quantity: 3});
db.items.insert({description: 'Cheese slices', quantity: 10});
db.items.insert({description: 'Carrot', quantity: 8});
db.items.insert({description: 'Carrot', quantity: 1});
