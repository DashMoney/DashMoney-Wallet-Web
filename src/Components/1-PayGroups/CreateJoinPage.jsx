import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
//import Alert from "react-bootstrap/Alert";
import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";

import CreateJoinCards from "./CreateJoinCards";

import "../../App.css";

class CreateJoinPage extends React.Component {
  componentDidMount() {
    this.props.pullInitialTriggerJoinPAYGROUPS();
  }

  render() {
    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("Pay Groups")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create/Join Pay Group</b>
              ) : (
                <b>Create/Join Pay Group</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>
        <div className="bodytext">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {this.props.isLoadingWallet ? (
                <>
                  <div className="paddingBadge">
                    <b>Wallet Balance</b>

                    <h4>Loading..</h4>
                  </div>
                </>
              ) : (
                <>
                  <div className="paddingBadge">
                    <div className="cardCenterTitle">
                      <div>
                        <b>Wallet Balance</b>
                        <h4 style={{ color: "#008de4" }}>
                          <b>
                            {handleDenomDisplay(
                              this.props.whichNetwork,
                              this.props.accountBalance
                            )}
                          </b>
                        </h4>
                      </div>

                      {this.props.isPayGroupsRefreshReady ? (
                        <Button
                          variant="primary"
                          onClick={() => {
                            this.props.handleRefresh_JoinGroups();
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
                    </div>
                  </div>
                </>
              )}

              <div id="sidetextonlytop">
                <CreditsOnPage
                  identityInfo={this.props.identityInfo}
                  uniqueName={this.props.uniqueName}
                  showModal={this.props.showModal}
                />
              </div>

              {!this.props.isLoadingPayGroups ? (
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
              )}

              <div
                //className="cardTitle"
                style={{ textAlign: "center", marginTop: "2rem" }}
              >
                <h2>
                  <b>Join Pay Groups</b>
                </h2>
              </div>

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
              <CreateJoinCards
                mnemonic={this.props.mnemonic}
                isLoadingPayGroups={this.props.isLoadingPayGroups}
                //
                // DisplayPayGroupsOrder={this.props.DisplayPayGroupsOrder}
                // handlePayGroupsOrderFilter={
                //   this.props.handlePayGroupsOrderFilter
                // }
                //
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                //
                showConfirmJoinPayGroupModal={
                  this.props.showConfirmJoinPayGroupModal
                }
                //
                YourPayGroups={this.props.YourPayGroups}
                JoinPayGroups={this.props.JoinPayGroups}
                //JoinPayGroupsMbrs={this.props.JoinPayGroupsMbrs}
                JoinPayGroupsNames={this.props.JoinPayGroupsNames}
                JoinPayGroupsPubKeys={this.props.JoinPayGroupsPubKeys}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default CreateJoinPage;
