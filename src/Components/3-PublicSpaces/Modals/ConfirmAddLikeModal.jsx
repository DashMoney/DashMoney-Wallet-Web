import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import { BiSolidLike } from "react-icons/bi";
//<BiSolidLike />

class ConfirmAddLikeModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleAddLiketoGroupChat = () => {
    this.props.decideMsgNumOrNewDoc4LIKE();
    //this.props.closeTopNav();
    this.props.hideModal();
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    return (
      <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
        <Modal.Header>
          <Modal.Title>Add Like to Message</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <div className="cardTitle">
            <b style={{ color: "#008de4", fontSize: "large" }}>
              {this.props.messageObjectLiked.label}
            </b>

            <span
              className="textsmaller"
              style={{ paddingRight: "2rem" }}
            ></span>
          </div>
          <div className="bodytext">
            <p style={{ whiteSpace: "pre-wrap" }}>
              <b>{this.props.messageObjectLiked.msg}</b>
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            //onClick={this.handleAddLiketoGroupChat}
          >
            {/* <b>Add Like</b> */}
            <BiSolidLike
              size={22}
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmAddLikeModal;
