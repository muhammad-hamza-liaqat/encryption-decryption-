const CryptoJS = require('crypto-js');

const encryptionKey = process.env.ENCRYPTION_KEY;

if (encryptionKey.length !== 16) {
  throw new Error('ENCRYPTION_KEY must be exactly 16 characters long for AES-128 encryption.');
  // console.warn('ENCRYPTION_KEY is longer than 16 characters. It will be truncated to 16 characters.');
}

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


// handling objects encryption and decryption
const encryptObject = (obj) => {
  let encryptedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    encryptedObj[key] = doEncryption(value);
  }
  return encryptedObj;
};

const decryptObject = (obj) => {
  let decryptedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    decryptedObj[key] = doDecryption(value);
  }
  return decryptedObj;
};

module.exports = {
  encryptObject,
  decryptObject
};
