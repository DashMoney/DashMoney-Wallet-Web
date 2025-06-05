import React from "react";
import Card from "react-bootstrap/Card";
import formatDate from "../TimeDisplayLong";

import Button from "react-bootstrap/Button";

import SelectedPayGroupMsg from "./SelectedPayGroupMsg";

class SelectedPayGroupMsgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  render() {
    //PULL THE MSGS FROM ALL ->
    // chatMsgs={chatMsgs}

    let messages = [];

    // this.props.flatMsgObjArray.forEach((msg) => {
    //   if (msg.msg !== "") {
    //     let newMsg = {
    //       msg: msg.msg,
    //       time: msg.time,
    //       owner: this.props.req.$ownerId,
    //     };
    //     messages.push(newMsg);
    //   }
    // });

    // //need to order the MSGS ->
    let orderedMsgs = this.props.chatMsgs.sort(function (a, b) {
      return a.time - b.time;
    });

    //Use NameDocs to put labels on ->

    let orderedMsgsArray = [];

    orderedMsgs.forEach((obj) => {
      let msgAuthor = this.props.selectedPayGroupNameDocs.find((nameDoc) => {
        return nameDoc.$ownerId === obj.owner;
      });
      if (msgAuthor === undefined) {
        msgAuthor = {
          label: "No Name Avail",
          $ownerId: obj.owner,
        };
      }
      orderedMsgsArray.push({
        label: msgAuthor.label,
        msg: obj.msg,
        time: obj.time,
        owner: obj.owner,
      });
      // obj.label = msgAuthor.label;
    });

    // likeTuples={likeTuples}
    //     [owner,msgIdentifier],[..],...]

    // yourLikes={yourLikes}
    //     array of likeIdentifier

    let likeObjsArray = []; // owner, label, likeIdentifier

    //Use NameDocs to put labels on -> Do for likes too ->
    //Add NameDocs to include in List

    let nameDocs = this.props.selectedPayGroupNameDocs;

    nameDocs.push({
      label: this.props.uniqueName,
      $ownerId: this.props.identity,
    });

    this.props.likeTuples.forEach((tuple) => {
      let likeAuthor = this.props.selectedPayGroupNameDocs.find((nameDoc) => {
        return nameDoc.$ownerId === tuple[0];
      });
      if (likeAuthor === undefined) {
        likeAuthor = {
          label: "No Name Avail",
          $ownerId: tuple[0],
        };
      }

      likeObjsArray.push({
        owner: tuple[0],
        likeId: tuple[1],
        label: likeAuthor.label,
      });

      // tuple.push = likeAuthor.label;
      //UNLESS i JUST PUSH TO TUPLE SO NOW TRUPLE?
      //     [owner,msgIdentifier,label],[..],...]
    });

    console.log("orderedMsgsArray: ", orderedMsgsArray);

    messages = orderedMsgsArray.map((msg, index) => {
      //move to msg component
      return (
        <SelectedPayGroupMsg
          msg={msg}
          theSecret={this.props.theSecret}
          likeObjsArray={likeObjsArray}
          yourLikes={this.props.yourLikes}
          key={index}
          index={index}
          uniqueName={this.props.uniqueName}
          today={this.props.today}
          yesterday={this.props.yesterday}
          identity={this.props.identity}
          showAddLikeToChatDocModal={this.props.showAddLikeToChatDocModal}
        />
      );
    });

    return (
      <>
        {messages.length === 0 ? (
          <>
            <p style={{ textAlign: "center", marginTop: "3rem" }}>
              (Messages shared with the group will appear here.)
            </p>
          </>
        ) : (
          <>{messages}</>
        )}
      </>
    );
  }
}

export default SelectedPayGroupMsgs;
