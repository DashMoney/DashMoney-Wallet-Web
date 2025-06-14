import Dash from "dash";

const {
  Core: {
    Mnemonic,
    // HDPrivateKey,
    HDPublicKey,
    Script,
    Address,
    Transaction,
    // Signature,
    // Output,
  },
} = Dash;

export default function xPubsInMultiScriptOut(
  theXPubs, //array of xpubs
  theNumOfMbrsReq,
  theIndex,
  whichNetwork
) {
  //*** */
  /// MAKE THE PUB KEYS FROM THE XPUBKEYS ->
  //*** */

  //console.log("theIndex: ", theIndex);

  let theUseCase = 1; //1 PUBLIC, 2 = PRIV, 3 = OTHER

  let mbrPublicKeys = theXPubs.map((x) => {
    return new HDPublicKey(x)
      .deriveChild(`m/${theUseCase}/${theNumOfMbrsReq}/${theIndex}`)
      .toObject().publicKey;
  });

  //console.log("mbrPublicKeys: ", mbrPublicKeys);

  let redeemScript = Script.buildMultisigOut(
    //[RequestPublicKey, ResponsePublicKey],
    // 2
    mbrPublicKeys,
    theNumOfMbrsReq
  );
  //console.log("redeemScript: ", redeemScript);

  let scriptHashOut = redeemScript.toScriptHashOut();
  //console.log("ScriptHashOut: ", scriptHashOut.toString());

  //console.log("whichNetwork", whichNetwork);

  let scriptAddress = Address.fromScript(
    scriptHashOut,
    whichNetwork
  ).toString();

  //console.log("scriptAddress: ", scriptAddress);

  return scriptAddress;
}
