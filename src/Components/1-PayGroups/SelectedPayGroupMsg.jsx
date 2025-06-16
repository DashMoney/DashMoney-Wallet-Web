import React from "react";
import Card from "react-bootstrap/Card";
import formatDate from "../TimeDisplayLong";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { BiLike } from "react-icons/bi";
//<BiLike />

//import { TbArrowBigUp } from "react-icons/tb";
// <TbArrowBigUp /> //the outline one

import { BiSolidLike } from "react-icons/bi";
//<BiSolidLike />

//import { TbArrowBigUpFilled } from "react-icons/tb";
// <TbArrowBigUpFilled /> // the filled one

class SelectedPayGroupMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      clickText: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(`${this.props.msg.label}`);
    this.setState({
      copiedName: true,
    });
  };

  handleTextClick = () => {
    if (this.state.clickText) {
      this.setState({
        clickText: false,
      });
    } else {
      this.setState({
        clickText: true,
      });
    }
  };

  handleLikeDisplay = () => {
    // if you own only display if someone like and you can never click on.
    // if someone else own display on text click or if other have already liked and you cant like more than once.
  };

  render() {
    let likeVariant = "outline-dark";

    if (this.props.mode === "primary") {
      likeVariant = "outline-dark";
    } else {
      likeVariant = "outline-light";
    }
    //theMsg, theLikes

    const theMsg = this.props.msg;

    let msgIdentifier =
      this.props.msg.owner.slice(0, 4) +
      this.props.msg.time.toString().slice(0, -3);

    //console.log("msgIdentifier: ", msgIdentifier);

    //count the number of likes here ->
    //likeObjsArray={likeObjsArray}

    //filter likesObjs
    let filteredLikes = this.props.likeObjsArray.filter(
      (x) => x.likeId === msgIdentifier
    );

    let likeCount = filteredLikes.length;

    // and make a name List for hover

    let likeNamesList = filteredLikes.map((x, index) => {
      return (
        <p key={index} style={{ marginBottom: "0rem" }}>
          {x.label}
        </p>
      );
    });

    // likeNamesList = [
    //   <p style={{ marginBottom: "0rem" }}>alex</p>,
    //   <p style={{ marginBottom: "0rem" }}>bobby</p>,
    // ];

    //yourLikes={this.props.yourLikes}

    let isLikedByMeAlready = this.props.yourLikes.includes(msgIdentifier);

    // **

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {likeNamesList}
      </Tooltip>
    );

    let message;

    //console.log("theMsg: ", theMsg);

    if (theMsg.owner === this.props.identity) {
      message = (
        <div style={{ paddingLeft: "2rem" }}>
          <div
            //className="BottomThinBorder"
            className="ThreadBorder"
            style={{ paddingTop: ".3rem", marginBottom: ".3rem" }}
          ></div>
          <Card.Title className="cardTitle">
            <b>{this.props.uniqueName}</b>

            <span className="textsmaller" style={{ paddingRight: "2rem" }}>
              {formatDate(theMsg.time, this.props.today, this.props.yesterday)}
            </span>
          </Card.Title>
          <Card.Text style={{ whiteSpace: "pre-wrap", margin: "0.4rem" }}>
            {theMsg.msg}
          </Card.Text>
          {/* if you own : only display if someone likes and you can never click on. -> SAT
           */}

          {likeCount > 0 ? (
            <>
              <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  variant={likeVariant}
                  style={{
                    marginLeft: "1rem",
                    paddingTop: "0rem",
                    paddingBottom: "0.1rem",
                  }}
                  //disabled
                  //onClick={() => this.props.showAddLikeToChatDocModal(theMsg)}
                >
                  <BiSolidLike size={22} /> <span>{likeCount}</span>
                </Button>
              </OverlayTrigger>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      message = (
        <div style={{ paddingRight: "2rem" }}>
          <div
            //className="BottomThinBorder"
            className="ThreadBorder"
            style={{ paddingTop: ".3rem", marginBottom: ".3rem" }}
          ></div>

          <Card.Title className="cardTitle">
            <b style={{ color: "#008de4" }}>{theMsg.label}</b>
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
            <span className="textsmaller">
              {formatDate(theMsg.time, this.props.today, this.props.yesterday)}
            </span>
          </Card.Title>
          <Card.Text
            style={{ whiteSpace: "pre-wrap", margin: "0.4rem" }}
            onClick={() => this.handleTextClick()}
          >
            {theMsg.msg}
          </Card.Text>
          {/*  if someone else own: display on text click or if other have already liked and you cant like more than once.

          ADD the hover - overlay and tooltip
          */}
          {this.state.clickText || likeCount > 0 ? (
            <>
              {isLikedByMeAlready ? (
                <>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 200, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button
                      variant={likeVariant}
                      style={{
                        marginLeft: "1rem",
                        paddingTop: "0rem",
                        paddingBottom: "0.1rem",
                      }}
                      // onClick={() => this.props.showAddLikeToChatDocModal(theMsg)}
                    >
                      <BiSolidLike size={22} /> <span>{likeCount}</span>
                    </Button>
                  </OverlayTrigger>
                </>
              ) : (
                <>
                  {likeCount === 0 && this.state.clickText ? (
                    <>
                      <Button
                        variant={likeVariant}
                        style={{
                          marginLeft: "1rem",
                          paddingTop: "0rem",
                          paddingBottom: "0.1rem",
                        }}
                        onClick={() =>
                          this.props.showAddLikeToChatDocModal(
                            theMsg,
                            this.props.theSecret
                          )
                        }
                      >
                        <BiLike size={22} /> <span>{likeCount}</span>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      );
    }

    return <>{message}</>;
  }
}

export default SelectedPayGroupMsg;
