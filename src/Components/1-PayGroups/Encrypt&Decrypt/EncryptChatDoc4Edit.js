//import { AES, SHA256 } from "crypto-js"; //other way
import pkgcryptojs from "crypto-js";
const { AES, enc, SHA256 } = pkgcryptojs;

export default function EncryptChatDoc4Edit(thePackage, theSecret) {
  // let hashPWD = SHA256(hdPrivateKeyChild.privateKey.toString()).toString();
  //console.log("hashPWD: ", hashPWD);

  let encryptedData = AES.encrypt(thePackage, theSecret).toString();

  //console.log("encryptedData: ", encryptedData);

  return encryptedData;
}
