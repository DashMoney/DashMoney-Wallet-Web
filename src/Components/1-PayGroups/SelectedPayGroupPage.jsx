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

import "../../App.css";

class SelectedPayGroupPage extends React.Component {
  componentDidMount() {
    this.props.pullInitialTriggerPAYGROUPMSGS();
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
    let sharedChatKey;

    //OrderChatDocs

    //find a first doc from me
    let yourChatDoc = this.props.selectedPayGroupChatDocs.find((x) => {
      return x.$ownerId === this.props.identity;
    });

    if (yourChatDoc === undefined) {
      isInitialMsgDoc = true;
    } else {
      //Decrypt DocKey ->
      sharedChatKey = DocKeyDecrypt(
        yourChatDoc.docKey,
        yourChatDoc.timeIndex,
        this.props.mnemonic
      );

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
      });
      //Decrypt Msgs ->
      //msg should be Array of Objects
      // {
      //   msg: msg.msg,
      //   time: msg.time,
      //   owner: this.props.req.$ownerId, <- NOT this one
      // }
      //ADD isError ->

      //NEED TO ADD MSGS BEFORE CAN DECRYPT.
      chatMsgs = DecryptChatMsgs(encryptedMsgs, sharedChatKey).flat();

      // console.log("chatMsgs: ", chatMsgs);
    }

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
                  onClick={() => this.props.handlePayGroupBackArrow()}
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
              onClick={() => this.props.handleSelectedDapp("PayGroupPmts")}
            >
              <b>Payments</b>
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
                      onClick={() => this.props.decideStartOrNotPayGroupsMsgs()}
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
                    selectedPayGroupNameDocs={
                      this.props.selectedPayGroupNameDocs
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
          <div className="tenfooter">
            {/* {messages}
             */}
          </div>

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
