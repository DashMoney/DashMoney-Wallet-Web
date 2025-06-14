//Create the differenct cards for different payments with their associated data

import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import SlctdPGAcctPmt from "./SlctdPGAcctPmt";

class SlctdPGAcctPmts extends React.Component {
  // constructor(props) {  //MOVED TO APP STATE
  //   super(props);
  //   this.state = {
  //
  //   };
  // }

  // onChange = (event) => {
  //   //Payment Schedule
  //   if (event.target.id === "formFilter") {
  //     event.stopPropagation();
  //     //this.props.handlePayGroupsOrderFilter(event.target.value);
  //   }
  // };

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    // Need to do the comparison here:

    //selectedPayGroupDoc={this.props.selectedPayGroupDoc}
    //selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
    //selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
    //selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}

    //HERE -> // type,multiSigAddr,utxos,payouts,txId,sig

    let thePayInitPayments = this.props.selectedPayGroupPayInitDocs.filter(
      (payInit) => {
        return payInit.txData.type === "payment";
      }
    );

    console.log("thePayInitPayments: ", thePayInitPayments);

    let selectedPayInitPayments = thePayInitPayments.filter((selDoc) => {
      return (
        this.props.selectedPayGroupDoc.scripts.pub[
          this.props.selectedPayGroupAcctIndex
        ][0] === selDoc.txData.multiSigAddr
      );
    });

    console.log("selectedPayInitPayments: ", selectedPayInitPayments);

    /*
   

    Then For each PayInit pass to AcctPmt Card

        AcctPmt Card will sort PayDocs and Display Data

        Signed or Not Signed

        Then add Signature button

        and when enough -> Broadcast TX
        

     * 
     */

    let payments = selectedPayInitPayments.map((payInitDoc, index) => {
      //console.log(yourPGDoc);
      return (
        <Col key={index} lg={6}>
          <div style={{ marginBottom: "0.5rem" }}>
            <SlctdPGAcctPmt
              mnemonic={this.props.mnemonic}
              whichNetwork={this.props.whichNetwork}
              //key={index}
              mode={this.props.mode}
              index={index}
              payInitDoc={payInitDoc}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              uniqueName={this.props.uniqueName}
              //
              selectedPayGroupAcctIndex={this.props.selectedPayGroupAcctIndex}
              //
              YourPGsMultiSigUTXOs={this.props.YourPGsMultiSigUTXOs}
              handleGoToPayGroupAcct={this.props.handleGoToPayGroupAcct}
              showConfirmAcceptPmtModal={this.props.showConfirmAcceptPmtModal}
              showConfirmBroadcastPmtModal={
                this.props.showConfirmBroadcastPmtModal
              }
              //
              selectedPayGroupDoc={this.props.selectedPayGroupDoc}
              selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
              selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
              selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}
              selectedPayGroupPayDocs={this.props.selectedPayGroupPayDocs}
            />
          </div>
        </Col>
      );
    });

    let formBkg;
    let formText;

    if (this.props.mode === "primary") {
      formBkg = "light";
      formText = "dark";
    } else {
      formBkg = "dark";
      formText = "light";
    }

    return (
      <>
        <Row className="justify-content-md-center">
          <Col md={9} lg={8} xl={7} xxl={6}>
            {/* <Form
              noValidate
              // onSubmit={this.handleSubmitClick}
              //onChange={this.onChange}
            >
              ORDER FILTER FORM BELOW 

              <Form.Group className="mb-3" controlId="formFilter">

                <Form.Select
                  style={{ fontWeight: "bold" }}
                  // bg={formBkg}
                  //text={formText}
                  data-bs-theme={formBkg}
                  defaultValue={this.props.DisplayPayGroupsOrder}
                >
                  <option value="Most Recent" style={{ fontWeight: "bold" }}>
                    Most Recent
                  </option>
                  <option value="Alphabetical" style={{ fontWeight: "bold" }}>
                    Alphabetical
                  </option>
                </Form.Select>
              </Form.Group>
            </Form>

            <p></p> */}
          </Col>
        </Row>
        <p></p>

        {selectedPayInitPayments.length === 0 ? (
          <>
            <p style={{ textAlign: "center" }}>
              Payments for Multisig will appear here.
            </p>
          </>
        ) : (
          <>
            <Row className="justify-content-md-center">{payments}</Row>
          </>
        )}
      </>
    );
  }
}

export default SlctdPGAcctPmts;
