import React from "react";
import LocalForage from "localforage";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import CreditsOnPage from "../CreditsOnPage";
import handleDenomDisplay from "../UnitDisplay";

import dapiClientNoWallet from "../DapiClientNoWallet";
import Dash from "dash";

class CreatePayGroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false,
      presentModal: "",

      sendToName: "",
      nameFormat: false,
      alreadyMember: false,

      //nameDocs
      mbrNameArray: [],

      //PayGroupPubKeys
      mbrPubKeyArray: [],

      identityIdMbr: "",
      payGroupMbrPubKeyDoc: [],

      formEventTarget: "",
      isLoadingVerify: false,
    };
  }

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  onChange = (event) => {
    // console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    this.setState({
      isLoadingVerify: false,
      identityIdReceipient: "",
      alreadyMember: false,
      // dgmDocumentsForReceipient: [],
    });

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "validationCustomName") {
      this.nameValidate(event.target.value);
    }
  };

  nameValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        sendToName: nameInput,
        nameFormat: true,
      });
    } else {
      this.setState({
        sendToName: nameInput,
        nameFormat: false,
      });
    }
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777

  searchName = (nameToRetrieve) => {
    const client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            identityIdReceipient: "No Name",
            isLoadingVerify: false,
          });
        } else {
          let searchedNameDoc = d.toJSON();
          console.log("NameDoc retrieved:\n", searchedNameDoc);

          let isMemberUnique = false;

          isMemberUnique = this.state.mbrNameArray.every((nameDoc) => {
            return nameDoc.$ownerId !== searchedNameDoc.$ownerId;
          });

          if (
            this.props.identity !== searchedNameDoc.$ownerId &&
            isMemberUnique
          ) {
            this.queryPayGroupMbrPubKey(searchedNameDoc);
          } else {
            this.setState({
              identityIdReceipient: searchedNameDoc.$ownerId,
              isLoadingVerify: false,
              alreadyMember: true,
            });
          }
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  queryPayGroupMbrPubKey = (theNameDoc) => {
    const client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));

    const getDocuments = async () => {
      // console.log("Called query Pay Group Pub Key");

      return client.platform.documents.get("PayGroupsContract.ECDHxDoc", {
        where: [["$ownerId", "==", theNameDoc.$ownerId]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          this.setState({
            payGroupMbrPubKeyDoc: "No Pay Group PubKey",
            isLoadingVerify: false,
          });
        } else {
          this.setState({
            mbrNameArray: [...this.state.mbrNameArray, theNameDoc],
            mbrPubKeyArray: [...this.state.mbrPubKeyArray, d[0].toJSON()],
            identityIdMbr: theNameDoc.$ownerId,
            //payGroupMbrPubKeyDoc: d[0].toJSON(),
            isLoadingVerify: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // submitAndResetForm = () => {
  //   this.props.addFieldOfImg(this.state.stringURLInput);
  //   document.getElementById("formImgReset").reset();
  //   this.setState({
  //     stringURLInput: "",
  //     validStringURL: false,
  //   });
  // };

  removeMember = () => {
    let removedNameFieldArray = new Array(...this.state.mbrNameArray);
    removedNameFieldArray.pop();
    let removedPubKeyFieldArray = new Array(...this.state.mbrPubKeyArray);
    removedPubKeyFieldArray.pop();
    this.setState({
      mbrNameArray: removedNameFieldArray,
      mbrPubKeyArray: removedPubKeyFieldArray,
    });
  };

  handleVerifyClick = (event) => {
    event.preventDefault();

    this.setState({
      payGroupMbrPubKeyDoc: [],
      identityIdReceipient: "Verifying Name..",
      isLoadingVerify: true,
      formEventTarget: event.target,
    });
    //

    if (this.state.nameFormat) {
      this.searchName(this.state.sendToName);
    } else {
    }
  };

  // componentDidMount() {
  //   this.props.pullInitialTrigger();
  // }

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  render() {
    let isRequestToSelf =
      this.props.identity === this.state.identityIdReceipient;

    //Are members unique?! =>

    let listofMembers = this.state.mbrNameArray.map((nameDoc, index) => {
      return (
        <li key={index}>
          <h5>
            <b>{nameDoc.label}</b>
          </h5>
        </li>
      );
    });

    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("CreateJoinPage")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create Pay Group</b>
              ) : (
                <b>Create Pay Group</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>

        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          <Form
            id="Add-Member-form"
            noValidate
            onSubmit={this.handleVerifyClick}
            onChange={this.onChange}
          >
            <Form.Group className="mb-3" controlId="validationCustomName">
              <Form.Label>
                <b>Add Member</b>
              </Form.Label>

              {/* <Form.Label>Send Dash to:</Form.Label> */}

              {this.state.isLoadingVerify || this.props.isLoadingForm_WALLET ? (
                <Form.Control
                  type="text"
                  placeholder={this.state.sendToName}
                  readOnly
                />
              ) : (
                <Form.Control
                  type="text"
                  //placeholder={formPlaceholder}
                  placeholder="Enter name here..."
                  defaultValue={this.state.sendToName}
                  required
                  isValid={this.state.nameFormat || this.state.addrFormat}
                />
              )}
            </Form.Group>

            {this.state.isLoadingVerify ? (
              <>
                <p> </p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
                <p> </p>
              </>
            ) : (
              <></>
            )}

            {this.state.mbrNameArray.length <= 3 &&
            this.state.nameFormat &&
            !this.state.isLoadingVerify &&
            !isRequestToSelf ? (
              <div className="ButtonRightNoUnderline">
                <p> </p>
                <Button variant="primary" type="submit">
                  <b>Search Name</b>
                </Button>
              </div>
            ) : (
              <>
                <div className="ButtonRightNoUnderline">
                  <p></p>
                  <Button disabled variant="primary">
                    <b>Search Name</b>
                  </Button>
                </div>
              </>
            )}

            {/* {(this.state.mbrNameArray.length > 4 &&
              !this.state.nameFormat &&
              !this.state.isLoadingVerify) ||
            isRequestToSelf ? (
              <div className="ButtonRightNoUnderline">
                <p></p>
                <Button disabled variant="primary">
                  <b>Search Name</b>
                </Button>
              </div>
            ) : (
              <></>
            )} */}
          </Form>
          {/* **** ^^^^ FORMS AND INFO ^^^^ **** */}

          {this.state.mbrNameArray.length === 4 ? (
            <>
              <p className="textsmaller">(Limit of 5 members for testnet)</p>
            </>
          ) : (
            <></>
          )}
          {/* MY SERIES OF ALERTS FOR ERRORS AND NO NAME AND NOT DGM DOC */}

          {isRequestToSelf ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Add Self - Alert</Alert.Heading>
                <p>You are already a member, no need to add yourself.</p>
              </Alert>
            </>
          ) : (
            <></>
          )}

          {this.state.alreadyMember ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Duplicate Member - Alert</Alert.Heading>
                <p>This person is already a member of the Pay Group.</p>
              </Alert>
            </>
          ) : (
            <></>
          )}

          {this.state.identityIdReceipient === "No Name" ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Name Alert</Alert.Heading>
                <p>The name {this.state.sendToName} is not owned by anyone.</p>
              </Alert>
            </>
          ) : (
            <></>
          )}

          {this.state.payGroupMbrPubKeyDoc === "No Pay Group PubKey" ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Pay Group Alert</Alert.Heading>
                <p>
                  <b>{this.state.sendToName}</b> has not yet enabled{" "}
                  <b>Pay Groups</b> in their DashMoney-Wallet.
                </p>
              </Alert>
              <p></p>
            </>
          ) : (
            <></>
          )}
          <p></p>
          {this.state.mbrNameArray.length === 0 ? (
            <>
              {" "}
              <p
                //className="smallertext"
                //style={{ color: "red", marginTop: ".2rem" }}
                style={{ textAlign: "center" }}
              >
                <b>
                  Members added will appear here. (You do not need to add
                  yourself.)
                </b>
              </p>
            </>
          ) : (
            <>
              {" "}
              <div className="indentStuff">
                <h4>
                  <b>Pay Group Members</b>
                </h4>
                <ul>
                  <li>
                    <h5>
                      <b>{this.props.uniqueName}</b>
                    </h5>
                  </li>
                  {listofMembers}
                </ul>
              </div>
            </>
          )}
          {this.state.mbrNameArray.length > 0 ? (
            <>
              <Button
                onClick={() => this.removeMember()}
                style={{
                  //marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <></>
          )}
          {this.state.mbrNameArray.length !== 0 &&
          !this.state.isLoadingVerify ? (
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  this.props.showConfirmCreatePayGroupModal(
                    this.state.mbrNameArray,
                    this.state.mbrPubKeyArray
                  )
                }
              >
                <b>Create Pay Group</b>
              </Button>
            </div>
          ) : (
            <></>
          )}

          {this.state.mbrNameArray.length !== 0 &&
          this.state.isLoadingVerify ? (
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button variant="primary" disabled size="lg">
                <b>Create Pay Group</b>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default CreatePayGroupPage;
