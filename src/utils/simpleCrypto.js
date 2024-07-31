const SimpleCrypto = require('simple-crypto-js').default;
require('dotenv').config();
const crypto = new SimpleCrypto(encryptionKey);

const encryptionKey = process.env.ENCRYPTION_KEY;

const encryptMessage = (message) => {
  try {
    return crypto.encrypt(message);
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
};

const decryptMessage = (encryptedMessage) => {
  try {
    return crypto.decrypt(encryptedMessage);
  } catch (error) {
    throw new Error('Decryption failed: ' + error.message);
  }
};

module.exports = {
  encryptMessage,
  decryptMessage
};
