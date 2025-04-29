import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import handleDenomDisplay from "../../UnitDisplay";

class ConfirmCreatePayGroupModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleSubmitClick = (event) => {
    event.preventDefault();

    console.log("NameDocs: ", this.props.newPayGroupNameDocs);
    console.log("ECDHDocs: ", this.props.newPayGroupECDHDocs);

    this.props.createPayGroupMbrDoc();

    //console.log("Disconnected in Modal Submit");

    this.handleCloseClick();
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
    // newPayGroupNameDocs={this.state.newPayGroupNameDocs}
    // newPayGroupECDHDocs={this.state.newPayGroupECDHDocs}

    //Ensure PayGroupECDH Doc ->
    let isNameAndECDHVerified = true;

    //Create list to display

    let listofMembers = this.props.newPayGroupNameDocs.map((nameDoc, index) => {
      if (nameDoc.$ownerId === this.props.newPayGroupECDHDocs[index].$ownerId) {
        return (
          <li key={index}>
            <h5>
              <b>{nameDoc.label}</b>
            </h5>
          </li>
        );
      } else {
        isNameAndECDHVerified = false;
        return (
          <li key={index}>
            <h5 style={{ color: "red" }}>
              <b>{nameDoc.label}</b> error
            </h5>
          </li>
        );
      }
    });

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Confirm Pay Group Creation</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                marginTop: ".5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div className="indentStuff">
                <h4>
                  <b>Pay Group Members</b>
                </h4>
                <ul>
                  <li>
                    <h5>
                      <b>{this.props.uniqueName}</b>
                    </h5>
                  </li>
                  {listofMembers}
                </ul>
              </div>
            </div>

            {/* <h6>
              <b>Message:</b>
              {this.props.messageToSend !== "" ? (
                <span>{this.props.messageToSend}</span>
              ) : (
                <span>(No Message)</span>
              )}
            </h6> */}
            <p></p>
          </Modal.Body>
          <Modal.Footer>
            <>
              <Button variant="primary" onClick={this.handleSubmitClick}>
                <b>Create Pay Group</b>
              </Button>
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmCreatePayGroupModal;
