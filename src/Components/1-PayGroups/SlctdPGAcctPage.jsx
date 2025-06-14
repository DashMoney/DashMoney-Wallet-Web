import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import Badge from "react-bootstrap/Badge";
//import Alert from "react-bootstrap/Alert";

import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";
import SlctdPGAcctPmts from "./SlctdPGAcctPmts";

import "../../App.css";

class SlctdPGAcctPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //
  //   };
  // }

  // componentDidMount() {
  //   this.props.pullInitialTriggerAcctPAYGROUPS(payGroupId);
  // }

  render() {
    // [{ //EXAMPLE
    //   address: 'yjXnjGLBnjgsBgyu33si6PzDuGM7dVBCzr',
    //   txid: 'd098d8fbd5cdcb12f513b18cace9eb0aea8f71fefc82ff871e7651234a927551',
    //   outputIndex: 0,
    //   script: '76a914fea07ad90ddefdbbafecae744296834832b05b1688ac',
    //   satoshis: 5000000,
    //   height: 1257338
    // },...]

    let scriptsAddr =
      this.props.selectedPayGroupDoc.scripts.pub[
        this.props.selectedPayGroupAcctIndex
      ][0];

    let utxoArray = this.props.YourPGsMultiSigUTXOs.filter((utxo) => {
      return utxo.address === scriptsAddr;
    });
    console.log("utxoArray: ", utxoArray);

    let acctBalance = 0;

    utxoArray.forEach((utxo) => (acctBalance += utxo.satoshis));

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
                <b className="lightMode">
                  {
                    this.props.selectedPayGroupDoc.scripts.pub[
                      this.props.selectedPayGroupAcctIndex
                    ][1]
                  }
                </b>
              ) : (
                <b>
                  {
                    this.props.selectedPayGroupDoc.scripts.pub[
                      this.props.selectedPayGroupAcctIndex
                    ][1]
                  }
                </b>
              )}
            </h3>
            {this.props.isPayGroupAcctsRefreshReady ? (
              <Button
                variant="primary"
                onClick={() => {
                  this.props.handleRefresh_PayGroupAccts();
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
            {/* <span className="textsmaller">
              Requires:{" "}
              {this.props.selectedPayGroupAcctIndex.toString().slice(0, 1)}{" "}
              Signers
            </span> */}
            {/* <div style={{ marginRight: "4rem" }}></div> */}
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
                      :{" "}
                      {handleDenomDisplay(this.props.whichNetwork, acctBalance)}
                    </b>{" "}
                    {/* in <b>MultiSig</b> */}
                  </Badge>
                </h2>
              </div>

              {!this.props.isLoadingPayGroupAcct && acctBalance > 0 ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() =>
                        this.props.handleSelectedDapp("PayGroupAcctCreatePmt")
                      }
                    >
                      <b>Start Payment</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {!this.props.isLoadingPayGroupAcct && acctBalance === 0 ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button variant="success" size="lg" disabled>
                      <b>*Requires Balance to Start Payment*</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {!this.props.isLoadingPayGroupAcct ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() =>
                        this.props.handleSelectedDapp("ComingSoonPage")
                      }
                    >
                      <b>Start CrowdFund</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {this.props.isLoadingPayGroupAcct ? (
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

          {this.props.isLoadingPayGroupAcct ? (
            <></>
          ) : (
            <>
              <SlctdPGAcctPmts
                mnemonic={this.props.mnemonic}
                isLoadingPayGroups={this.props.isLoadingPayGroups}
                //
                // DisplayPayGroupsOrder={this.props.DisplayPayGroupsOrder}
                // handlePayGroupsOrderFilter={
                //   this.props.handlePayGroupsOrderFilter
                // }
                handleSelectedDapp={this.props.handleSelectedDapp}
                //
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                //
                YourPGsMultiSigUTXOs={this.props.YourPGsMultiSigUTXOs}
                //
                showConfirmAcceptPmtModal={this.props.showConfirmAcceptPmtModal}
                selectedPayGroupAcctIndex={this.props.selectedPayGroupAcctIndex}
                showConfirmBroadcastPmtModal={
                  this.props.showConfirmBroadcastPmtModal
                }
                //
                selectedPayGroupDoc={this.props.selectedPayGroupDoc}
                selectedPayGroupNameDocs={this.props.selectedPayGroupNameDocs}
                selectedPayGroupMbrDocs={this.props.selectedPayGroupMbrDocs}
                selectedPayGroupECDHDocs={this.props.selectedPayGroupECDHDocs}
                //selectedPayGroupChatDocs={this.props.selectedPayGroupChatDocs}
                selectedPayGroupPayInitDocs={
                  this.props.selectedPayGroupPayInitDocs
                }
                selectedPayGroupPayDocs={this.props.selectedPayGroupPayDocs}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default SlctdPGAcctPage;
