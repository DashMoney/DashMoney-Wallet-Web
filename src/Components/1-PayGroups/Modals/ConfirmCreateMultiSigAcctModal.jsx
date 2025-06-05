import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import handleDenomDisplay from "../../UnitDisplay";

class ConfirmCreateMultiSigAcctModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleSubmitClick = (event) => {
    event.preventDefault();

    this.props.editPayGroupMbrDoc4MultiSigAcct();

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

    // let listofMembers = this.props.newPayGroupNameDocs.map((nameDoc, index) => {
    //   if (nameDoc.$ownerId === this.props.newPayGroupECDHDocs[index].$ownerId) {
    //     return (
    //       <li key={index}>
    //         <h5>
    //           <b>{nameDoc.label}</b>
    //         </h5>
    //       </li>
    //     );
    //   } else {
    //     isNameAndECDHVerified = false;
    //     return (
    //       <li key={index}>
    //         <h5 style={{ color: "red" }}>
    //           <b>{nameDoc.label}</b> error
    //         </h5>
    //       </li>
    //     );
    //   }
    // });

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Confirm MultiSig</Modal.Title>
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
                <p>New MultiSig Account:</p>
                <div className="indentStuff">
                  <h5>
                    <b>{this.props.multiSigLabel}</b>
                  </h5>
                </div>
                <ul>
                  <li>
                    Requires <b>{this.props.multiSigNumOfMbrs} members</b> to
                    approve payments.
                  </li>
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
                <b>Create MultiSig</b>
              </Button>
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmCreateMultiSigAcctModal;
