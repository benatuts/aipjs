let x = [10,14,48,3];
let y = [49,5,20,5,22];

const average = (list) => list.reduce((acc,curr) => acc + curr, 0) / list.length;
console.log(
    'x',
    average(x) > average(y) ? 'is' : 'is not',
    'greater'
);