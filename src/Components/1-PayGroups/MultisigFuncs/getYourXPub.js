import Dash from "dash";

const {
  Core: { Mnemonic, HDPublicKey },
} = Dash;

export default function getYourXPub(theMnemonic, theTimeIndex, whichNetwork) {
  let wallet = new Mnemonic(theMnemonic);

  let hdPrivateKey = wallet.toHDPrivateKey();

  let hdPrivateKeyChildPath = hdPrivateKey.deriveChild(
    `m/2025'/5'/3'/${theTimeIndex}'`
  );

  let xPublicKey = new HDPublicKey(
    hdPrivateKeyChildPath,
    whichNetwork
  ).toObject().xpubkey;

  //console.log("HDxPublicKey", xPublicKey);

  return xPublicKey;
}
