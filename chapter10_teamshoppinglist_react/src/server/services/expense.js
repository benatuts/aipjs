const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Target directory is '/expenses' in the project root
const expenseDirectory = path.join(__dirname, '../../../expenses');

// Generate an expense in JSON format for an expense management system
// The expense management system scans /expenses for new files
function createExpense(description, quantity) {
    // Create the message for the expense management system
    let message = JSON.stringify(
        {
            description, 
            quantity, 
            date: new Date() 
        },
        null,
        4 // generate pretty-printed JSON (indented by 4 spaces)
    );

    // Then, save it to the common directory...
    
    // Generate a random filename
    // Theoretically, UUIDv4 should be unique
    // (in practice it may be a good idea to confirm)
    let filename = uuid.v4() + '.expense';

    // Write to the message to the file, ensuring that we do not overwrite existing files
    fs.writeFileSync(
        path.join(expenseDirectory, filename),
        message,
        { flag: 'wx' }
    );
}


module.exports = { createExpense };