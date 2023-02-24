const fs = require('fs')
const {randomBytes} = require('crypto');
const key = randomBytes(16).toString('hex');
console.log(`key: ${key}`);
console.log(`key length: ${key.length}`);

fs.readFile('.env', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(/KEY=.*/g, `KEY=${key}`);
    
    fs.writeFile('.env', result, 'utf8', function (err) {
         if (err) return console.log(err);
    });

    console.log('key generated successfully');
    }
);