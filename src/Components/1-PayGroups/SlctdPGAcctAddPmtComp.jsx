import React from "react";
//import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

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
    //starts with X (mainnet) or Y (Testnet) and is 34 characters in length
    let addrRegex;
    if (this.props.whichNetwork === "testnet") {
      addrRegex = /^[y8][\S]{33}$/;
    } else {
      addrRegex = /^[X7][\S]{33}$/;
    }

    let validAddr = addrRegex.test(addrInput);

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
    //console.log(this.props.accountBalance);

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(numberInput);

    //let result = this.props.accountBalance - numberInput * 100000000;
    //console.log(result);

    //if (result >= 0 && valid && numberInput > 0) {
    if (valid && numberInput > 0) {
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

  priceValidate = (price) => {
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(price);

    if (valid) {
      this.setState({
        priceInput: price,
        validPrice: true,
      });
    } else {
      this.setState({
        priceInput: price,
        validPrice: false,
      });
    }
  };

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
      //
      // labelInput: "",
      // validLabel: false,
      // //
      // qtyInput: "",
      // validQty: true,
      // //
      // priceInput: 0,
      // validPrice: false,
    });
  };

  render() {
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

        {/* <h4 style={{ textDecoration: "underline" }}>Add Variants</h4> */}

        {/* {this.props.paymentArray.length > 0 ? (
          <></>
        ) : (
          <>
            <p>
              Use variants to include different variations of the same
              product.(e.g. Shirt sizes - Large, Medium, and Small)
            </p>
          </>
        )} */}

        {/* {this.props.paymentArray.length > 0 ? (
          <>
            <Button
              onClick={() => this.props.removeFieldOfVariant()}
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
        )} */}

        <div id="sidetextonlysides">
          {/* BELOW IS EXCHANGE FORM TABS -> CHANGE TO PAY AND REQUEST */}

          {/* Below is the Pay to a Name Stuff */}
          {/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/}
          <Form
            id="formControlReset"
            noValidate
            //onSubmit={this.submitAndResetForm}
            onChange={this.onChange}
          >
            {/* <Form
              id="Pay-to-Addr-form"
              noValidate
              onSubmit={this.handleVerifyClick}
              onChange={this.onChange}
            > */}
            <Form.Group className="mb-3" controlId="validationCustomAddr">
              <Form.Label>Send Dash to Address:</Form.Label>

              {/* <Form.Label>Send Dash to:</Form.Label> */}

              <Form.Control
                type="text"
                placeholder="Enter address here.."
                defaultValue={this.state.sendToAddr}
                // required
                isValid={this.state.addrFormat}
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
                type="number"
                placeholder="0.15 for example.."
                defaultValue={this.state.amountToSend}
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
          {this.props.paymentArray.length <= 7 &&
          this.state.addrFormat &&
          this.state.numberQuantity &&
          !this.props.exceedsWalletAmt ? ( //&&
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
                    Insufficient Wallet Funds
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

        {/* <div
          className="BottomBorder"
          style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
        ></div> */}

        {this.props.paymentArray.length > 7 ? (
          <>
            <p className="textsmaller">(Limit of 8 Payouts)</p>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default AddPaymentComponent;
