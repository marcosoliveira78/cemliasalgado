import CryptoJS from 'crypto-js';

const decryptPass = (encryptText) => {
  const wordsDecrypt = CryptoJS.enc.Base64.parse(encryptText);
  const stringDecrypt = CryptoJS.enc.Utf8.stringify(wordsDecrypt);
  return stringDecrypt;
};

export default decryptPass;
