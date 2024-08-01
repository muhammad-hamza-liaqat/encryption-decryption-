const CryptoJS = require('crypto-js');

const encryptionKey = process.env.ENCRYPTION_KEY;

const key = CryptoJS.enc.Utf8.parse(encryptionKey.substring(0, 16));

const doEncryption = (message) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
};

const doDecryption = (encryptedMessage) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Decryption failed: ' + error.message);
  }
};

module.exports = {
  doEncryption,
  doDecryption
};
