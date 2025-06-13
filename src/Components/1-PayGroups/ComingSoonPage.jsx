import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
//import Alert from "react-bootstrap/Alert";
//import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";

import "../../App.css";

class ComingSoonPage extends React.Component {
  // componentDidMount() {
  //   this.props.pullInitialTriggerJoinPAYGROUPS();
  // }

  render() {
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
                <b className="lightMode">CrowdFund MultiSig</b>
              ) : (
                <b>CrowdFund MultiSig</b>
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

              <div
                //className="cardTitle"
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  textDecoration: "bold",
                }}
              >
                <h2>
                  <b>Coming Soon!</b>
                </h2>
              </div>

              <p>
                <b>CrowdFunding</b> will allow you to submit partial
                transactions from each member, and the final, complete
                transaction will only send to the multisig once each member has
                paid.
              </p>
              <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                <Button
                  variant="success"
                  size="lg"
                  disabled
                  // onClick={() =>
                  //   this.props.handleSelectedDapp(
                  //     "PayGroupPmtsCreateMultisig"
                  //   )
                  // }
                >
                  <b>CrowdFund MultiSig</b>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ComingSoonPage;
