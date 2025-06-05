//Create the differenct cards for the multisigs with their associated data

import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import SlctdPGPmtsMultisig from "./SlctdPGPmtsMultiSig";

class SlctdPGPmtsMultiSigs extends React.Component {
  // constructor(props) {  //MOVED TO APP STATE
  //   super(props);
  //   this.state = {
  //
  //   };
  // }

  onChange = (event) => {
    //Payment Schedule
    if (event.target.id === "formFilter") {
      event.stopPropagation();
      //this.props.handlePayGroupsOrderFilter(event.target.value);
    }
  };

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    // Need to do the comparison here:

    //selectedPayGroupDoc={this.props.selectedPayGroupDoc}
    //selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
    //selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
    //selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}

    let yourAccounts = [];
    // need to check others (my scripts - their scripts) -> this is done next level down ->

    let offerAccounts = [];
    // need to check if others have something I don't and do that here!!

    let yourPGMbrDoc = this.props.selectedPayGroupDoc;
    // let yourPGMbrDoc = this.props.selectedPayGroupMbrDocs.find(
    //   (x) => x.$ownerId === this.props.identity
    // );

    //Does this include your Mbr Doc? ->
    //console.log("yourPGMbrDoc: ", yourPGMbrDoc);

    let yourScriptsKeys = [];

    if (yourPGMbrDoc.scripts !== "") {
      yourScriptsKeys = Object.keys(yourPGMbrDoc.scripts.pub);
    }

    //Do (their scripts - my scripts) to find differences and to join ->

    let otherScriptKeys = [];

    this.props.selectedPayGroupMbrDocs.forEach((mbrDoc) => {
      if (mbrDoc.scripts !== "") {
        otherScriptKeys = [
          ...otherScriptKeys,
          ...Object.keys(mbrDoc.scripts.pub),
        ];
      }
    });

    // console.log("otherScriptKeys: ", otherScriptKeys);

    otherScriptKeys = [...new Set(otherScriptKeys)];

    console.log("otherScriptKeys: ", otherScriptKeys);

    // send to new component -> may be no.. Well actually probably yess bc i need to check also ->

    /****
const array1 = [1, 2, 3, 4];
const array2 = [2, 3, 5];

const difference1 = array1.filter(x => !array2.includes(x));
const difference2 = array2.filter(x => !array1.includes(x));

console.log(difference1); // Output: [1, 4]
console.log(difference2); // Output: [5]
***
     * 
     */
    //THEN CREATE A JOIN ACCOUNT COMPONENT AND MODAL ->

    // So can display accounts and un-joined accounts
    //

    let accounts = [];
    //let joinAccounts = [];

    let orderedScriptKeys = otherScriptKeys.filter(
      (x) => !yourScriptsKeys.includes(x)
    );

    // if (orderedScriptKeys.length > 1) {
    //   //order highest to lowest -> SAT
    //   orderedScriptKeys = otherScriptKeys.sort(function (a, b) {
    //     return b - a;
    //   });
    //}
    console.log("orderedScriptKeys: ", orderedScriptKeys);

    yourScriptsKeys = [...yourScriptsKeys, ...orderedScriptKeys];

    yourScriptsKeys = [...new Set(yourScriptsKeys)];

    accounts = yourScriptsKeys.map((scriptKey, index) => {
      //console.log(yourPGDoc);
      return (
        <Col key={index} lg={6}>
          <div style={{ marginBottom: "0.5rem" }}>
            <SlctdPGPmtsMultisig
              mnemonic={this.props.mnemonic}
              whichNetwork={this.props.whichNetwork}
              //key={index}
              mode={this.props.mode}
              index={index}
              scriptKey={scriptKey}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              uniqueName={this.props.uniqueName}
              //
              showAcceptMultiSigAcctModal={
                this.props.showAcceptMultiSigAcctModal
              }
              YourPGsMultiSigUTXOs={this.props.YourPGsMultiSigUTXOs}
              //
              selectedPayGroupDoc={this.props.selectedPayGroupDoc}
              selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
              selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
              selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}
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
            {!this.props.isLoadingPayGroups &&
            orderedScriptKeys.length === 0 ? (
              <>
                <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() =>
                      this.props.handleSelectedDapp(
                        "PayGroupPmtsCreateMultisig"
                      )
                    }
                  >
                    <b>Create Multisig</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
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

        {yourScriptsKeys.length === 0 ? (
          <>
            <p style={{ textAlign: "center" }}>
              MultiSig Accounts will appear here.
            </p>
          </>
        ) : (
          <>
            <Row className="justify-content-md-center">{accounts}</Row>
          </>
        )}
      </>
    );
  }
}

export default SlctdPGPmtsMultiSigs;
