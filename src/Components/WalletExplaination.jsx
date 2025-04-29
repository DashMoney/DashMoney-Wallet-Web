import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class WalletExplaination extends React.Component {
  handleCloseClick = () => {
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
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>
              <b>Wallet: 2-Party Pay and Pay Groups</b>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <h3 style={{ color: "#008de4" }}>What is this Wallet for?</h3>
            <p>
              The DashMoney Wallet is a more secure application that should run
              as a native mobile application or a desktop application.
            </p>
            <p>
              This wallet contain access to Dash Platform (DPNS) names, 2-Party
              Pay, and Pay Groups.
            </p>
            <h3 style={{ color: "#008de4" }}>
              How do Pay Groups and 2-Party Pay work?
            </h3>
            <p>
              Both dapps operate on Dash's Core and Platform networks. The
              parties involved use Dash Platform to coordinate and Dash Core for
              the multisig.
            </p>

            <h3 style={{ color: "#008de4" }}>
              Where can I find the code for this frontend?
            </h3>
            <p>
              You can find the source code{" "}
              <b>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/DashMoney"
                >
                  https://github.com/DashMoney
                </a>
              </b>
              , and run the frontend yourself.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.props.hideModal}>
              <b>Close</b>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default WalletExplaination;
