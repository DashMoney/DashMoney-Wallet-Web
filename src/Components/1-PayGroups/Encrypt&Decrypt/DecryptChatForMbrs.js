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

export default function DecryptChatForMbrs(
  thePackage, //this is an single hash
  theECDHxDoc, //single doc from sender
  yourECDHxDoc,
  theMnemonic
) {
  //create wallet from new Mnemonic

  let wallet = new Mnemonic(theMnemonic);

  let hdPrivateKey = wallet.toHDPrivateKey();

  //"m/2025'/5'/1'/timeIndex'"
  let hdPrivateKeyChildECDH = hdPrivateKey.deriveChild(
    `m/2025'/5'/1'/${yourECDHxDoc.timeIndex}'`
  );

  // Start Loop Here:
  //let isError = false;

  let sharedSecret = secp.getSharedSecret(
    hdPrivateKeyChildECDH.privateKey.toString(),
    theECDHxDoc.pubKey
  );

  //console.log("Shared Secret: ", sharedSecret);

  let hashPWD = SHA256(sharedSecret).toString();

  // console.log("hashPWD: ", hashPWD);

  let revealedText = AES.decrypt(thePackage, hashPWD);

  //console.log("revealedText: ", revealedText);

  let originalText = revealedText.toString(enc.Utf8);

  //console.log("originalText: ", originalText);

  // if (originalText.slice(0, 4) !== "xpub") {
  //   isError = true;
  // }

  return originalText;
}
