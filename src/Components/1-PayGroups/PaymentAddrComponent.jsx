import React from "react";
import Button from "react-bootstrap/Button";

class PaymentAddrComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddress: false,
      copiedAddress: false,
    };
  }

  handleDisplayAddress = () => {
    if (this.state.displayAddress === false)
      this.setState({
        displayAddress: true,
      });
    else {
      this.setState({
        displayAddress: false,
      });
    }
  };

  render() {
    let buttonColor;

    if (this.props.mode === "primary") {
      buttonColor = "outline-dark";
    } else {
      buttonColor = "outline-light";
    }

    return (
      <>
        <div className="positionButton">
          <Button
            variant={buttonColor}
            onClick={() => {
              this.handleDisplayAddress();
            }}
          >
            <h6>View MultiSig Address</h6>
          </Button>
        </div>

        {this.state.displayAddress ? (
          <>
            <p></p>
            <div className="indentStuff">
              {/* <span> View MultiSig Address: </span> */}
              {this.props.accountAddress}
              <span>
                <Button
                  variant="primary"
                  className="copyButton"
                  onClick={() => {
                    navigator.clipboard.writeText(this.props.accountAddress);
                    this.setState({
                      copiedMnemonic: true,
                    });
                  }}
                >
                  Copy
                </Button>
                {this.state.copiedMnemonic ? <span> Copied!</span> : <></>}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default PaymentAddrComponent;
