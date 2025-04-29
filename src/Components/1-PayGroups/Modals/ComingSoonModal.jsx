import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class ComingSoonModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  // handleRegisterPayGroup = () => {
  //   // this.props.RegisterYourPayGroupPubKey();
  //   // this.props.closeTopNav();
  //   this.props.hideModal();
  // };

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
          <Modal.Title>Multisig Payments</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <h3 style={{ textAlign: "center", textDecoration: "bold" }}>
            Coming Soon!
          </h3>
          {/* Enabling <b>Pay Groups</b> will allow you to form multisigs and
          private group chats with others on Dash Platform. */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.handleCloseClick}>
            <b>Close</b>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ComingSoonModal;
