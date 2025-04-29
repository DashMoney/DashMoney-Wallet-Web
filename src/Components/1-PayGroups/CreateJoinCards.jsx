import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CreateJoinCard from "./CreateJoinCard";

class CreateJoinCards extends React.Component {
  // constructor(props) {  //MOVED TO APP STATE
  //   super(props);
  //   this.state = {
  //
  //   };
  // }

  // onChange = (event) => {
  //   //Payment Schedule
  //   if (event.target.id === "formFilter") {
  //     event.stopPropagation();
  //     //this.props.handlePayGroupsOrderFilter(event.target.value);
  //   }
  // };

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

    let listOfPGids = this.props.YourPayGroups.map(
      (yourPG) => yourPG.payGroupId
    );

    console.log("listOfPGids: ", listOfPGids);

    let filteredJoinPayGroups = this.props.JoinPayGroups.map((pg) => {
      let pgFound = listOfPGids.find((pgId) => pgId === pg.payGroupId);
      if (pgFound === undefined) {
        return pg;
      }
    });

    filteredJoinPayGroups = filteredJoinPayGroups.filter(
      (doc) => doc !== undefined
    );

    console.log("filteredJoinPayGroups: ", filteredJoinPayGroups);

    //this.props.YourPayGroups
    // how to filter a list of docs by a list of payGroupIds

    payGroup = filteredJoinPayGroups.map((joinPGDoc, index) => {
      //console.log(joinPGDoc);
      return (
        <Col key={index} lg={4}>
          <div style={{ marginBottom: "0.5rem" }}>
            <CreateJoinCard
              mnemonic={this.props.mnemonic}
              whichNetwork={this.props.whichNetwork}
              //key={index}
              mode={this.props.mode}
              index={index}
              joinPGDoc={joinPGDoc}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              uniqueName={this.props.uniqueName}
              //
              showConfirmJoinPayGroupModal={
                this.props.showConfirmJoinPayGroupModal
              }
              //
              isLoadingPayGroups={this.props.isLoadingPayGroups}
              JoinPayGroups={this.props.JoinPayGroups}
              //JoinPayGroupsMbrs={this.props.JoinPayGroupsMbrs}
              JoinPayGroupsNames={this.props.JoinPayGroupsNames}
              JoinPayGroupsPubKeys={this.props.JoinPayGroupsPubKeys}
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
          <Col md={9} lg={8} xl={7} xxl={6}></Col>
        </Row>

        {this.props.JoinPayGroups.length === 0 ? (
          <>
            <p style={{ textAlign: "center" }}>
              When others add you as a member of a Pay Group, the invite will
              appear here.
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

export default CreateJoinCards;
