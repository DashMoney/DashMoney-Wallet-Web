import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import Alert from "react-bootstrap/Alert";

import handleDenomDisplay from "../../UnitDisplay";

class ConfirmAcceptPmtModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadTime: 4, //set to 4 when successful dgm addr and call
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  decrementTimer = () => {
    this.setState({
      loadTime: this.state.loadTime - 1,
    });
    if (this.state.loadTime >= 1) {
      const myTimeout = setTimeout(this.decrementTimer, 1000);
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();

    this.props.createPayGroupAcctPayDoc();

    this.handleCloseClick();
  };

  componentDidMount = () => {
    this.decrementTimer();
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

    //Create list to display

    // selectedMultiSigAddr={this.state.selectedMultiSigAddr}
    // selectedMultiSigPayouts={this.state.selectedMultiSigPayouts}

    // selectedPayGroupDoc={this.state.selectedPayGroupDoc}

    // selectedPayGroupAcctIndex={this.state.selectedPayGroupAcctIndex}
    // YourPGsMultiSigUTXOs={this.state.YourPGsMultiSigUTXOs}

    let listofPayouts = this.props.selectedMultiSigPayouts.map(
      (tuple, index) => {
        return (
          <li key={index}>
            <p>
              <b>{handleDenomDisplay(this.props.whichNetwork, tuple[1])}</b> to{" "}
              <b>{tuple[0]}</b>
            </p>
          </li>
        );
      }
    );

    //Pass the buildAddrScript and the UTXOs -> HERE

    let scriptsAddr =
      this.props.selectedPayGroupDoc.scripts.pub[
        this.props.selectedPayGroupAcctIndex
      ][0];

    let payoutTotal = 0;

    this.props.selectedMultiSigPayouts.forEach((tuple) => {
      payoutTotal += tuple[1];
    });

    //
    let utxoArray = this.props.YourPGsMultiSigUTXOs.filter((utxo) => {
      return utxo.address === scriptsAddr;
    });

    let acctBalance = 0;

    utxoArray.forEach((utxo) => (acctBalance += utxo.satoshis));

    let leftOver = acctBalance - (payoutTotal + 100000);

    // if (acctBalance < payoutTotal + 100000) {
    //   exceedsWalletAmt = true;
    // }

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Confirm Payment</Modal.Title>
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
                {/* <h5>
                  MAYBE DO THE MULTISIG LABEL LIKE STORE..
                    <b>{this.props.multiSigLabel}</b>
                  </h5> */}
              </div>
              <div className="indentStuff">
                {/* <h4>
                  <b>Payouts</b>
                </h4> */}
                <p></p>
                <Alert
                  variant="primary"

                  //dismissible
                >
                  <Alert.Heading>Payouts</Alert.Heading>
                  <ul>{listofPayouts}</ul>
                </Alert>
              </div>
            </div>

            <p></p>
            <div className="ButtonRightNoUnderline">
              <h5>
                <b>MultiSig (After Payment):</b>
              </h5>

              <h4 className="indentMembers" style={{ color: "#008de4" }}>
                <b>{handleDenomDisplay(this.props.whichNetwork, leftOver)}</b>
              </h4>
            </div>
            <p></p>
          </Modal.Body>
          <Modal.Footer>
            <>
              {this.state.loadTime >= 1 ? (
                <Button variant="primary" disabled>
                  <b>Sign Payment ({this.state.loadTime})</b>
                </Button>
              ) : (
                <Button variant="primary" onClick={this.handleSubmitClick}>
                  <b>Sign Payment</b>
                </Button>
              )}
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmAcceptPmtModal;
