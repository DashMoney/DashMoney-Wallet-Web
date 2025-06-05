import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
//import Alert from "react-bootstrap/Alert";
import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";

import PayGroupsCards from "./PayGroupsCards";

import "../../App.css";

class PayGroupsPage extends React.Component {
  componentDidMount() {
    this.props.pullInitialTriggerPAYGROUPS();
  }

  render() {
    return (
      <>
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

              <div
                //className="cardTitle"
                style={{ textAlign: "center" }}
              >
                <h2>
                  <b>Your Pay Groups</b>
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

              {this.props.YourPayGroupsPubKeyDoc === "No Pub Key" &&
              !this.props.isLoadingPayGroups ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() =>
                        this.props.showModal("RegisterPayGroupModal")
                      }
                    >
                      <b>Enable "Pay Groups"</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {this.props.YourPayGroupsPubKeyDoc !== "No Pub Key" &&
              this.props.YourPayGroupsPubKeyDoc !== "Querying" &&
              !this.props.isLoadingPayGroups ? (
                <>
                  <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() =>
                        this.props.handleSelectedDapp("CreateJoinPage")
                      }
                    >
                      <b>Create/Join</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>

          {this.props.YourPayGroupsPubKeyDoc === "No Pub Key" ||
          this.props.isLoadingPayGroups ? (
            <></>
          ) : (
            <>
              <PayGroupsCards
                mnemonic={this.props.mnemonic}
                isLoadingPayGroups={this.props.isLoadingPayGroups}
                //
                DisplayPayGroupsOrder={this.props.DisplayPayGroupsOrder}
                handlePayGroupsOrderFilter={
                  this.props.handlePayGroupsOrderFilter
                }
                //
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                YourPayGroups={this.props.YourPayGroups}
                YourPayGroupsMbrs={this.props.YourPayGroupsMbrs}
                YourPayGroupsNames={this.props.YourPayGroupsNames}
                YourPayGroupsPubKeys={this.props.YourPayGroupsPubKeys}
                //
                decideFinalizeOrGoToPage={this.props.decideFinalizeOrGoToPage}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default PayGroupsPage;
