import React, { Component } from "react";
import { Button, Message, Image, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Messages.css"

export default class LoggedInUsersMessages extends Component {
  
  
    render() {
    return (
      <Card.Group className="userMessageContainer">
        <Card fluid key={this.props.message.id} className="loggedInUsersMessageCards">
          <h5 className="card-title">
            <Card.Header>You said: {this.props.message.message}</Card.Header>
            <br />
            {/* <Image
                  wrapped
                  size="small"
                  src={}
                /> */}
            {/* <Button
              as={Link}
              size="tiny"
              color="purple"
              className="nav-link"
              to={`/messages/${this.props.message.id}`}
            >
              Details
            </Button>
            <Button
              as={Link}
              size="tiny"
              color="orange"
              className="card-link"
              to={`/messages/edit/${this.props.message.id}`}
            >
              Edit
            </Button>
            <Button
              size="tiny"
              color="red"
              onClick={() => this.props.deleteMessage(this.props.message.id)}
              className="card-link"
            >
              Delete
            </Button> */}
          </h5>
        </Card>
      </Card.Group>
    );
  }
}