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

export default function buildMultiSigTX(
  yourMbrDoc,
  yourPayDoc,
  theScriptIndex,

  theUTXOs, // selected UTXos to use here ->
  thePayouts, //tuples of [addr,amts]
  theSignatures //full signature objects
) {
  //ALREADY HAVE THE ADDR HASH SCRIPT. <-**

  let theNumOfMbrsReq = theScriptIndex.toString().slice(0, 1);
  let theMultiSigIndex = theScriptIndex.toString().slice(1, 2);

  //https://github.com/dashpay/dashcore-lib/blob/master/docs/core-concepts/transaction.md

  //GET THE PUBLIC KEYS OF THE MULTISIG ACCT->

  //WILL ACTUALLY NEED INDEX AND THE FROMMBRS -> .mbrsXPubs
  console.log("yourMbrDoc.mbrsXPubs: ", yourMbrDoc.mbrsXPubs);
  let theUseCase = 1; //1 PUBLIC, 2 = PRIV, 3 = OTHER
  let mbrPublicKeys = yourMbrDoc.mbrsXPubs.map((x) => {
    return (
      new HDPublicKey(x)
        //   .deriveChild(`m/${theNumOfMbrsReq}/${theMultiSigIndex}`)
        //   .toObject().publicKey;
        .deriveChild(`m/${theUseCase}/${theNumOfMbrsReq}/${theMultiSigIndex}`)
        .toObject().publicKey
    );
  });

  //CREATE THE TX ->

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

  // let signature = theMultiSigTx.getSignatures(
  //   hdPrivateKeyChild.privateKey,
  //   1 //<- THIS IS THE SIGHASH!! 1= SIGHASH_ALL sign everything!!
  // )[0]; ///WHAT IS THE SIGTYPE -> NO, THEN WHAT IS IT? ITS "this"{Transaction} for chaining. the tx getting signed

  /// SEPARATE

  //RECREATE (EACH) SENDERS SIGNATURE OBJECT ->

  //https://github.com/dashpay/dashcore-lib/blob/master/lib/transaction/signature.js

  //**THE SIGNATURE** IS A LARGE OBJECT. NEED A TUPLE LIST LIKE WITH THE XPUBS AND DO THAT WITH THE [OWNERID,DER-SIGNATURE] -> NOPE

  theSignatures.forEach((signature) => {
    //So I need to match the signature to the publicKey... not anymore

    // //console.log("signature", signatureThe);

    let TxSig = new Transaction.Signature.fromObject(signature);
    // //console.log("txSignature", TxSig);

    theMultiSigTx.applySignature(TxSig);
  });

  let theTransactionToPass = theMultiSigTx;

  console.log(
    "istheMultiSigTxfullySigned: ",
    theTransactionToPass.isFullySigned()
  );
  console.log(
    "getSerializationError: ",
    theTransactionToPass.getSerializationError()
  );

  console.log("hasAllUtxoInfo: ", theTransactionToPass.hasAllUtxoInfo());

  return theTransactionToPass;
}

//https://github.com/dashpay/dashcore-lib/blob/master/lib/transaction/transaction.js   Line 1225  -> [0] is the sigtype <- NOO!!!
//sigtype: the "sighash", the type of transaction hash used to calculate the sigtype is 2 and the sighash (2 & 31) is bitwise to 0x02

//https://github.com/dashpay/dashcore-lib/blob/master/lib/crypto/signature.js
//   Signature.SIGHASH_ALL = 0x01;
// Signature.SIGHASH_NONE = 0x02;
// Signature.SIGHASH_SINGLE = 0x03;
// Signature.SIGHASH_ANYONECANPAY = 0x80;
