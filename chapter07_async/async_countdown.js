const delay = require('delay');

async function countdown() {
    console.log('Three');
    await delay(1000);
    console.log('Two');
    await delay(1000);
    console.log('One');
    await delay(1000);
    console.log('Go!');
}

countdown();
