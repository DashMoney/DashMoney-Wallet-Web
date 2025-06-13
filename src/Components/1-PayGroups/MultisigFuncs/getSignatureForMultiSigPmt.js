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
  },
} = Dash;

export default function getSignature(
  yourMbrDoc,
  theScriptIndex,

  theUTXOs, // selected UTXos to use here ->
  thePayouts, //tuples of [addr,amts]

  whichNetwork,
  theMnemonic
) {
  //ALREADY HAVE THE ADDR HASH SCRIPT. <-**

  let theNumOfMbrsReq = theScriptIndex.toString().slice(0, 1);
  let theMultiSigIndex = theScriptIndex.toString().slice(1, 2);

  // var utxo = new Transaction.UnspentOutput({
  //   txid: theTx.hash,
  //   outputIndex: 0,
  //   address: scriptAddress.toString(),
  //   script: theTx.outputs[0].script,
  //   satoshis: theTx.outputs[0].satoshis,
  // });

  //ALREADY HAVE THE UTXOS. USE THE txid and outputindex to identify <-**

  //https://github.com/dashpay/dashcore-lib/blob/master/docs/core-concepts/transaction.md

  //WILL ACTUALLY NEED INDEX AND THE FROMMBRS -> .mbrsXPubs
  console.log("yourMbrDoc.mbrsXPubs: ", yourMbrDoc.mbrsXPubs);

  let mbrPublicKeys = yourMbrDoc.mbrsXPubs.map((x) => {
    return new HDPublicKey(x)
      .deriveChild(`m/${theNumOfMbrsReq}/${theMultiSigIndex}`)
      .toObject().publicKey;
  });

  let theMultiSigTx = new Transaction();

  theUTXOs.forEach((utxo) => {
    theMultiSigTx.from(utxo, mbrPublicKeys, Number(theNumOfMbrsReq));
  });

  thePayouts.forEach((payout) => {
    theMultiSigTx.to(payout[0], payout[1]);
  });

  theMultiSigTx.change(yourMbrDoc.scripts.pub[theScriptIndex][0]);

  theMultiSigTx.fee(100000);
  //.sign(hdPrivateKeyChild.privateKey);

  console.log("theMultiSigTx: ", theMultiSigTx);

  var wallet = new Mnemonic(theMnemonic);

  var hdPrivateKey = wallet.toHDPrivateKey(undefined, whichNetwork); //in WIF??

  let hdPrivateKeyChild = hdPrivateKey.deriveChild(
    `m/2025'/5'/3'/${yourMbrDoc.timeIndex}'/${theNumOfMbrsReq}/${theMultiSigIndex}`
  );

  let signature = theMultiSigTx.getSignatures(
    hdPrivateKeyChild.privateKey,
    1 //<- THIS IS THE SIGHASH!! 1= SIGHASH_ALL sign everything!!
  )[0]; ///WHAT IS THE SIGTYPE -> NO, THEN WHAT IS IT? ITS "this"{Transaction} for chaining. the tx getting signed

  //console.log(signature);
  //console.log(JSON.stringify(signature));
  //console.log(signature.toObject());

  //THIS IS THE SIG THAT I NEED!!! <- ***
  //console.log(signature.signature.toString()); // Outputs a DER signature

  //console.log(signature.sigtype);
  //console.log('istheMultiSigTxfullySigned: ', theMultiSigTx.isFullySigned());

  let theSignatureToPass = signature.signature.toString(); //JSON.stringify(signature);

  //console.log("theSignatureToPass", JSON.stringify(theSignatureToPass));

  // ALL THE DATA IS THE EXACT SAME AS YOU WOULD THINK!! <- ***

  // WHAT ABOUT JUST PASSING THE SIGNATURE!!! ^^^^  ITs all i need

  return theSignatureToPass;

  /// SEPARATE

  //theTx.outputs[0]

  //RECREATE THE SENDERS SIGNATURE OBJECT ->

  // create the pubkey

  //https://github.com/dashpay/dashcore-lib/blob/master/lib/transaction/signature.js

  // console.log("sigObject", theResponse.sigObject);

  // let signatureThe = {
  //   publicKey: new PublicKey(ResponsePublicKey),
  //   prevTxId: Buffer.from(theTx.hash, "hex"), //theTx.hash,
  //   outputIndex: 0,
  //   inputIndex: 0,
  //   signature: Dash.Core.crypto.Signature.fromDER(
  //     Buffer.from(theResponse.sigObject, "hex")
  //   ),
  //   sigtype: 1,
  // };
  // //console.log("signature", signatureThe);

  // let TxSig = new Transaction.Signature.fromObject(signatureThe);
  // //console.log("txSignature", TxSig);

  // let theTransactionToPass = multiSigTx.applySignature(TxSig);

  // // console.log(
  // //   "istheMultiSigTxfullySigned: ",
  // //   theTransactionToPass.isFullySigned()
  // // );
  // // console.log(
  // //   "getSerializationError: ",
  // //   theTransactionToPass.getSerializationError()
  // // );

  // //console.log("hasAllUtxoInfo: ", theTransactionToPass.hasAllUtxoInfo());

  // return theTransactionToPass;
}

//https://github.com/dashpay/dashcore-lib/blob/master/lib/transaction/transaction.js   Line 1225  -> [0] is the sigtype <- NOO!!!
//sigtype: the "sighash", the type of transaction hash used to calculate the sigtype is 2 and the sighash (2 & 31) is bitwise to 0x02

//https://github.com/dashpay/dashcore-lib/blob/master/lib/crypto/signature.js
//   Signature.SIGHASH_ALL = 0x01;
// Signature.SIGHASH_NONE = 0x02;
// Signature.SIGHASH_SINGLE = 0x03;
// Signature.SIGHASH_ANYONECANPAY = 0x80;
