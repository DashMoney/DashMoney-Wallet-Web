//import { AES, SHA256 } from "crypto-js"; //other way
import pkgcryptojs from "crypto-js";
const { AES, enc, SHA256 } = pkgcryptojs;

export default function DecryptChatDoc4Edit(thePackage, theSecret) {
  //let hashPWD = SHA256(hdPrivateKeyChild.privateKey.toString()).toString();

  //console.log("hashPWD: ", hashPWD);

  let decryptedData = AES.decrypt(thePackage, theSecret);

  //console.log("decryptedData: ", decryptedData.toString(enc.Utf8));

  return decryptedData.toString(enc.Utf8);
}
