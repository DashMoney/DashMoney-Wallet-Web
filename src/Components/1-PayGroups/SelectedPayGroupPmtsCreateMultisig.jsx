//This will be a page

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
//import Alert from "react-bootstrap/Alert";
import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";

//import CreateJoinCards from "./CreateJoinCards";

import "../../App.css";

class SelectedPayGroupPmtsCreateMultisig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      validName: false,
      tooLongNameError: false,

      //'min'
      minInput: 1,
      validMin: true,
      tooLongMinError: false,

      //'active'
      active: true,
    };
  }
  componentDidMount() {
    let mbrReqMax;

    let mbrNum = parseInt(this.props.selectedPayGroupDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...this.props.selectedPayGroupDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(this.props.selectedPayGroupDoc[`mbr${i}`]);
      }
    }

    mbrReqMax = ownerArrayOfMbrIds.length + 1;

    this.setState({
      minInput: mbrReqMax,
      mbrMax: mbrReqMax,
    });
    //this.props.pullInitialTriggerJoinPAYGROUPS();
  }

  // Change to Public / Private ->
  handleActive = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  };

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);
    if (event.target.id === "formName") {
      event.preventDefault();
      event.stopPropagation();
      this.nameValidate(event.target.value);
    }

    if (event.target.id === "formMinDays") {
      event.preventDefault();
      event.stopPropagation();
      this.minValidate(event.target.value);
    }

    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }
  };

  //nameValidate
  nameValidate = (name) => {
    let regex = /^\S.{0,31}$/;
    let valid = regex.test(name);

    if (valid) {
      this.setState({
        nameInput: name,
        tooLongNameError: false,
        validName: true,
      });
    } else {
      if (name.length > 32) {
        this.setState({
          nameInput: name,
          tooLongNameError: true,
          validName: false,
        });
      } else {
        this.setState({
          nameInput: name,
          validName: false,
        });
      }
    }
  };

  minValidate = (numOfMbrs) => {
    let regex = /(^[0-9]{1}$)/;
    // minInput: "",
    // validmin: false,

    let valid = regex.test(numOfMbrs);

    if (valid && numOfMbrs <= this.state.mbrMax && numOfMbrs > 0) {
      this.setState({
        minInput: numOfMbrs,
        validMin: true,
        tooLongMinError: false,
      });
    } else if (numOfMbrs.length >= 2) {
      this.setState({
        minInput: numOfMbrs,
        validMin: false,
        tooLongMinError: true,
      });
    } else {
      this.setState({
        minInput: numOfMbrs,
        validMin: false,
        tooLongMinError: false,
      });
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newMultiSig;

    newMultiSig = {
      label: this.state.nameInput,
      min: Number(this.state.minInput),
      // active: this.state.active,
    };

    console.log(newMultiSig);

    this.props.showConfirmCreateMultiSigAcctModal(
      this.state.nameInput,
      Number(this.state.minInput)
    );
  };

  render() {
    // let dayMinimum = true;
    // if (
    //   Number(this.state.minInput) >= Number(this.state.maxInput) &&
    //   this.state.validMin &&
    //   this.state.validMax
    // ) {
    //   dayMinimum = false;
    // } else {
    //   dayMinimum = true;
    // }

    //BASED ON THE MBRS IN YOUR MBR DOC -> MAXIMUM ->
    //moved to onCompLoad and saved to state.

    // let mbrReqMax;

    // let mbrNum = parseInt(this.props.selectedPayGroupDoc.$type.slice(4, 5));

    // let ownerArrayOfMbrIds = [];

    // if (mbrNum === 1) {
    //   ownerArrayOfMbrIds = [...this.props.selectedPayGroupDoc.mbrsList];
    // } else {
    //   for (let i = 2; i <= mbrNum; i++) {
    //     ownerArrayOfMbrIds.push(this.props.selectedPayGroupDoc[`mbr${i}`]);
    //   }
    // }

    // mbrReqMax = ownerArrayOfMbrIds.length + 1;

    //console.log("mbrReqMax: ", mbrReqMax);

    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("PayGroupPmts")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create Multisig</b>
              ) : (
                <b>Create Multisig</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>
        <div className="bodytext">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              <div id="sidetextonlytop">
                <CreditsOnPage
                  identityInfo={this.props.identityInfo}
                  uniqueName={this.props.uniqueName}
                  showModal={this.props.showModal}
                />
              </div>

              {/* {!this.props.isLoadingPayGroups ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() =>
                        this.props.handleSelectedDapp("Create Pay Group")
                      }
                    >
                      <b>Create Pay Group</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )} */}

              {/* <div
                //className="cardTitle"
                style={{ textAlign: "center", marginTop: "2rem" }}
              >
                <h2>
                  <b>Coming Soon!</b>
                </h2>
              </div> */}

              <Form
                noValidate
                onSubmit={this.handleSubmitClick}
                onChange={this.onChange}
              >
                {/* Name FORM BELOW */}
                <Form.Group className="mb-3" controlId="formName">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    <b>MultiSig Account Label</b>
                  </h5>
                  <Form.Control
                    type="text"
                    placeholder="Enter label..."
                    required
                    isInvalid={this.state.tooLongNameError}
                    isValid={this.state.validName}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Label is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="cardTitle">
                  {/*  MIN FORM BELOW */}

                  <Form.Group className="mb-3" controlId="formMinDays">
                    <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      <b>Number of Members Needed (for MultiSig)</b>
                    </h5>

                    <Form.Control
                      type="number"
                      step="1"
                      precision="0"
                      min={1}
                      max={this.state.mbrMax}
                      //placeholder="1"
                      defaultValue={this.state.mbrMax}
                      required
                      isValid={
                        this.state.validMin &&
                        this.state.minInput <= this.state.mbrMax &&
                        this.state.minInput > 0
                      }
                      isInvalid={
                        this.state.tooLongMinError ||
                        this.state.minInput > this.state.mbrMax ||
                        this.state.minInput < 1
                      }
                    />
                    <p></p>
                    <Form.Control.Feedback type="invalid">
                      Minimum required error.
                    </Form.Control.Feedback>
                    <p className="smallertext">
                      (i.e. Minimum members required to sign transaction for
                      processing)
                    </p>
                  </Form.Group>
                </div>

                {/* <Form.Group className="mb-3" id="formGridCheckbox">
               
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={this.state.publicOrPrivate ? <b>Public</b> : <b>Private</b>}
                />

                <p>
                  <b>Active</b> means people can schedule days to rent.
                </p>
              </Form.Group> */}

                <div className="ButtonRightNoUnderline">
                  <>
                    {this.state.validName && this.state.validMin ? (
                      <Button variant="primary" type="submit">
                        <b>Create Multisig</b>
                      </Button>
                    ) : (
                      <Button variant="primary" disabled>
                        <b>Create Multisig</b>
                      </Button>
                    )}
                  </>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SelectedPayGroupPmtsCreateMultisig;
