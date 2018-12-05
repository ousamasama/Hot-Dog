import React, { Component } from "react";
import { Button, Image, Header, Modal, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import "./UsersCard.css"
// import "./Friends.css";

export default class MatchesCard extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = dimmer => () => this.setState({ dimmer, open: true });

  render() {
    let currentUser = sessionStorage.getItem("username");
    let myMatchesUserIds = this.props.matches
      .filter(match => {
        if (match.username === currentUser) {
          return true;
        } else {
          return false;
        }
      })
      .map(match => {
        return match;
      });
    let thisSpecificMatch;
    myMatchesUserIds.forEach(thisMatch => {
      if (thisMatch.matchname === this.props.user.username) {
        console.log(thisMatch)
        thisSpecificMatch = thisMatch.id;
      }
    });


    const { open, dimmer } = this.state;
    return (
      <React.Fragment>
        <Card.Group className="friendsCard">
          <Card color='green' key={this.props.user.id} className="card">
            <h5 className="card-title">
              <Image
                floated="right"
                size="mini"
                src={this.props.user.dog}
              />

              <Card.Header>{this.props.user.username}</Card.Header>
              <Card.Meta>You matched!</Card.Meta>
              <Button
                size="tiny"
                color="red"
                onClick={() =>
                  this.props.unmatch(thisSpecificMatch, currentUser)
                }
                className="card-link"
              >
                Unmatch
              </Button>
              <Modal
                dimmer={dimmer}
                open={open}
                onClose={this.close}
                trigger={
                  <Button size="tiny" color="purple" onClick={this.show(true)}>
                    Details
                  </Button>
                }
              >
                <Modal.Header>Details</Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size="small"
                    src={this.props.user.dog}
                  />
                  <Modal.Description>
                    <Header>{this.props.user.username}</Header>
                    <p>This person is your friend!</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.close} positive>
                    Back
                  </Button>
                  <Button
                    onClick={() =>
                      this.props.unmatch(thisSpecificMatch, currentUser)
                    }
                    negative
                    icon="user delete"
                    labelPosition="right"
                    content="Unmatch"
                  />
                </Modal.Actions>
              </Modal>
            </h5>
          </Card>
        </Card.Group>
      </React.Fragment>
    );
  }
}