import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import Badge from "react-bootstrap/Badge";

//import formatDate from "../TimeDisplayLong";
import formatDate from "../TimeDisplayShort";

class CreateJoinCard extends React.Component {
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

  verifyPGStatus = (ispubKeyDoc) => {
    // if (ispubKeyDoc) {
    //   //console.log("PayLater");
    //   return <Badge bg="success">Ready</Badge>;
    // }

    // if (!ismbrDoc) {
    //   return <Badge bg="warning">Pending</Badge>;
    // }

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

    //this.props.joinPGDoc

    // GET MBR NAMES -> get the NameDocs from the MbrList

    //Get an array of the mbr ids ->
    //ALSO NEED TO FOR EACH MBR# ->  ***

    let mbrNum = parseInt(this.props.joinPGDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...this.props.joinPGDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(this.props.joinPGDoc[`mbr${i}`]);
      }
    }

    ownerArrayOfMbrIds.push(this.props.joinPGDoc.$ownerId);

    //NEW ^^

    //let requestName = undefined;

    //for loop
    let mbrNameDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let mbrName = this.props.JoinPayGroupsNames.find((nameDoc) => {
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

    /*JoinPayGroupsMbrs={this.props.JoinPayGroupsMbrs}
      JoinPayGroupsNames={this.props.JoinPayGroupsNames}
      JoinPayGroupsPubKeys={this.props.JoinPayGroupsPubKeys}
     */

    //GET THEIR MBR DOC

    // let mbrDocs = ownerArrayOfMbrIds.map((mbrId) => {
    //   let mbrDoc = this.props.JoinPayGroupsMbrs.find((mbr) => {
    //     return (
    //       mbr.$ownerId === mbrId &&
    //       mbr.payGroupId === this.props.JoinPGDoc.payGroupId
    //     );
    //   });

    //   return mbrDoc;
    // });

    // mbrDocs = mbrDocs.filter((doc) => doc !== undefined);

    //console.log("mbrDocs: ", mbrDocs);

    // let responseError = "";
    // if (response !== undefined) {
    //   responseError = response.error;
    // }

    // GET MBRs xPUBKEYs

    let pubKeyDocs = ownerArrayOfMbrIds.map((mbrId) => {
      let pubKeyDoc = this.props.JoinPayGroupsPubKeys.find((pub) => {
        return pub.$ownerId === mbrId;
      });
      return pubKeyDoc;
    });

    pubKeyDocs = pubKeyDocs.filter((doc) => doc !== undefined);

    //console.log("pubKeyDocs: ", pubKeyDocs);

    //Create list to display

    let isPayGroupReadyToEnter = true;

    let isError = false; // ^^ Same as above?? NO error like missing PUBKEY
    // if (mbrDocs.length !== 0) {
    // } else {
    // }
    let listofMembers = mbrNameDocs.map((nameDoc, index) => {
      //Is there a mbrDoc?
      // let ismbrDocVerified = true;

      // let mbrDoc = mbrDocs.find((doc) => {
      //   return doc.$ownerId === nameDoc.$ownerId;
      // });

      // if (mbrDoc === undefined) {
      //   isPayGroupReadyToEnter = false;
      //   ismbrDocVerified = false;
      // }

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
            <h5 style={{ color: "#008de4" }}>
              <b>{nameDoc.label}</b>
              {/* {this.verifyPGStatus(ispubKeyDocVerified)} */}
            </h5>
          </li>
        );
      } else {
        isPayGroupReadyToEnter = false;
        return (
          <li key={index}>
            <h5 style={{ color: "red" }}>
              <b>{nameDoc.label}</b> error
              {this.verifyPGStatus(ispubKeyDocVerified)}
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
              <b>Pay Group Invite</b>
            </h4>
            <span //className="textsmaller"
            >
              Created:{" "}
              {formatDate(
                this.props.joinPGDoc.$createdAt,
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
                {/* <li>
                  <h5>
                    <b>{this.props.uniqueName}</b>
                    <Badge bg="success">Confirmed</Badge>
                  </h5>
                </li> */}
                {listofMembers}
              </ul>
            </div>
          </div>

          {isPayGroupReadyToEnter ? (
            <div className="ButtonRightNoUnderline">
              <p> </p>
              <Button
                variant="primary"
                onClick={() =>
                  this.props.showConfirmJoinPayGroupModal(
                    mbrNameDocs,
                    pubKeyDocs,
                    this.props.joinPGDoc
                  )
                }
              >
                <b>Join Pay Group</b>
              </Button>
            </div>
          ) : (
            <>
              <div className="ButtonRightNoUnderline">
                <p></p>
                <Button disabled variant="primary">
                  <b>Join Pay Group</b>
                </Button>
              </div>
            </>
          )}

          {/* {isPayGroupReadyToEnter ? (
            <>
              {" "}
              <p //className="textsmaller"
                style={{ textAlign: "center" }}
              >
                ** Tap to Enter **
              </p>{" "}
            </>
          ) : (
            <>
              <p //className="textsmaller"
                style={{ textAlign: "center" }}
              >
                ** Waiting for all members to confirm **
              </p>
            </>
          )} */}
        </Card.Body>
      </Card>
    );
  }
}

export default CreateJoinCard;
