import React, { Component } from "react";
import { Button, Image, Header, Modal, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import "./UsersCard.css"
// import "./Friends.css";

export default class DogsCard extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });
  show = dimmer => () => this.setState({ dimmer, open: true });

  render() {
    return(
        <React.Fragment>
            <Card.Group>
                <Card>
                    <Image src={this.props.dog.picture} />
                </Card>
            </Card.Group>
        </React.Fragment>
    )
  }
}