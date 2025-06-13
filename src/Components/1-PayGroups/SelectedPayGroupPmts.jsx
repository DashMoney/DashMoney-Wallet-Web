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

import SlctdPGPmtsMultiSigs from "./SlctdPGPmtsMultiSigs";

import "../../App.css";

class SelectedPayGroupPmts extends React.Component {
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
              onClick={() => this.props.handleSelectedDapp("PayGroup")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Pay Group's MultiSigs</b>
              ) : (
                <b>Pay Group's MultiSigs</b>
              )}
            </h3>
            {this.props.isPayGroupsRefreshReady ? (
              <Button
                variant="primary"
                onClick={() => {
                  this.props.handleRefresh_PayGroups();
                }}
                style={{
                  fontSize: "larger",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <b>Refresh</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled
                style={{
                  fontSize: "larger",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <b>Refresh</b>
              </Button>
            )}
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
              )} */}

              {/* <div
                //className="cardTitle"
                style={{ textAlign: "center", marginTop: "2rem" }}
              >
                <h2>
                  <b>Coming Soon!</b>
                </h2>
              </div> */}

              {this.props.isLoadingPayGroups ? (
                <>
                  <p></p>
                  <div id="spinner">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                  <p></p>
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>

          {this.props.isLoadingPayGroups ? (
            <></>
          ) : (
            <>
              <SlctdPGPmtsMultiSigs
                mnemonic={this.props.mnemonic}
                isLoadingPayGroups={this.props.isLoadingPayGroups}
                //
                // DisplayPayGroupsOrder={this.props.DisplayPayGroupsOrder}
                // handlePayGroupsOrderFilter={
                //   this.props.handlePayGroupsOrderFilter
                // }
                handleSelectedDapp={this.props.handleSelectedDapp}
                handleGoToPayGroupAcct={this.props.handleGoToPayGroupAcct}
                //
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                //
                YourPGsMultiSigUTXOs={this.props.YourPGsMultiSigUTXOs}
                //
                showAcceptMultiSigAcctModal={
                  this.props.showAcceptMultiSigAcctModal
                }
                //
                selectedPayGroupDoc={this.props.selectedPayGroupDoc}
                selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
                selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
                selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}
                //selectedPayGroupChatDocs={this.props.selectedPayGroupChatDocs}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default SelectedPayGroupPmts;
