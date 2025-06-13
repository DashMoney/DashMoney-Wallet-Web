import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import Alert from "react-bootstrap/Alert";

import CreditsOnPage from "../CreditsOnPage";

import SelectedPayGroupMsgs from "./SelectedPayGroupMsgs";
import SelectedPayGroupForm from "./SelectedPayGroupForm";

import DocKeyDecrypt from "./Encrypt&Decrypt/DocKeyDecrypt";
import DecryptChatMsgs from "./Encrypt&Decrypt/DecryptChatMsgs";

import DecryptChatForMbrs from "./Encrypt&Decrypt/DecryptChatForMbrs";
import DocKeyEncrypt from "./Encrypt&Decrypt/DocKeyEncrypt";

import "../../App.css";

class SelectedPayGroupPage extends React.Component {
  componentDidMount() {
    this.props.pullInitialTriggerPAYGROUPMSGS();
    //console.log("MSGS CALLED");
  }

  // //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView({
  //     behavior: "instant",
  //     block: "start",
  //     inline: "nearest",
  //   });
  // };

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    // Put the Logic Here and NOT in the App.js Functions
    let isInitialMsgDoc = false;

    let chatMsgs = [];
    let sharedChatKey = this.props.selectedPayGroupDoc.allDocKey;

    let chatLikesObjs = [];

    let yourLikesObjs = [];

    //find a doc
    let yourChatDoc = this.props.selectedPayGroupChatDocs.find((x) => {
      return x.$ownerId === this.props.identity;
    });

    if (yourChatDoc === undefined) {
      isInitialMsgDoc = true;
    } else {
      //Decrypt DocKey -> UNECESSARY NOW, SEE ABOVE
      // sharedChatKey = DocKeyDecrypt(
      //   yourFirstChatDoc.docKey,
      //   yourChatDoc.timeIndex,
      //   this.props.mnemonic
      // );

      //console.log(sharedChatKey);

      //Get Encrypted Msgs ->
      let encryptedMsgs = [];

      this.props.selectedPayGroupChatDocs.forEach((doc) => {
        if (doc.msg1 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg1]);
        }
        if (doc.msg2 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg2]);
        }
        if (doc.msg3 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg3]);
        }
        if (doc.msg4 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg4]);
        }
        if (doc.msg5 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg5]);
        }
        if (doc.msg6 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg6]);
        }
        if (doc.msg7 !== "") {
          encryptedMsgs.push([doc.$ownerId, doc.msg7]);
        }
      });
      //Decrypt Msgs ->
      //msg should be Array of Objects
      // {
      //   msg: msg.msg,
      //   time: msg.time,
      //   owner: this.props.req.$ownerId, <- NOT this one
      // }
      //ADD isError ->

      let chatMsgsTuples;
      if (encryptedMsgs.length !== 0) {
        chatMsgsTuples = DecryptChatMsgs(encryptedMsgs, sharedChatKey);
        // ; //.flat();
      } else {
        chatMsgsTuples = [[], []];
      }

      //Changed to
      //msg1 = {msgs:[{msg:.., time:...}],likes:[]}

      //[decryptedMsgs, decryptedLikes]
      //[[{msgObjs},{...}],[[tuples],[...]]]

      //CAN'T FLAT YET BC IT IS MSG OBJECT NOW ->

      chatMsgs = chatMsgsTuples[0].flat();

      //console.log("chatMsgs: ", chatMsgs);

      chatLikesObjs = chatMsgsTuples[1].flat();

      //console.log("chatLikesObjs: ", chatLikesObjs);

      yourLikesObjs = chatLikesObjs.filter((likeTup) => {
        return likeTup[0] === this.props.identity;
      });

      //yourLikesObjs.flat();
      // console.log("yourLikesObjs: ", yourLikesObjs);
    }

    let likeTuples = [...chatLikesObjs];

    //console.log("likeTuples: ", likeTuples);

    let yourLikes = yourLikesObjs.map((x) => {
      return x[1];
    });

    //console.log("yourLikes: ", yourLikes);

    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            {this.props.isLoadingPayGroupMsgs ? (
              <>
                <Button variant="primary" disabled>
                  <IoMdArrowRoundBack size={28} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => this.props.handlePayGroupMsgsBackArrow()}
                >
                  <IoMdArrowRoundBack size={28} />
                </Button>
              </>
            )}

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Pay Group</b>
              ) : (
                <b>Pay Group</b>
              )}
            </h3>
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("PayGroupPmts")} //sharedChatKey
            >
              <b>MultiSigs</b>
            </Button>
          </Container>
        </Navbar>
        <div className="bodytext">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {/* Wallet Data Removed */}

              <div id="sidetextonlytop">
                <CreditsOnPage
                  identityInfo={this.props.identityInfo}
                  uniqueName={this.props.uniqueName}
                  showModal={this.props.showModal}
                />
              </div>

              {this.props.isLoadingPayGroupMsgs ? (
                <>
                  <p></p>
                  <div id="spinner">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                  <p></p>
                </>
              ) : (
                <></>
              )}

              {!this.props.isLoadingPayGroupMsgs && isInitialMsgDoc ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() => this.props.createStartPayGroupsMsgs()}
                    >
                      <b>Enter Group Chat</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {!this.props.isLoadingPayGroupMsgs && !isInitialMsgDoc ? (
                <>
                  <SelectedPayGroupMsgs
                    uniqueName={this.props.uniqueName}
                    today={today}
                    yesterday={yesterday}
                    identity={this.props.identity}
                    chatMsgs={chatMsgs}
                    likeTuples={likeTuples}
                    theSecret={sharedChatKey}
                    yourLikes={yourLikes}
                    selectedPayGroupNameDocs={
                      this.props.selectedPayGroupNameDocs
                    }
                    showAddLikeToChatDocModal={
                      this.props.showAddLikeToChatDocModal
                    }
                  />

                  {/* FORM COMPONENT HERE!!! */}
                  {
                    <SelectedPayGroupForm
                      showAddMessageToChatDocModal={
                        this.props.showAddMessageToChatDocModal
                      }
                      theSharedSecret={sharedChatKey}
                    />
                  }
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <p></p>
          {chatMsgs.length > 4 ? (
            <>
              <div className="tenfooter"></div>
            </>
          ) : (
            <></>
          )}

          {/* <p></p>
           https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react 
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
          <p></p> */}
        </div>
      </>
    );
  }
}

export default SelectedPayGroupPage;
