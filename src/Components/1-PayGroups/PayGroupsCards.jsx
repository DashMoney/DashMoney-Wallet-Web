import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PayGroupsCard from "./PayGroupsCard";

class PayGroupsCards extends React.Component {
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
    // let cardBkg;
    // let cardText;

    // if (this.props.mode === "primary") {
    //   cardBkg = "white";
    //   cardText = "dark";
    // } else {
    //   cardBkg = "dark";
    //   cardText = "white";
    // }

    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let payGroup = [];

    payGroup = this.props.YourPayGroups.map((yourPGDoc, index) => {
      //console.log(yourPGDoc);
      return (
        <Col key={index} lg={6}>
          <div style={{ marginBottom: "0.5rem" }}>
            <PayGroupsCard
              mnemonic={this.props.mnemonic}
              whichNetwork={this.props.whichNetwork}
              //key={index}
              mode={this.props.mode}
              index={index}
              yourPGDoc={yourPGDoc}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              uniqueName={this.props.uniqueName}
              //

              isLoadingPayGroups={this.props.isLoadingPayGroups}
              YourPayGroups={this.props.YourPayGroups}
              YourPayGroupsMbrs={this.props.YourPayGroupsMbrs}
              YourPayGroupsNames={this.props.YourPayGroupsNames}
              YourPayGroupsPubKeys={this.props.YourPayGroupsPubKeys}
              //
              decideFinalizeOrGoToPage={this.props.decideFinalizeOrGoToPage}
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

        {this.props.YourPayGroups.length === 0 ? (
          <>
            <p style={{ textAlign: "center" }}>
              Pay Groups, you have created or joined, will appear here.
            </p>
          </>
        ) : (
          <>
            <Row className="justify-content-md-center">{payGroup}</Row>
          </>
        )}
      </>
    );
  }
}

export default PayGroupsCards;
