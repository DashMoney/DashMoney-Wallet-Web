import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import Badge from "react-bootstrap/Badge";

import handleDenomDisplay from "../UnitDisplay";

import xPubsInMultiScriptOut from "./MultisigFuncs/xPubsInMultiScriptOut";

import PaymentAddrComponent from "./PaymentAddrComponent";

class SlctdPGPmtsMultisig extends React.Component {
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

  verifyYourMultiSigStatus = (isYourScript) => {
    if (isYourScript === "Matches") {
      //console.log("PayLater");
      return <Badge bg="success">Approved</Badge>;
    }

    if (isYourScript === "Awaiting") {
      return <Badge bg="warning">Awaiting</Badge>;
    }

    if (isYourScript === "Error") {
      // console.log("Failed on Decrypt Error");
      return <Badge bg="danger">Error</Badge>;
    }

    return <Badge bg="danger">Error2</Badge>;
  };

  verifyMultiSigStatus = (ismbrDoc) => {
    if (ismbrDoc === "Matches") {
      //console.log("PayLater");
      return <Badge bg="success">Approved</Badge>;
    }

    if (ismbrDoc === undefined) {
      return <Badge bg="warning">Missing MemberDoc</Badge>;
    }

    if (ismbrDoc === "Error1") {
      return <Badge bg="warning">Awaiting</Badge>;
    }
    if (ismbrDoc === "Error2") {
      // console.log("Failed on Decrypt Error");
      return <Badge bg="danger">Error2</Badge>;
    }
    if (ismbrDoc === "Error3") {
      // console.log("Failed on Decrypt Error");
      return <Badge bg="danger">Error3</Badge>;
    }

    return <Badge bg="danger">Error4</Badge>;
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

    //this.props.selectedPayGroupDoc

    // GET MBR NAMES -> get the NameDocs from the MbrList

    //Get an array of the mbr ids ->
    //ALSO NEED TO FOR EACH MBR# ->  ***

    let mbrNum = parseInt(this.props.selectedPayGroupDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [
        ...ownerArrayOfMbrIds,
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

    let builtScriptAddr = xPubsInMultiScriptOut(
      this.props.selectedPayGroupDoc.mbrsXPubs,
      Number(this.props.scriptKey.toString().slice(0, 1)),
      this.props.scriptKey.toString().slice(1, 2),
      this.props.whichNetwork
    );

    //console.log("builtScriptAddr: ", builtScriptAddr);

    //check builtScript -> Testnet starts with 8 and mainnet starts with 7
    //AND  7VfJ75ukygTUVi7mqob6LwrecBBxv45LK8 length === 34

    let yourScriptAddr;

    // let yourScriptAddr =
    //this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey][0];

    if (this.props.selectedPayGroupDoc.scripts === "") {
      yourScriptAddr = "Awaiting";
    } else if (
      this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey][0] ===
      undefined
    ) {
      yourScriptAddr = "Awaiting";
    } else if (
      builtScriptAddr ===
      this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey][0]
    ) {
      yourScriptAddr = "Matches";
    } else {
      //MAYBE ADD ANOTHER VERIFY HERE FOR SCRIPT VS BUILD SCRIPT
      yourScriptAddr = "Error";
    }

    //NEW ^^

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

    //GET THEIR MBR DOC

    let mbrDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let mbrDoc = this.props.selectedPayGroupMbrDocs.find((mbr) => {
        return (
          mbr.$ownerId === mbrId &&
          mbr.payGroupId === this.props.selectedPayGroupDoc.payGroupId
        );
      });

      return mbrDoc;
    });

    mbrDocs = mbrDocs.filter((doc) => doc !== undefined);

    //use the mbrDocs to build the MultiSig Component Card ->

    //GET MBRS SCRIPT TO VERIFY
    //this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey]

    //Create list to display

    let isError = false;

    let listofMembers = mbrNameDocs.map((nameDoc, index) => {
      //Is there a mbrDoc?
      let ismbrDocVerified = true;

      let mbrDoc = mbrDocs.find((doc) => {
        return doc.$ownerId === nameDoc.$ownerId;
      });

      console.log(mbrDoc);

      if (mbrDoc === undefined) {
        ismbrDocVerified = undefined;
      } else if (mbrDoc.scripts === "") {
        ismbrDocVerified = "Error1";
      } else if (mbrDoc.scripts.pub[this.props.scriptKey][0] === undefined) {
        ismbrDocVerified = "Error2";
      } else if (
        builtScriptAddr === mbrDoc.scripts.pub[this.props.scriptKey][0]
      ) {
        ismbrDocVerified = "Matches";
      } else {
        //MAYBE ADD ANOTHER VERIFY HERE FOR SCRIPT VS BUILD SCRIPT
        ismbrDocVerified = "Error3";
      }

      //console.log("mbrDocStatus: ", ismbrDocVerified);

      if (nameDoc.label !== "No Name Avail") {
        return (
          <li key={index}>
            <h5>
              <b>{nameDoc.label}</b>
              {this.verifyMultiSigStatus(ismbrDocVerified)}
            </h5>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <h5 style={{ color: "red" }}>
              <b>{nameDoc.label}</b> error
              {this.verifyMultiSigStatus(ismbrDocVerified)}
            </h5>
          </li>
        );
      }
    });

    //This will be determined by whether i have joined it or not

    let isMultSigReadyToUse = false;
    if (yourScriptAddr === "Matches") {
      isMultSigReadyToUse = true;
    }

    //Get the multiSig Account label from me unless i need to join

    let acctLabel = "";

    if (yourScriptAddr === "Matches") {
      acctLabel =
        this.props.selectedPayGroupDoc.scripts.pub[this.props.scriptKey][1];
    } else {
      acctLabel = "No Label Found";

      let mbrDoc = mbrDocs.find((doc) => {
        if (doc.scripts === "") {
          return false;
        } else if (doc.scripts.pub[this.props.scriptKey][0] === undefined) {
          return false;
        } else if (
          builtScriptAddr === doc.scripts.pub[this.props.scriptKey][0]
        ) {
          return true;
        }
      });

      if (mbrDoc !== undefined) {
        acctLabel = mbrDoc.scripts.pub[this.props.scriptKey][1];
      }
    }

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
            <h4>
              <b>{acctLabel}</b>
            </h4>
            <span className="textsmaller">
              Requires: {this.props.scriptKey.toString().slice(0, 1)} Signers
            </span>
          </Card.Title>
          {isMultSigReadyToUse ? (
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
                      {" "}
                      {handleDenomDisplay(
                        this.props.whichNetwork,
                        this.calcMultiSigBalance(builtScriptAddr)
                      )}
                    </b>{" "}
                    {/* in <b>MultiSig</b> */}
                  </Badge>
                </h2>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <PaymentAddrComponent
                  mode={this.props.mode}
                  accountAddress={builtScriptAddr}
                />
              </div>
            </>
          ) : (
            <></>
          )}

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
                    {this.verifyYourMultiSigStatus(yourScriptAddr)}
                  </h5>
                </li>
                {listofMembers}
              </ul>
            </div>
          </div>

          {isMultSigReadyToUse ? (
            <>
              {/* <p>This will be the address to copy and the amount from UTXOs</p> */}
              <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    this.props.handleGoToPayGroupAcct(this.props.scriptKey)
                  }
                >
                  <b>Payments/CrowdFund</b>
                </Button>
              </div>
            </>
          ) : (
            <>
              {acctLabel !== "No Label Found" ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() =>
                        this.props.showAcceptMultiSigAcctModal(
                          acctLabel,
                          this.props.scriptKey
                        )
                      }
                    >
                      <b>Accept MultiSig</b>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button variant="primary" size="lg" disabled>
                      <b>Accept MultiSig</b>
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default SlctdPGPmtsMultisig;
