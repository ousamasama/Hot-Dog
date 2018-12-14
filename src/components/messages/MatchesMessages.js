import React, { Component } from "react";
import { Button, Image, Card, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Messages.css";

export default class MatchesMessages extends Component {
  render() {
    // console.log("look at me", this.props.message)
    return (
      // <Card.Group className="othersMessageContainer">
        <Message fluid key={this.props.message.id} className="matchesMessages">
          <h5 className="message-title">
            <Message.Header>{this.props.message.username} said: {this.props.message.message}</Message.Header>
            <br />
            {/* <Button
              as={Link}
              size="tiny"
              color="purple"
              className="nav-link"
              to={`/messages/${this.props.message.id}`}
            >
              Details
            </Button> */}
            {/* View Friend Link Here */}
          </h5>
        </Message>
      // </Card.Group>
    );
  }
}