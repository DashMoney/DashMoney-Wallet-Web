//Create the differenct cards for different payments with their associated data

import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

//import SlctdPGPmtsMultisig from "./SlctdPGPmtsMultiSig";

class SlctdPGAcctPmts extends React.Component {
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

    // accounts = yourScriptsKeys.map((scriptKey, index) => {
    //   //console.log(yourPGDoc);
    //   return (
    //     <Col key={index} lg={6}>
    //       <div style={{ marginBottom: "0.5rem" }}>
    //         <SlctdPGPmtsMultisig
    //           mnemonic={this.props.mnemonic}
    //           whichNetwork={this.props.whichNetwork}
    //           //key={index}
    //           mode={this.props.mode}
    //           index={index}
    //           scriptKey={scriptKey}
    //           today={today}
    //           yesterday={yesterday}
    //           identity={this.props.identity} //For if my review so can edit
    //           uniqueName={this.props.uniqueName}
    //           //
    //           showAcceptMultiSigAcctModal={
    //             this.props.showAcceptMultiSigAcctModal
    //           }
    //           YourPGsMultiSigUTXOs={this.props.YourPGsMultiSigUTXOs}
    //           handleGoToPayGroupAcct={this.props.handleGoToPayGroupAcct}
    //           //
    //           selectedPayGroupDoc={this.props.selectedPayGroupDoc}
    //           selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
    //           selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
    //           selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}
    //         />
    //       </div>
    //     </Col>
    //   );
    // });

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
        <p style={{ textAlign: "center" }}>
          MultiSig Payments will appear here.
        </p>
        {/* 
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
        )} */}
      </>
    );
  }
}

export default SlctdPGAcctPmts;
