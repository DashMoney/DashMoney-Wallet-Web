import React from "react";
//import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import handleDenomDisplay from "../UnitDisplay";

import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";

class AddPaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberQuantity: false,
      amountToSend: "", //changed from 0 for placeholder to appear

      sendToAddr: "",
      addrFormat: false,
      //
    };
  }

  onChange = (event) => {
    // console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "validationCustomAddr") {
      this.addrValidate(event.target.value);
    }

    if (event.target.id === "validationCustomNumber") {
      this.numberValidate(event.target.value);
    }
  };

  addrValidate = (addrInput) => {
    //console.log(addrInput);
    //starts with X (mainnet) or Y (Testnet) and is 34 characters in length
    let addrRegex;
    if (this.props.whichNetwork === "testnet") {
      addrRegex = /^[y8][\S]{33}$/;
    } else {
      addrRegex = /^[X7][\S]{33}$/;
    }

    let validAddr = addrRegex.test(addrInput);

    //console.log(validAddr);

    if (validAddr) {
      this.setState({
        sendToAddr: addrInput,
        addrFormat: true,
      });
    } else {
      this.setState({
        sendToAddr: addrInput,
        addrFormat: false,
      });
    }
  };

  numberValidate = (numberInput) => {
    //console.log(numberInput);

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(numberInput);

    //let result = this.props.accountBalance - numberInput * 100000000;
    //console.log(result);

    //if (result >= 0 && valid && numberInput > 0) {
    if (valid && Number(numberInput) > 0) {
      this.setState({
        amountToSend: numberInput,
        numberQuantity: true,
      });
    } else {
      this.setState({
        amountToSend: numberInput,
        numberQuantity: false,
      });
    }
  };

  // priceValidate = (price) => {
  //   //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

  //   let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
  //   //CHANGED TO LIMIT TO minimum mDash possible

  //   let valid = regex.test(price);

  //   if (valid) {
  //     this.setState({
  //       priceInput: price,
  //       validPrice: true,
  //     });
  //   } else {
  //     this.setState({
  //       priceInput: price,
  //       validPrice: false,
  //     });
  //   }
  // };

  submitAndResetForm = () => {
    this.props.addPayment([
      this.state.sendToAddr,
      Number((this.state.amountToSend * 100000000).toFixed(0)),
    ]);

    document.getElementById("formControlReset").reset();

    //   <Form
    //   id="formControlReset"
    //   noValidate
    //   //onsubmit={this.submitAndResetForm}
    //   onChange={this.onChange}
    // >
    //https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields

    this.setState({
      numberQuantity: false,
      amountToSend: "", //changed from 0 for placeholder to appear

      sendToAddr: "",
      addrFormat: false,
    });
  };

  render() {
    let listofPayouts = this.props.paymentArray.map((tuple, index) => {
      return (
        <li key={index}>
          <p>
            <b>{handleDenomDisplay(this.props.whichNetwork, tuple[1])}</b> to{" "}
            <b>{tuple[0]}</b>
          </p>
        </li>
      );
    });
    return (
      <>
        {/* <Form style={{ marginBottom: "1rem" }}>
          <div className="cardTitle">
            
            <Button
              variant="primary"
              //type="submit"
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                marginLeft: "1rem",
              }}
              noValidate
              onClick={() => this.()}
            >
              Add
            </Button>
          </div>
        </Form> */}

        <div id="sidetextonlysides">
          {/* BELOW IS EXCHANGE FORM TABS -> CHANGE TO PAY AND REQUEST */}

          {/* Below is the Pay to a Name Stuff */}
          {/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/}
          <Form
            id="formControlReset"
            noValidate
            //onSubmit={this.submitAndResetForm}
            //onChange={this.onChange}
          >
            <Form.Group className="mb-3" controlId="validationCustomAddr">
              <Form.Label>Send Dash to Address:</Form.Label>

              {/* <Form.Label>Send Dash to:</Form.Label> */}

              <Form.Control
                onChange={this.onChange}
                type="text"
                placeholder="Enter address here.."
                value={this.state.sendToAddr}
                //required
                isValid={this.state.addrFormat}
                //isInvalid={!this.state.addrFormat}
              />

              {/* type="text"
              placeholder="Enter name of variant..."
              required
              isInvalid={this.state.tooLongLabelError}
              isValid={this.state.validLabel} */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustomNumber">
              <Form.Label>Amount to Send (in Dash)</Form.Label>

              <Form.Control
                onChange={this.onChange}
                type="number"
                placeholder="0.15 for example.."
                value={this.state.amountToSend}
                isValid={this.state.numberQuantity}
                //isInvalid={!this.state.numberQuantity}
                // required
              />

              {/* <Form.Control
              //onChange={this.onChange}
              type="text"
              placeholder="0.85 for example.."
              required
              isValid={this.state.validPrice}
              //isInvalid={!this.state.validAmt}
            /> */}
            </Form.Group>
          </Form>
          {this.props.paymentArray.length <= 9 &&
          this.state.addrFormat &&
          this.state.numberQuantity &&
          !this.props.exceedsWalletAmt &&
          this.props.isUniquePayouts ? ( //&&
            //!this.props.isLoadingForm_WALLET
            <>
              <p> </p>
              <Button
                variant="primary"
                onClick={() => this.submitAndResetForm()}
              >
                Add Payout
              </Button>
            </>
          ) : (
            <>
              {this.props.exceedsWalletAmt ? (
                <>
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Insufficient MultiSig Funds
                  </p>
                </>
              ) : (
                <></>
              )}
              <Button disabled variant="primary" type="submit">
                Add Payout
              </Button>
            </>
          )}
        </div>

        {this.props.paymentArray.length > 8 ? (
          <>
            <p className="textsmaller">(Limit of 9 Payouts)</p>
          </>
        ) : (
          <></>
        )}

        <p></p>
        {this.props.paymentArray.length === 0 ? (
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

        {/* <div
          className="BottomBorder"
          style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
        ></div> */}
      </>
    );
  }
}

export default AddPaymentComponent;
