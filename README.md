# node-encryption
Quick workshop to encrypt with symmetric and asymmetric algorithm using node's built-in crypto module

## Definitions

**IV** : **Initiation Vector** used in combination with a cipher algorithm (symmetric one) to create a new ciphered message that is more complex to crack because of its randomness.
Its use is more or less like a salt when hashing data, encipherment algorithm can be cracked if we don't use IV, an attacker can detect some pattern to discover the enciphered data.
\
The IV can be part of the enciphered data or send in a different file in order for the receiver to decipher the data.

## Dependencies

`npm install` installs inquirer (prompt interaction) and dotenv (process environment variable) to use the node project

## Symmetrical algorithm

Generate your key using `node generate-key.js` that stores a `aes` key in an .env file. \
Then `npm start` and type `0` to encrypt a message with a symmetrical algorithm.

## Asymmetrical algorithm

`npm start` and type `1` to interact with the prompt to generate key pairs & to cipher (public key) or decipher (private key) a message.
