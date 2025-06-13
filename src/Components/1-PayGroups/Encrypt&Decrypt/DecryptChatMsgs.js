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

export default function DecryptChatMsgs(
  theEncryptedMsgsArrayOfTuples, //[doc.$ownerId, doc.msg1]
  theDocKey
  //whichNetwork
) {
  // let wallet = new Mnemonic(theMnemonic);

  // let hdPrivateKey = wallet.toHDPrivateKey();

  // //"m/2025'/5'/4'/timeIndex'"
  // let hdPrivateKeyChild = hdPrivateKey.deriveChild(
  //   `m/2025'/5'/4'/${theTimeIndex}'`
  // );

  // let hashPWD = SHA256(hdPrivateKeyChild.privateKey.toString()).toString();

  // //console.log("hashPWD: ", hashPWD);

  let decryptedMsgs = [];
  let decryptedLikes = [];

  theEncryptedMsgsArrayOfTuples.forEach((x) => {
    let decryptedData = AES.decrypt(x[1], theDocKey);

    let decryptedParsedData = JSON.parse(decryptedData.toString(enc.Utf8));

    //console.log("decryptedData: ", decryptedData.toString(enc.Utf8));

    //!!! BELOW
    //Previous
    //msg1 = [{msg:.., time:...}]

    //msg should be Array of Objects
    // {
    //   msg: msg.msg,
    //   time: msg.time,
    //   owner: this.props.req.$ownerId, <- NOT this one
    // }

    //!!! BELOW
    //Changed to
    //msg1 = {msgs:[{msg:.., time:...}],likes:[]}

    //SEPARATE IT -> DONE

    // decryptedParsedData.msgs.forEach((msgObj) => {
    //   msgObj.owner = x[0];
    //   msgObj.time = msgObj.time * 1000;
    // });

    let decryptedParsedMsgs = decryptedParsedData.msgs.map((msgObj) => {
      msgObj.owner = x[0];
      msgObj.time = msgObj.time * 1000;

      return msgObj;
    });

    let decryptedParsedLikes;

    if (decryptedParsedData.likes.length !== 0) {
      decryptedParsedLikes = decryptedParsedData.likes.map((likeObj) => {
        //return { owner: x[0], likesArr: likeObj };
        return [x[0], likeObj];
      });
      decryptedLikes.push(decryptedParsedLikes);
    } //else {
    // decryptedParsedLikes = { owner: x[0], likesArr: "none" };
    //}

    decryptedMsgs.push(decryptedParsedMsgs);
    // decryptedLikes.push(decryptedParsedLikes);
  });

  //console.log("decryptedData: ", [decryptedMsgs, decryptedLikes]);

  return [decryptedMsgs, decryptedLikes];
}
