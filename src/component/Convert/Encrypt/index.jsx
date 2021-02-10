import CryptoJS from 'crypto-js';

const encryptPass = (textPass) => {
  const words = CryptoJS.enc.Utf8.parse(textPass);
  const base64 = CryptoJS.enc.Base64.stringify(words);
  return base64;
};

export default encryptPass;
