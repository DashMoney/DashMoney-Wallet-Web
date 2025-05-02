import React from "react";
import Card from "react-bootstrap/Card";
import formatDate from "../TimeDisplayLong";

class SelectedPayGroupMsgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(`${this.props.tuple[0]}`);
    this.setState({
      copiedName: true,
    });
  };

  render() {
    //PULL THE MSGS FROM ALL ->

    let messages = [];

    //Put message from You a little right and other a little to the left ->

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
      obj.label = msgAuthor.label;
    });

    messages = orderedMsgs.map((msg, index) => {
      if (msg.owner === this.props.identity) {
        return (
          <div index={index} key={index} style={{ paddingLeft: "2rem" }}>
            <div
              //className="BottomThinBorder"
              className="ThreadBorder"
              style={{ paddingTop: ".3rem", marginBottom: ".3rem" }}
            ></div>

            <Card.Title className="cardTitle">
              <b>{this.props.uniqueName}</b>

              <span className="textsmaller" style={{ paddingRight: "2rem" }}>
                {formatDate(msg.time, this.props.today, this.props.yesterday)}
              </span>
            </Card.Title>
            <Card.Text style={{ whiteSpace: "pre-wrap" }}>{msg.msg}</Card.Text>
          </div>
        );
      } else {
        return (
          <div index={index} key={index} style={{ paddingRight: "2rem" }}>
            <div
              //className="BottomThinBorder"
              className="ThreadBorder"
              style={{ paddingTop: ".3rem", marginBottom: ".3rem" }}
            ></div>

            <Card.Title className="cardTitle">
              <b style={{ color: "#008de4" }}>{msg.label}</b>

              <span className="textsmaller">
                {formatDate(msg.time, this.props.today, this.props.yesterday)}
              </span>
            </Card.Title>
            <Card.Text style={{ whiteSpace: "pre-wrap" }}>{msg.msg}</Card.Text>
          </div>
        );
      }
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
