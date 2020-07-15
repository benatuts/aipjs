const delay = require('delay');

// Create a promise
// a value is returned immediately (a Promise)
// but that promise takes 2 seconds to resolve
let x = delay(2000);

// The value in x is a Promise
console.log(x);

// Set a callback on the promise
// This callback will be invoked when the promise is resolved
let y = x.then(() => console.log('Two seconds elapsed'));

// The value in y is also a Promise
console.log(y);

console.log('Finished script')

// Finally, "Two seconds elapsed' will print when the promise resolves itself, before Node.js exits