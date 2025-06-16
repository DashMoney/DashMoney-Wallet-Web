import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import Badge from "react-bootstrap/Badge";

import handleDenomDisplay from "../UnitDisplay";

class SlctdPGAcctPmt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      Loading2PartyAddress: true,
      Display2Party: "Loading..",
      TXfromDAPI: "",
    };
  }

  handleNameClick = (theName) => {
    navigator.clipboard.writeText(theName);
    this.setState({
      copiedName: true,
    });
  };

  calcMultiSigBalance = (theMultiSigAddr) => {
    // [{
    //   address: 'yjXnjGLBnjgsBgyu33si6PzDuGM7dVBCzr',
    //   txid: 'd098d8fbd5cdcb12f513b18cace9eb0aea8f71fefc82ff871e7651234a927551',
    //   outputIndex: 0,
    //   script: '76a914fea07ad90ddefdbbafecae744296834832b05b1688ac',
    //   satoshis: 5000000,
    //   height: 1257338
    // },...]
    let utxoArray = this.props.YourPGsMultiSigUTXOs.filter((utxo) => {
      return utxo.address === theMultiSigAddr;
    });
    //console.log("utxoArray: ", utxoArray);
    let acctBalance = 0;

    utxoArray.forEach((utxo) => (acctBalance += utxo.satoshis));

    return acctBalance;
  };

  verifyYourPaymentStatus = (yourPayDoc) => {
    if (yourPayDoc.status === "Signed") {
      //console.log("PayLater");
      return <Badge bg="success">Signed</Badge>;
    }

    if (yourPayDoc.status === "Not Signed") {
      return <Badge bg="warning">Awaiting</Badge>;
    }

    return <Badge bg="danger">Error</Badge>;
  };

  verifyPaymentStatus = (mbrPayDoc) => {
    if (mbrPayDoc.status === "Signed") {
      //console.log("PayLater");
      return <Badge bg="success">Signed</Badge>;
    }

    if (mbrPayDoc.status === "Not Signed") {
      return <Badge bg="warning">Awaiting</Badge>;
    }

    return <Badge bg="danger">Error</Badge>;
  };

  // componentDidMount() {
  // }

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let mbrPayDocs = this.props.selectedPayGroupPayDocs.filter((payDoc) => {
      return payDoc.payInitId === this.props.payInitDoc.$id;
    });

    let availMbrPayDocs = [this.props.payInitDoc, ...mbrPayDocs];

    console.log("availMbrPayDocs: ", availMbrPayDocs);
    //Do use because even though yourdoc and mbrs are separate, idk whether you are the payInit or not so here they are together.

    // let availOwnerArrayIds = availMbrPayDocs.map(
    //   (mbrPayDoc) => mbrPayDoc.$ownerId
    // ); //UNECESSARY <-

    //this.props.selectedPayGroupDoc

    // GET MBR NAMES -> get the NameDocs from the MbrList

    //Get an array of the mbr ids ->
    //ALSO NEED TO FOR EACH MBR# ->  ***

    let mbrNum = parseInt(this.props.selectedPayGroupDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [
        // ...ownerArrayOfMbrIds,
        ...this.props.selectedPayGroupDoc.mbrsList,
      ];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(this.props.selectedPayGroupDoc[`mbr${i}`]);
      }
    }

    console.log("ownerArrayOfMbrIds: ", ownerArrayOfMbrIds);

    //3 DIFFERENT SCRIPT ADDRS -> NO JUST 2
    // BUILD SCRIPT aDDR FOR VERIFY AND JOIN ADDR <-**
    // Join if yourScript === '' and JoinAddr === buildScript
    // YOUR SCRIPT aDDR FROM your Scripts <- * could be ''

    //Need to separate back out myStatus and othersStatus

    //Join Button and then double button (crowdfund and Payments->page query and components)

    //console.log(this.props.scriptKey.toString().slice(0, 1));
    //console.log(this.props.scriptKey.toString().slice(1, 2));

    // let builtScriptAddr = xPubsInMultiScriptOut(
    //   this.props.selectedPayGroupDoc.mbrsXPubs,
    //   Number(this.props.scriptKey.toString().slice(0, 1)),
    //   this.props.scriptKey.toString().slice(1, 2),
    //   this.props.whichNetwork
    // );

    // console.log("builtScriptAddr: ", builtScriptAddr);

    //check builtScript -> Testnet starts with 8 and mainnet starts with 7
    //AND  7VfJ75ukygTUVi7mqob6LwrecBBxv45LK8 length === 34

    //HERE -> // type, multiSigAddr, utxos, payouts, txId, sig
    let yourPaymentDoc = availMbrPayDocs.find((payDoc) => {
      return payDoc.$ownerId === this.props.identity;
    });

    //
    // this.props.payInitDoc.theMultiSigAddr;

    // let yourScriptAddr =
    //this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey][0];

    //

    //WHAT DIFFERENT HERE IS THAT SOME MBRS MAY NOT HAVE DOCS YET..
    //sO i NEED A LIST OF ALL MEMBRS AND THEN COMPARE THAT TO PAYDOCS ->

    //

    if (yourPaymentDoc === undefined) {
      yourPaymentDoc = { status: "Not Signed" };
      //yourScriptAddr = "Awaiting";
    } else {
      yourPaymentDoc.status = "Signed";
    }

    //for loop
    let mbrNameDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let mbrName = this.props.selectedPayGroupNameDocs.find((nameDoc) => {
        return nameDoc.$ownerId === mbrId;
      });

      if (mbrName === undefined) {
        mbrName = {
          label: "No Name Avail",
          $ownerId: mbrId,
        };
      }

      return mbrName;
    });

    //console.log("mbrNameDocs: ", mbrNameDocs);

    //GET THEIR MBR DOC -> dont need this use the payDocs

    // let mbrDocs = ownerArrayOfMbrIds.map((mbrId) => {
    //   let mbrDoc = this.props.selectedPayGroupMbrDocs.find((mbr) => {
    //     return (
    //       mbr.$ownerId === mbrId &&
    //       mbr.payGroupId === this.props.selectedPayGroupDoc.payGroupId
    //     );
    //   });

    //   return mbrDoc;
    // });

    //mbrDocs = mbrDocs.filter((doc) => doc !== undefined);

    //use the mbrDocs to build the MultiSig Component Card ->

    //GET MBRS SCRIPT TO VERIFY
    //this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey]

    //Create list to display

    let listofMembers = mbrNameDocs.map((nameDoc, index) => {
      let mbrPayDoc = availMbrPayDocs.find((doc) => {
        return doc.$ownerId === nameDoc.$ownerId;
      });

      if (mbrPayDoc === undefined) {
        mbrPayDoc = { status: "Not Signed", $ownerId: nameDoc.$ownerId };
      }
      // else if () { // Add a verification of Signature ->
      //   ismbrDocVerified = "Error2";
      // }
      else {
        mbrPayDoc.status = "Signed";
      }

      if (nameDoc.label !== "No Name Avail") {
        return (
          <li key={index}>
            <h5>
              <b>{nameDoc.label}</b>
              {this.verifyPaymentStatus(mbrPayDoc)}
            </h5>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <h5 style={{ color: "red" }}>
              <b>{nameDoc.label}</b> error
              {this.verifyPaymentStatus(mbrPayDoc)}
            </h5>
          </li>
        );
      }
    });

    //Payment Initiated BY ->

    mbrNameDocs.push({
      label: this.props.uniqueName,
      $ownerId: this.props.identity,
    });
    let payInitiator = mbrNameDocs.find(
      (nameDoc) => this.props.payInitDoc.$ownerId === nameDoc.$ownerId
    );
    //this.props.payInitDoc

    //Payouts Build here->

    // type, multiSigAddr, utxos, payouts, txId, sig

    let listofPayouts = this.props.payInitDoc.txData.payouts.map(
      (tuple, index) => {
        return (
          <li key={index}>
            <p>
              <b>{handleDenomDisplay(this.props.whichNetwork, tuple[1])}</b> to{" "}
              <b>{tuple[0]}</b>
            </p>
          </li>
        );
      }
    );

    let areUTXOsAvail = true;

    this.props.payInitDoc.txData.utxos.forEach((utxoSimplified) => {
      //txid: utxo.txid, outputIndex: utxo.outputIndex
      let fullUTXO = this.props.YourPGsMultiSigUTXOs.find((fullUTXO) => {
        return (
          fullUTXO.txid === utxoSimplified.txid &&
          fullUTXO.outputIndex === utxoSimplified.outputIndex
        );
      });

      if (fullUTXO === undefined) {
        areUTXOsAvail = false;
      }
    });

    //

    let isTxComplete = false;

    availMbrPayDocs.forEach((payDoc) => {
      if (payDoc.txData.txId !== "") {
        isTxComplete = true;
      }
      //OR VERIFY IF THE UTXOS HAVE ALREADY BEEN SPENT ->
      //
      //
    });

    //CHECK IF THE MULTISIG HAS ENOUGH SIGNATURES ->
    //FOR THIS JUST ASSUME CORRECT -> for now
    let isPaymentReadyToBroadcast = false;

    let gatherSigs = [];

    if (
      availMbrPayDocs.length >=
      Number(this.props.selectedPayGroupAcctIndex.toString().slice(0, 1))
    ) {
      isPaymentReadyToBroadcast = true;
      availMbrPayDocs.forEach((payDoc) => {
        gatherSigs.push(JSON.parse(payDoc.txData.sig));
      });
    }

    //MAYBE ADD A VERIFY THAT YOUR PAY DOC MATCHES THE PAYINIT OR IS THE PAY INIT ->  USE YOUR DOC, BE IT THE PAYINIT OR PAYDOC and I already have my doc - yourPaymentDoc

    //console.log("gatheredSigs: ", gatherSigs);

    return (
      <Card
        id="card"
        key={this.props.index}
        bg={cardBkg}
        text={cardText}
        style={{
          marginBottom: ".5rem",
        }}
      >
        <Card.Body>
          <Card.Title className="cardTitle">
            <span className="textsmaller">
              Payment Initiated by: {payInitiator.label}
            </span>

            <span className="textsmaller">
              Requires:{" "}
              {this.props.selectedPayGroupAcctIndex.toString().slice(0, 1)}{" "}
              Signers
            </span>
          </Card.Title>

          {isTxComplete ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  marginBottom: "0rem",
                }}
              >
                <h2>
                  <Badge bg="primary">
                    <b //style={{ color: "#008de4" }}
                    >
                      TX Complete
                    </b>{" "}
                  </Badge>
                </h2>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* ADD THE PAYMENTS AND TOTAL HERE ->
           */}

          <div className="indentStuff">
            <p></p>
            <Alert
              variant="primary"

              //dismissible
            >
              <Alert.Heading>Payouts</Alert.Heading>
              <ul>{listofPayouts}</ul>
            </Alert>
          </div>

          <div
            style={{
              marginTop: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="indentStuff">
              <ul>
                <li>
                  <h5>
                    <b>{this.props.uniqueName}</b>
                    {this.verifyYourPaymentStatus(yourPaymentDoc)}
                  </h5>
                </li>
                {listofMembers}
              </ul>
            </div>
          </div>

          {/* isTxComplete   isPaymentReadyToBroadcast    yourPaymentDoc.status */}

          {isTxComplete ? (
            <></>
          ) : (
            <>
              {isPaymentReadyToBroadcast &&
              yourPaymentDoc.status === "Signed" &&
              areUTXOsAvail ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() =>
                        this.props.showConfirmBroadcastPmtModal(
                          yourPaymentDoc,
                          gatherSigs
                        )
                      }
                    >
                      <b>Broadcast TX</b>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {areUTXOsAvail ? (
                    <>
                      {yourPaymentDoc.status === "Not Signed" ? (
                        <>
                          <div
                            className="d-grid gap-2"
                            style={{ margin: "1rem" }}
                          >
                            <Button
                              variant="primary"
                              size="lg"
                              onClick={() =>
                                this.props.showConfirmAcceptPmtModal(
                                  this.props.payInitDoc
                                )
                              }
                            >
                              <b>Sign TX</b>
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p //className="textsmaller"
                            style={{ textAlign: "center" }}
                          >
                            ** Waiting for signatures **
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p //className="textsmaller"
                        style={{ textAlign: "center" }}
                      >
                        ** MultiSig UTXOs are unavailable **
                      </p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default SlctdPGAcctPmt;
