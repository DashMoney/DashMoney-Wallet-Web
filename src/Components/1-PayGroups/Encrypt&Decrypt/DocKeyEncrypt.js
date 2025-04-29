// Path 4 - use timeIndex to generate privKey to SHA256 and AES Store data!!

//const Dash = require("dash");
import Dash from "dash";

//import { AES, SHA256 } from "crypto-js"; //other way
import pkgcryptojs from "crypto-js";
const { AES, enc, SHA256 } = pkgcryptojs;

const {
  Core: { Mnemonic, HDPrivateKey, HDPublicKey },
  PlatformProtocol: { Identifier },
} = Dash;

export default function DocKeyEncrypt(
  thePackage,
  theTimeIndex,
  theMnemonic
  //whichNetwork
) {
  let wallet = new Mnemonic(theMnemonic);

  let hdPrivateKey = wallet.toHDPrivateKey();

  //"m/2025'/5'/4'/timeIndex'"
  let hdPrivateKeyChild = hdPrivateKey.deriveChild(
    `m/2025'/5'/4'/${theTimeIndex}'`
  );

  let hashPWD = SHA256(hdPrivateKeyChild.privateKey.toString()).toString();

  //console.log("hashPWD: ", hashPWD);

  let encryptedData = AES.encrypt(thePackage, hashPWD).toString();

  //console.log("encryptedData: ", encryptedData);

  return encryptedData;
}
