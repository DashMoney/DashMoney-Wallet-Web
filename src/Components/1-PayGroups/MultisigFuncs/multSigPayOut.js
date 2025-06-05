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
//export default function multiSigPayOut(
export default function xPubsInMultiScriptOut(
  theXPubs, //array of xpubs
  theNumOfMbrsReq,
  theIndex,
  whichNetwork
) {
  // TEST 5 - PAYOUT from MultiSig

  //Just get this ALL FROM THE TX ->

  //theTx.outputs[0]

  var utxo = new Transaction.UnspentOutput({
    txid: theTx.hash,
    outputIndex: 0,
    address: scriptAddress.toString(),
    script: theTx.outputs[0].script,
    satoshis: theTx.outputs[0].satoshis,
  });

  //https://github.com/dashpay/dashcore-lib/blob/master/docs/core-concepts/transaction.md

  let theMultiSigTx = new Transaction().from(
    utxo,
    [RequestPublicKey, ResponsePublicKey],
    2
  );

  var wallet = new Mnemonic(theMnemonic);

  var hdPrivateKey = wallet.toHDPrivateKey(undefined, whichNetwork); //in WIF??

  let hdPrivateKeyChild = hdPrivateKey.deriveChild(
    `m/2024'/5'/2'/${truncatedTimeStamp}`
  );

  let signature = theMultiSigTx.getSignatures(
    hdPrivateKeyChild.privateKey,
    2
  )[0];
  //https://github.com/dashpay/dashcore-lib/blob/master/lib/transaction/transaction.js   Line 1225  -> [0] is the sigtype <- NOO!!!
  //sigtype: the "sighash", the type of transaction hash used to calculate the sigtype is 2 and the sighash (2 & 31) is bitwise to 0x02

  //console.log(signature);
  //console.log(JSON.stringify(signature));
  //console.log(signature.toObject());

  //THIS IS THE SIG THAT I NEED!!! <- ***
  //console.log(signature.signature.toString()); // Outputs a DER signature

  //console.log(signature.sigtype);
  //console.log('istheMultiSigTxfullySigned: ', theMultiSigTx.isFullySigned());

  let theSignatureToPass = signature; //JSON.stringify(signature);

  //console.log("theSignatureToPass", JSON.stringify(theSignatureToPass));

  // ALL THE DATA IS THE EXACT SAME AS YOU WOULD THINK!! <- ***

  // WHAT ABOUT JUST PASSING THE SIGNATURE!!! ^^^^  ITs all i need

  return theSignatureToPass;
}
