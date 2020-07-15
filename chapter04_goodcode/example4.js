// Average of a non-empty array
// an empty array returns NaN
function average(items) {
    let total = 0;
    for (let item of items) {
        total = total + items[i];
    }
    return total / items.length;
}

let x = [10,14,48,3];
let y = [49,5,20,5,22];

if (average(x) > average(y))
    console.log('x is greater');
else
    console.log('x is not greater');