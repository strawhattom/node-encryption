const crypto = require('crypto');

function encrypt(input, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
    const encryptedData = Buffer.concat([iv, encrypted]);
    return `${iv.toString('hex')}:${encryptedData.toString('hex')}`;
}

function decrypt(cipher, key) {
    const split = cipher.split(':');
    const iv = Buffer.from(split[0], 'hex');
    const encrypted = Buffer.from(split[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.slice(split[0].length/2).toString();
}

module.exports = {
    encrypt,
    decrypt
}