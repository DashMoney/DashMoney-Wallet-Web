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
      } //,() => console.log(this.state.paymentArray)
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

  handleSubmitClick = (utxosToUse, theAddr) => {
    this.props.showConfirmCreatePayInitModal(
      utxosToUse,
      theAddr,
      this.state.paymentArray
    );
  };

  // componentDidMount() {
  //   this.props.pullInitialTrigger();
  // }

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  render() {
    //MAKE THIS A LIST OF PAYMENT ADDRS AND AMTS ->

    let payoutTotal = 0;

    this.state.paymentArray.forEach((tuple) => {
      payoutTotal += tuple[1];
    });

    //Pass the buildAddrScript and the UTXOs -> HERE

    let scriptsAddr =
      this.props.selectedPayGroupDoc.scripts.pub[
        this.props.selectedPayGroupAcctIndex
      ][0];

    //console.log(scriptsAddr);

    // this.props.isLoadingPayGroupAcct
    // this.props.selectedPayGroupAcctIndex

    let utxoArray = this.props.YourPGsMultiSigUTXOs.filter((utxo) => {
      return utxo.address === scriptsAddr;
    });

    //console.log("utxoArray: ", utxoArray);

    //REIMPLEMENT WITH MULTISIG UTXO BALANCE AND WITH FEE COST INCLUDED ->

    let acctBalance = 0;

    utxoArray.forEach((utxo) => (acctBalance += utxo.satoshis));

    let exceedsWalletAmt = false;

    if (acctBalance < payoutTotal + 100000) {
      exceedsWalletAmt = true;
    }

    let selectedUTXOs = [];

    if (!exceedsWalletAmt) {
      let localTotal = 0;
      //find sum of selectedUTXOs, if less than add the next UTXO to the selectedUTXOs ->
      utxoArray.forEach((tuple) => {
        if (localTotal < payoutTotal + 100000) {
          selectedUTXOs.push(tuple);
        }
      });
    }

    let isUniquePayouts = true;

    if (this.state.paymentArray.length > 1) {
      let uniquePayouts = this.state.paymentArray.map((pay) => pay[0]);
      //console.log(uniquePayouts);
      let setOfUniquePayouts = [...new Set(uniquePayouts)];
      //console.log(setOfUniquePayouts);
      if (uniquePayouts.length === setOfUniquePayouts.length) {
        isUniquePayouts = true;
      } else {
        isUniquePayouts = false;
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
          <div
            style={{
              textAlign: "center",
              marginTop: ".5rem",
              marginBottom: "1rem",
            }}
          >
            <h2>
              <Badge bg="primary">
                <b //style={{ color: "#008de4" }}
                >
                  {
                    this.props.selectedPayGroupDoc.scripts.pub[
                      this.props.selectedPayGroupAcctIndex
                    ][1]
                  }
                  : {handleDenomDisplay(this.props.whichNetwork, acctBalance)}
                </b>{" "}
                {/* in <b>MultiSig</b> */}
              </Badge>
            </h2>
          </div>

          <p></p>

          <AddPaymentComponent
            mode={this.props.mode}
            whichNetwork={this.props.whichNetwork}
            paymentArray={this.state.paymentArray}
            removePayment={this.removePayment}
            addPayment={this.addPayment}
            exceedsWalletAmt={exceedsWalletAmt}
            isUniquePayouts={isUniquePayouts}
          />
          <p></p>

          {!isUniquePayouts ? (
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

          {/* {this.state.paymentArray.length === 8 ? (
            <>
              <p className="textsmaller">(Limit of 8 payments for testnet)</p>
            </>
          ) : (
            <></>
          )} */}

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
          this.state.paymentArray.length < 9 &&
          !exceedsWalletAmt &&
          isUniquePayouts ? (
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  this.handleSubmitClick(selectedUTXOs, scriptsAddr)
                }
              >
                <b>Start Payment</b>
              </Button>
            </div>
          ) : (
            <></>
          )}

          {this.state.paymentArray.length == 0 ||
          this.state.paymentArray.length >= 9 ||
          exceedsWalletAmt ||
          !isUniquePayouts ? (
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
