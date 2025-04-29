//const Dash = require("dash");
import Dash from "dash";

//import { AES, enc, SHA256 } from "crypto-js"; //other way
import pkgcryptojs from "crypto-js";
const { AES, enc, SHA256 } = pkgcryptojs;

import * as secp from "@noble/secp256k1";

// 1. Enable synchronous methods.
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
secp.etc.hmacSha256Sync = (k, ...m) =>
  hmac(sha256, k, secp.etc.concatBytes(...m));
// Sync methods can be used now:

const {
  Core: { Mnemonic, HDPrivateKey, HDPublicKey, PublicKey },
  PlatformProtocol: { Identifier },
} = Dash;

export default function ECDHxDecrypt(
  thePackage, //this is an array of encrypted data
  theECDHxDocArray, //ordered from thePackage array
  yourECDHxDoc,
  //theTimeIndex,
  theMnemonic
  //whichNetwork
) {
  //create wallet from new Mnemonic

  let wallet = new Mnemonic(theMnemonic);

  let hdPrivateKey = wallet.toHDPrivateKey();

  //"m/2025'/5'/1'/timeIndex'"
  let hdPrivateKeyChildECDH = hdPrivateKey.deriveChild(
    `m/2025'/5'/1'/${yourECDHxDoc.timeIndex}'`
  );

  // Start Loop Here:

  let isError = false;

  //For Each thePackage(Tuple) - get ECDHdoc , combine with myPrivKey

  let decryptedFromMbrs = thePackage.map((tuple) => {
    //Tuple =  [$ownerId, encryptedData]

    let mbrECDHDoc = theECDHxDocArray.find((x) => x.$ownerId === tuple[0]);

    if (mbrECDHDoc === undefined) {
      isError = true;
    } else {
      let sharedSecret = secp.getSharedSecret(
        hdPrivateKeyChildECDH.privateKey.toString(),
        mbrECDHDoc.pubKey
      );

      // console.log("Shared Secret: ", sharedSecret);

      let hashPWD = SHA256(sharedSecret).toString();

      // console.log("hashPWD: ", hashPWD);

      let revealedText = AES.decrypt(tuple[1], hashPWD);

      // console.log("revealedText: ", revealedText);

      let originalText = revealedText.toString(enc.Utf8);

      console.log("originalText: ", originalText);

      if (originalText.slice(0, 4) !== "xpub") {
        isError = true;
      }

      return [tuple[0], originalText];
    }
  });

  //End Loop Here: Return Tuple
  //Also verify that all start with 'xpub' else return error also!!

  //console.log("decryptedFromMbrs: ", decryptedFromMbrs);

  return [decryptedFromMbrs, isError];
}
