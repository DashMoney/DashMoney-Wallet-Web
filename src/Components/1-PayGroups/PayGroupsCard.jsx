import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import Badge from "react-bootstrap/Badge";

//import formatDate from "../TimeDisplayLong";
import formatDate from "../TimeDisplayShort";

class PayGroupsCard extends React.Component {
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

  // verifyRequestStatus = (theResponse, ifAlreadyWithdrawnTXid) => {
  //   // if (theOrder.txId === "payLater") {
  //   //   //console.log("PayLater");
  //   //   return <Badge bg="warning">Pay Later</Badge>;
  //   // }

  //   if (theResponse === undefined) {
  //     //console.log("PayLater");
  //     return <Badge bg="success">Requested</Badge>;
  //   }

  //   if (theResponse.error !== "" || this.props.req.error !== "") {
  //     // console.log("Failed on Decrypt Error");
  //     return <Badge bg="danger">Fail</Badge>;
  //   }

  //   //This can be 'Requested'(unpaid), 'Rejected', 'Paid' , 'Error'

  //   if (theResponse.amtMatch !== this.props.req.amt) {
  //     return <Badge bg="warning">Amount Error</Badge>;
  //   }

  //   if (theResponse.txId === "rej") {
  //     return <Badge bg="secondary">Rejected</Badge>;
  //   }

  //   if (ifAlreadyWithdrawnTXid !== undefined) {
  //     return <Badge bg="primary">Refunded</Badge>;
  //   }

  //   if (
  //     theResponse.sigObject === "" &&
  //     theResponse.txId !== "" &&
  //     theResponse.refundTxId === ""
  //   ) {
  //     return <Badge bg="success">In 2-Party</Badge>;
  //   }

  //   if (theResponse.sigObject === "" && theResponse.refundTxId !== "") {
  //     return <Badge bg="primary">Refunded</Badge>;
  //   }

  //   if (theResponse.sigObject !== "" && theResponse.txId !== "") {
  //     return <Badge bg="primary">Completed</Badge>;
  //   }

  //   // if (this.props.tuple[1].amt === walletTx.satoshisBalanceImpact) {
  //   //   return <Badge bg="primary">Paid</Badge>;
  //   // } else {
  //   console.log("Failed on Error 4");
  //   return <Badge bg="danger">Fail</Badge>;
  //   // }
  // };

  verifyPGStatus = (ismbrDoc, ispubKeyDoc) => {
    if (ismbrDoc && ispubKeyDoc) {
      //console.log("PayLater");
      return <Badge bg="success">Confirmed</Badge>;
    }

    if (!ismbrDoc) {
      return <Badge bg="warning">Pending</Badge>;
    }

    if (!ispubKeyDoc) {
      // console.log("Failed on Decrypt Error");
      return <Badge bg="danger">Error</Badge>;
    }
  };

  // componentDidMount() {
  // CANNOT callDAPI OR checkALREADYSENT AS NEEDED INPUT IS ONLY IN RENDER
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

    //this.props.yourPGDoc

    // GET MBR NAMES -> get the NameDocs from the MbrList

    //Get an array of the mbr ids ->
    //ALSO NEED TO FOR EACH MBR# ->  ***

    let mbrNum = parseInt(this.props.yourPGDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...this.props.yourPGDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(this.props.yourPGDoc[`mbr${i}`]);
      }
    }

    // console.log("ownerArrayOfMbrIds: ", ownerArrayOfMbrIds);

    //NEW ^^

    //let requestName = undefined;

    //for loop
    let mbrNameDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let mbrName = this.props.YourPayGroupsNames.find((nameDoc) => {
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

    /*YourPayGroupsMbrs={this.props.YourPayGroupsMbrs}
      YourPayGroupsNames={this.props.YourPayGroupsNames}
      YourPayGroupsPubKeys={this.props.YourPayGroupsPubKeys}
     */

    //GET THEIR MBR DOC

    let mbrDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let mbrDoc = this.props.YourPayGroupsMbrs.find((mbr) => {
        return (
          mbr.$ownerId === mbrId &&
          mbr.payGroupId === this.props.yourPGDoc.payGroupId
        );
      });

      return mbrDoc;
    });

    mbrDocs = mbrDocs.filter((doc) => doc !== undefined);

    // if (mbrDocs === undefined) {
    //   mbrDocs = [];
    // }

    //console.log("mbrDocs: ", mbrDocs);

    // let responseError = "";
    // if (response !== undefined) {
    //   responseError = response.error;
    // }

    // GET MBRs xPUBKEYs

    let pubKeyDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let pubKeyDoc = this.props.YourPayGroupsPubKeys.find((pub) => {
        return pub.$ownerId === mbrId;
      });
      return pubKeyDoc;
    });

    pubKeyDocs = pubKeyDocs.filter((doc) => doc !== undefined);

    // if (pubKeyDocs === undefined) {
    //   pubKeyDocs = [];
    // }

    //console.log("pubKeyDocs: ", pubKeyDocs);

    //Create list to display

    let isPayGroupReadyToEnter = true;

    let isError = false; // ^^ Same as above?? NO error like missing PUBKEY
    // if (mbrDocs.length !== 0) {
    // } else {
    // }
    let listofMembers = mbrNameDocs.map((nameDoc, index) => {
      //Is there a mbrDoc?
      let ismbrDocVerified = true;

      let mbrDoc = mbrDocs.find((doc) => {
        return doc.$ownerId === nameDoc.$ownerId;
      });

      if (mbrDoc === undefined) {
        isPayGroupReadyToEnter = false;
        ismbrDocVerified = false;
      }

      //Is there a pubKeyDoc?
      let ispubKeyDocVerified = true;

      let pubKeyDoc = pubKeyDocs.find((pub) => {
        return pub.$ownerId === nameDoc.$ownerId;
      });

      if (pubKeyDoc === undefined) {
        isPayGroupReadyToEnter = false;
        ispubKeyDocVerified = false;
      }

      if (nameDoc.label !== "No Name Avail") {
        return (
          <li key={index}>
            <h5>
              <b>{nameDoc.label}</b>
              {this.verifyPGStatus(ismbrDocVerified, ispubKeyDocVerified)}
            </h5>
          </li>
        );
      } else {
        isPayGroupReadyToEnter = false;
        return (
          <li key={index}>
            <h5 style={{ color: "red" }}>
              <b>{nameDoc.label}</b> error
              {this.verifyPGStatus(ismbrDocVerified, ispubKeyDocVerified)}
            </h5>
          </li>
        );
      }
    });

    //

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
              <b>Pay Group</b>
            </h4>
            <span //className="textsmaller"
            >
              Joined:{" "}
              {formatDate(
                this.props.yourPGDoc.$createdAt,
                this.props.today,
                this.props.yesterday
              )}
            </span>
            {/*<div>
               <b>From: </b>{" "}
              <b
                style={{ color: "#008de4" }}
                //style={{ color: "green" }}
                onClick={() => this.handleNameClick(requestName.label)}
              >
                {requestName.label}
              </b>
            </div>
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

            {this.verifyRequestStatus(response, alreadyWithdrawntxId)} */}
          </Card.Title>
          <div
            style={{
              marginTop: ".5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="indentStuff">
              <ul>
                <li>
                  <h5>
                    <b>{this.props.uniqueName}</b>
                    <Badge bg="success">Confirmed</Badge>
                  </h5>
                </li>
                {listofMembers}
              </ul>
            </div>
          </div>

          {isPayGroupReadyToEnter ? (
            <>
              <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={
                    () =>
                      this.props.decideFinalizeOrGoToPage(
                        this.props.yourPGDoc,
                        mbrNameDocs,
                        mbrDocs,
                        pubKeyDocs
                      )
                    // this.props.showConfirmCreatePayGroupModal(
                    //   this.state.mbrNameArray,
                    //   this.state.mbrPubKeyArray
                    // )
                  }
                >
                  <b>Enter Pay Group</b>
                </Button>
              </div>
            </>
          ) : (
            <>
              <p //className="textsmaller"
                style={{ textAlign: "center" }}
              >
                ** Waiting for all members to confirm **
              </p>
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default PayGroupsCard;
