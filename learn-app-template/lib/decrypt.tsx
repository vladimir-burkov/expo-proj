import CryptoJS from 'crypto-js';

export async function loadEncryptedMarkdown(url: string) {
  const key = 'vova'; // Keep it safe!
  const response = await fetch(url);
  const encryptedText = await response.text();

  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  console.log('Decrypted Markdown:', decrypted);

  return decrypted;
}