import React, { Component } from "react";
import { Button, Image, Header, Modal, Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import "./UsersCard.css"
// import "./Friends.css";

export default class UsersCard extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = dimmer => () => this.setState({ dimmer, open: true });

  render() {
    let currentUser = sessionStorage.getItem("username");
    let currentUserId = sessionStorage.getItem("userID");
    let currentUserIdParsed = Number(currentUserId)
    const { open, dimmer } = this.state;
    return (
      <React.Fragment>
        <Card.Group className="usersCard">
          <Card color='green' key={this.props.user.id} className="card">
            <h5 className="card-title">
              <Image
                floated="right"
                size="mini"
                src={this.props.user.dog}
              />
                <Card.Meta>{this.props.user.username}</Card.Meta>
                <Card.Meta>{this.props.user.dogName}</Card.Meta>
              <Card.Header>Your Profile</Card.Header>
             
              <Modal
                dimmer={dimmer}
                open={open}
                onClose={this.close}
                trigger={
                    <Button as={Link} size="tiny" color="orange" className="card-link" to={`/users/edit/${this.props.user.id}`}>Edit</Button>
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
                    <Button size="tiny" color="purple" onClick={this.show(true)}>
                    Edit
                  </Button>
                  </Modal.Description>
                </Modal.Content>
        
              </Modal>
            </h5>
          </Card>
        </Card.Group>
      </React.Fragment>
    );
  }
}