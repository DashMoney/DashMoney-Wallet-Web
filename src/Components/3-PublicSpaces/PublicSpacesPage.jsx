//
/* Query YourPublicSpaces Docs & most Recent
*  Just display list
*  click on to enter
*  query specificSpaces ->
*  

 */

import React from "react";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import CreditsOnPage from "../CreditsOnPage";

class PublicSpacesPage extends React.Component {
  // handleTimeToDate = (timeObject) => {
  //   let date = new Date(timeObject);
  //   //let longFormDate= setTime(date);
  //   return date.toLocaleDateString();
  // };

  componentDidMount() {
    this.props.pullInitialTriggerPUBLICSPACES();
  }

  render() {
    let YourSpaces = [];
    let ActiveSpaces = [];

    let YourSpacesButtons = <></>;
    let ActiveSpacesButtons = <></>;

    YourSpacesButtons = this.props.YourSpacesDocs.map((publicSpace, index) => {
      return (
        <Button
          key={index}
          variant="primary"
          onClick={() => this.props.showPublicSpacePage(publicSpace.label)}
        >
          <b>{publicSpace.label}</b>
          <Badge className="createwalletbtn" bg="light" text="dark" pill>
            {/* {this.handleTimeToDate(publicSpace.$createdAt)} */}
          </Badge>
        </Button>
      );
    });

    // let tupleArray = [];

    // tupleArray = othersInvites.map((invite) => {
    //   let tuple = "";

    //   for (let nameDoc of this.props.dgtInvitesNames) {
    //     if (nameDoc.$ownerId === invite.$ownerId) {
    //       tuple = [nameDoc.label, invite];
    //       break;
    //     }
    //   }
    //   if (tuple !== "") {
    //     return tuple;
    //   }

    //   return ["No Name Avail..", invite];
    // });

    // othersInvitesButtons = tupleArray.map((othersInvite, index) => {
    //   return (
    //     <Button
    //       key={index}
    //       variant="primary"
    //       onClick={() =>
    //         this.props.handleSelectedJoinGroup(othersInvite[1].group)
    //       }
    //     >
    //       <b>{othersInvite[1].group}</b>
    //       <Badge className="createwalletbtn" bg="light" text="dark" pill>
    //         {othersInvite[0]}
    //       </Badge>
    //     </Button>
    //   );
    // });

    // USE THE NAME OF THE SPACEdOC OWNER AS THE LAST FROM... ->

    ActiveSpacesButtons = this.props.ActiveSpacesDocs.map(
      (activeSpace, index) => {
        return (
          <Button
            key={index}
            variant="primary"
            onClick={() =>
              this.props.handleSelectedJoinGroup(activeSpace.label)
            }
          >
            <b>{activeSpace.label}</b>
            <Badge className="createwalletbtn" bg="light" text="dark" pill>
              {this.handleTimeToDate(activeSpace.$updatedAt)}
            </Badge>
          </Button>
        );
      }
    );

    return (
      <>
        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />
          {this.props.isLoadingPublicSpaces ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Space Search HERE*** and just goes to space/feed */}

          <div className="cardTitle">
            <h3>
              <b>Spaces Joined</b>
            </h3>

            {/* <Button
              style={{ marginRight: "1rem", marginBottom: ".5rem" }}
              variant="primary"
              onClick={() => this.props.showModal("CreateGroupModal")}
            >
              <b>Create</b>
            </Button> */}
          </div>

          {!this.props.isLoadingPublicSpaces && acceptedInvites.length === 0 ? (
            <>Public Spaces, you have joined or create will appear here!</>
          ) : (
            <></>
          )}

          {!this.props.isLoadingActiveGroups && !this.props.isLoadingGroups ? (
            <>
              <p></p>
              <h3>Active Spaces</h3>

              <div className="d-grid gap-2">{recentGroupsButtons}</div>
            </>
          ) : (
            <></>
          )}

          {!this.props.isLoadingActiveGroups &&
          this.props.dgtActiveGroups.length === 0 ? (
            <>Public Spaces with recent activity appear here!</>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default PublicSpacesPage;
