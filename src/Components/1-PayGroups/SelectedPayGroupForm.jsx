import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import Alert from "react-bootstrap/Alert";

import "../../App.css";

class SelectedPayGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: "",
      validComment: true,
      tooLongCommentError: false,
    };
  }
  onChange = (event) => {
    //console.log(event.target.id);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formComment") {
      event.preventDefault();
      event.stopPropagation();
      this.commentValidate(event.target.value);
    }
  };

  commentValidate = (comment) => {
    let regex1 = /^.[\S\s]{0,450}$/;

    let valid1 = regex1.test(comment);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(comment);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        commentInput: comment,
        validComment: true,
        tooLongCommentError: false,
      });
    } else {
      if (comment.length > 450 || !valid2) {
        this.setState({
          commentInput: comment,
          validComment: false,
          tooLongCommentError: true,
        });
      } else {
        this.setState({
          commentInput: comment,
          validComment: false,
        });
      }
    }
  };

  handleSubmitClick = () => {
    this.props.showAddMessageToChatDocModal(this.state.commentInput);
    console.log("Submitted Msg");
  };

  render() {
    return (
      <>
        {/* Form */}
        {/* <div className="bodytext"> */}
        <div className="bootstrapMenu">
          <Form.Group
            className="mb-1"
            controlId="formComment"
            style={{ width: "40%" }}
          >
            <Form.Control
              onChange={this.onChange}
              //onSubmit={this.handleSubmitClick}
              as="textarea"
              rows={2}
              placeholder="Enter message here..."
              required
              isInvalid={this.state.tooLongCommentError}
              isValid={this.state.validDescription}
            />

            {this.state.tooLongCommentError ? (
              <Form.Control.Feedback className="floatLeft" type="invalid">
                Sorry, this is too long! Please use less than 450 characters.
              </Form.Control.Feedback>
            ) : (
              <></>
            )}
            <p></p>
            <div className="ButtonRightNoUnderline">
              {this.state.commentInput !== "" &&
              !this.state.tooLongCommentError ? (
                <Button
                  variant="primary"
                  onClick={() => this.handleSubmitClick()}
                >
                  <b>Send Message</b>
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  <b>Send Message</b>
                </Button>
              )}
            </div>
          </Form.Group>
        </div>

        {/* {this.state.isLoadingVerify ||
                    this.props.isLoadingForm_WALLET ? (
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
                      //defaultValue={this.state.sendToName}
                      required
                      //isValid=this.state.nameFormat
                    />
                     )} */}
      </>
    );
  }
}

export default SelectedPayGroupForm;
