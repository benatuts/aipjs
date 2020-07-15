function average(items) {
    let total = 0;
    for (let i=0; i<items.length; i++) {
        total = total + items[i];
    }
    return total / items.length;
}

function firstHasGreaterAverage(first, second) {
    return average(first) > average(second);
}

let x = [10,14,48,3];
let y = [49,5,20,5,22];

if (firstHasGreaterAverage(x, y))
    console.log('x is greater');
else
    console.log('x is not greater');