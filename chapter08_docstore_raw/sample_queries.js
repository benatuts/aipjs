db = new Mongo().getDB('shoppingDB');

print('What are all the items in the shopping list, in order?');
result = db.items.find().sort({description: 1});

while (result.hasNext())
    printjson(result.next());


print('Which items start with "C"?');
result = db.items.find({description: {$regex: /^C/}});

while (result.hasNext())
    printjson(result.next());


print('What items have a total quantity greater than six?');
result = db.items.aggregate(
    [
        { $group: {_id: '$description', total: { $sum: '$quantity'}} },
        { $match: { total: { $gt: 6 }}},
        { $project: { _id: 0, description: '$_id', quantity: '$total'} }
    ]
);

while (result.hasNext())
    printjson(result.next());
