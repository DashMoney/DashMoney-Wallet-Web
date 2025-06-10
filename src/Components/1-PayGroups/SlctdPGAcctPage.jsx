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
  // constructor(props) {  //MOVED TO APP STATE
  //   super(props);
  //   this.state = {
  //
  //   };
  // }

  calcMultiSigBalance = (theMultiSigAddr) => {
    // [{
    //   address: 'yjXnjGLBnjgsBgyu33si6PzDuGM7dVBCzr',
    //   txid: 'd098d8fbd5cdcb12f513b18cace9eb0aea8f71fefc82ff871e7651234a927551',
    //   outputIndex: 0,
    //   script: '76a914fea07ad90ddefdbbafecae744296834832b05b1688ac',
    //   satoshis: 5000000,
    //   height: 1257338
    // },...]
    let utxoArray = this.props.YourPGsMultiSigUTXOs.filter((utxo) => {
      return utxo.address === theMultiSigAddr;
    });
    console.log("utxoArray: ", utxoArray);
    let acctBalance = 0;

    utxoArray.forEach((utxo) => (acctBalance += utxo.satoshis));

    return acctBalance;
  };

  // componentDidMount() {
  //   this.props.pullInitialTriggerAcctPAYGROUPS(payGroupId);
  // }

  render() {
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
            <span className="textsmaller">
              Requires:{" "}
              {this.props.selectedPayGroupAcctIndex.toString().slice(0, 1)}{" "}
              Signers
            </span>
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

              {/* {!this.props.isLoadingPayGroupAcct ? ( */}
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
              {/* ) : (
                <></>
              )} */}

              <div
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  marginBottom: "0rem",
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
                      {handleDenomDisplay(
                        this.props.whichNetwork,
                        this.calcMultiSigBalance(
                          this.props.selectedPayGroupDoc.scripts.pub[
                            this.props.selectedPayGroupAcctIndex
                          ][0]
                        )
                      )}
                    </b>{" "}
                    {/* in <b>MultiSig</b> */}
                  </Badge>
                </h2>
              </div>

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

          {this.props.isLoadingPayGroupsAcct ? (
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

export default SlctdPGAcctPage;
