const crypto = require('crypto');
const fs = require('fs');
const inquirer = require('inquirer');

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });

    fs.writeFile('./src/keys/public.pem', publicKey, {
        encoding: 'utf8',
        flag: 'w'
    }, function (err) {
      if (err) return console.log(err);
    });
    fs.writeFile('./src/keys/private.pem', privateKey, {
        encoding: 'utf8',
        flag: 'w'
    }, function (err) {
        if (err) return console.log(err);
    });
    console.log('Clés générées avec succès');
    return 
}

const getPublicKey = () => {
    return fs.readFileSync('./src/keys/public.pem', 'utf8')
}
const getPrivateKey = () => {
    return fs.readFileSync('./src/keys/private.pem', 'utf8')
}
const encryptAsym = async () => {
    const {message} = await inquirer.prompt({
        type: 'input',
        name: 'message',
        message: 'Message à chiffrer',
    });
    const buffer = Buffer.from(message, 'utf-8');
    const encrypted = crypto.publicEncrypt(getPublicKey(), buffer);
    console.log(encrypted.toString('base64'));
}

const decryptAsym = async () => {
    const {message} = await inquirer.prompt({
        type: 'input',
        name: 'message',
        message: 'Message à déchiffrer',
    });
    const buffer = Buffer.from(message, 'base64');
    const decrypted = crypto.privateDecrypt(getPrivateKey(), buffer);
    console.log(decrypted.toString('utf-8'));
}

module.exports = {
    generateKeyPair,
    encryptAsym,
    decryptAsym,
    getPublicKey,
    getPrivateKey
}