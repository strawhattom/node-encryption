require('dotenv/config');

const inquirer = require('inquirer');

const { encrypt, decrypt } = require('./src/symmetric');
const { generateKeyPair, encryptAsym, decryptAsym } = require('./src/asymmetric');

const key = process.env.KEY;

const symmetric = async () => {
  const answers = await inquirer.prompt([
    {
      name: "cipher",
      message: "Quel message voulez-vous chiffrer ?"
    }
  ]);
  const message = answers['cipher'];
  const cipher = encrypt(message, key);
  console.log(`Cipher (iv:message): ${cipher}`);
  const decipher = decrypt(cipher, key);
  console.log(`Decipher: ${decipher}`);
}

const asymmetric = async () => {
  let done = false;
  while (!done) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
          name: 'action',
          message: 'Action: ',
          choices: [
            { name: 'Génerer une paire de clé publique/privée', value: 'generate' },
            { name: 'Chiffrer un message', value: 'encrypt' },
            { name: 'Déchiffrer un message', value: 'decrypt' },
            { name: 'Quitter', value: 'quit'}
          ],
      }
    ]);

    switch (answers['action']) {
      case 'generate':
        generateKeyPair();
        break;
      case 'encrypt':
        await encryptAsym();
        break;
      case 'decrypt':
        await decryptAsym();
        break;
      case 'quit':
        done = true;
        break;
      default:
        continue;
    }
  }
}

const main = async () => {
  let done = false;
  while (!done) {
    try {
      const answers = await inquirer.prompt([{
        type: "number",
        name: "type",
        message: "Quel type de chiffrement voulez-vous utiliser ? (1:asymétrique/0:symétrique)",
      }]);

      switch (answers['type']) {
        case 1:
          console.log("asymétrique");
          await asymmetric();
          break;
        case 0:
          console.log("symétrique");
          await symmetric();
          break;
        default:
          console.log("Veuillez entrer 1 ou 0");
          continue;
      }
      done = true;
    } catch (error) {
      if (error.isTtyError) {
        console.error(error)
      } else {
        console.error(error)
      }
    }
  }
}

main();

