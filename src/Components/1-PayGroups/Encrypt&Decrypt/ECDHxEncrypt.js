//const Dash = require("dash");
import Dash from "dash";

//import { AES, SHA256 } from "crypto-js"; //other way
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
  Core: { Mnemonic, HDPrivateKey, HDPublicKey, PublicKey, Script, Address },
  PlatformProtocol: { Identifier },
} = Dash;

export default function ECDHxEncrypt(
  thePackage,
  theECDHxDocArray,
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

  let sharedSecretsForMbrs = theECDHxDocArray.map((keyDoc) => {
    return secp.getSharedSecret(
      hdPrivateKeyChildECDH.privateKey.toString(),
      keyDoc.pubKey
    );
  });

  //console.log("Shared Secrets: ", sharedSecretsForMbrs);

  let hashPWDForMbrs = sharedSecretsForMbrs.map((sharcret) => {
    return SHA256(sharcret).toString();
  });

  //console.log("hashPWDForMbrs: ", hashPWDForMbrs);

  let aesForMbrs = hashPWDForMbrs.map((hashPWD) => {
    return AES.encrypt(thePackage, hashPWD).toString();
  });

  //console.log("aesForMbrs: ", aesForMbrs);

  return aesForMbrs;
}
