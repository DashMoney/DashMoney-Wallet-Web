import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import CreditsOnPage from "../CreditsOnPage";

import AddPaymentComponent from "./SlctdPGAcctAddPmtComp";
import handleDenomDisplay from "../UnitDisplay";

class SlctdPGAcctCreatePmt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false,
      presentModal: "",

      paymentArray: [],
    };
  }

  //paymentArray
  addPayment = (paymentTuple) => {
    this.setState(
      {
        paymentArray: [...this.state.paymentArray, paymentTuple],
      },
      () => console.log(this.state.paymentArray)
    );
  };

  removePayment = () => {
    let removedFieldArray = new Array(...this.state.paymentArray);
    //BE CAREFUL WITH POP THAT IS TOUCHING THE MAIN ARRAY
    removedFieldArray.pop();
    this.setState({
      paymentArray: removedFieldArray,
    });
  };

  handleSubmitClick = () => {
    //Get the UTXOs here ->
    //this.props.showConfirmCreatePayInitModal(theUTXOsToUse, theAddr, this.state.paymentArray);
  };

  // componentDidMount() {
  //   this.props.pullInitialTrigger();
  // }

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  render() {
    //MAKE THIS A LIST OF PAYMENT ADDRS AND AMTS ->

    let listofPayouts = this.state.paymentArray.map((tuple, index) => {
      return (
        <li key={index}>
          <p>
            <b>{handleDenomDisplay(this.props.whichNetwork, tuple[1])}</b> to{" "}
            <b>{tuple[0]}</b>
          </p>
        </li>
      );
    });

    let exceedsWalletAmt = false;

    //Pass the buildAddrScript and the UTXOs -> HERE

    //this.props.selectedMultisigBalance ->

    //REIMPLEMENT WITH MULTISIG UTXO BALANCE AND WITH FEE COST INCLUDED ->

    // let result =
    //   this.props.accountBalance - this.state.amountToSend * 100000000;
    // // console.log(result);
    // if (result <= 0 && this.state.amountToSend > 0) {
    //   exceedsWalletAmt = true;
    // }

    let uniquePayouts = true;

    if (this.state.paymentArray.length > 1) {
      let uniquePayouts = this.state.paymentArray.map((pay) => pay[0]);
      let setOfUniquePayouts = [...new Set(uniquePayouts)];

      if (uniquePayouts.length === setOfUniquePayouts.length) {
        uniquePayouts = true;
      } else {
        uniquePayouts = false;
      }
    }

    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("PayGroupAcct")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create Payment</b>
              ) : (
                <b>Create Payment</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>

        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* PUT THE MULTISIG AMT HERE */}

          <p></p>

          <AddPaymentComponent
            mode={this.props.mode}
            whichNetwork={this.props.whichNetwork}
            paymentArray={this.state.paymentArray}
            removePayment={this.removePayment}
            addPayment={this.addPayment}
            exceedsWalletAmt={exceedsWalletAmt}
          />
          <p></p>

          {!uniquePayouts ? (
            <>
              <p
                style={{ color: "red", textAlign: "center" }}
                className="smallertext"
              >
                The payouts need to have unique addresses.
              </p>
            </>
          ) : (
            <></>
          )}

          {/* **** ^^^^ FORMS AND INFO ^^^^ **** */}

          {this.state.paymentArray.length === 9 ? (
            <>
              <p className="textsmaller">(Limit of 10 payments for testnet)</p>
            </>
          ) : (
            <></>
          )}
          {/* MY SERIES OF ALERTS FOR ERRORS AND NO NAME AND NOT DGM DOC */}

          {/* {this.state.alreadyMember ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Duplicate Member - Alert</Alert.Heading>
                <p>This person is already a member of the Pay Group.</p>
              </Alert>
            </>
          ) : (
            <></>
          )} */}

          <p></p>
          {this.state.paymentArray.length === 0 ? (
            <>
              {" "}
              <p
                //className="smallertext"
                //style={{ color: "red", marginTop: ".2rem" }}
                style={{ textAlign: "center" }}
              >
                <b>Payments added will appear here.</b>
              </p>
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}

          {this.state.paymentArray.length > 0 ? (
            <>
              <Button
                onClick={() => this.removePayment()}
                style={{
                  //marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <></>
          )}

          {this.state.paymentArray.length > 0 &&
          this.state.paymentArray.length <= 7 ? (
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.handleSubmitClick()}
              >
                <b>Start Payment</b>
              </Button>
            </div>
          ) : (
            <></>
          )}

          {this.state.paymentArray.length == 0 ||
          this.state.paymentArray.length > 8 ? (
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button variant="primary" disabled size="lg">
                <b>Start Payment</b>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default SlctdPGAcctCreatePmt;
