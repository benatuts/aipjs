function firstHasGreaterAverage(f, s) {
    let ft = 0;
    let st = 0;
    for (let i=0; i<f.length; i++) {
        ft = ft + f[i];
    }
    for (let i=0; i<s.length; i++) {
        st = st + s[i];
    }
    return ft/f.length > st/f.length;
}

let x = [10,14,48,3];
let y = [49,5,20,5,22];

if (firstHasGreaterAverage(x, y))
    console.log('x is greater');
else
    console.log('x is not greater');
