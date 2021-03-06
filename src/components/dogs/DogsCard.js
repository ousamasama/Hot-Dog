import React, { Component } from "react";
import { Button, Image, Header, Modal, Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./DogsCard.css"

export default class DogsCard extends Component {
    state = { open: false };

    close = () => this.setState({ open: false });
    show = dimmer => () => this.setState({ dimmer, open: true });

    render() {
        let currentUser = sessionStorage.getItem("username");
        let currentUserId = sessionStorage.getItem("userID");
        let currentUserIdParsed = Number(currentUserId)
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
            if (thisMatch.username === this.props.dog.username) {
                thisSpecificMatch = thisMatch.id;
            }
        });


        const { open, dimmer } = this.state;
        return (
            <Grid.Column>
                <Card.Group className="matchesCard">
                    <Card color='red' key={this.props.dog.id} className="card">
                        <h5 className="card-title">
                            <Card.Header>{this.props.dog.name}</Card.Header>
                            <Image
                                className="dog-pic"
                                // size="medium"
                                centered
                                circular
                                src={this.props.dog.picture} />
                            {/* <Card.Meta>City Maybe?</Card.Meta> */}
                            {/* <Card.Meta>Closest Dog Park?</Card.Meta> */}
                            <Button
                                size="tiny"
                                color="pink"
                                content="Match Me?"
                                icon="heart"
                                onClick={
                                    () => {
                                        this.props.match(this.props.dog.owner, currentUser, currentUserIdParsed, this.props.dog.ownerId)
                                        this.props.like(this.props.dog.ownerId, currentUserIdParsed)
                                        // .then(() => this.props.history.push("/matches"))
                                    }
                                }
                                className="card-link">
                            </Button>
                            {/* <Modal
                                dimmer={dimmer}
                                open={open}
                                onClose={this.close}
                                icon="info"
                                content="Details"
                                trigger={<Button size="tiny" color="purple" onClick={this.show(true)}>Details</Button>}>
                                <Modal.Header>Details</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size="small" src={this.props.dog.picture} />
                                    <Modal.Description>
                                        <Header>{this.props.dog.name}</Header>
                                        <p>Match me?</p>
                                    </Modal.Description>
                                </Modal.Content> */}
                            {/* <Modal.Actions>
                                    <Button onClick={this.close} color="yellow">Back</Button>
                                    <Button
                                        onClick={() => this.props.match(this.props.dog.owner, currentUser, currentUserId, this.props.dog.ownerId).then(() => this.props.history.push("/matches"))}
                                        // negative
                                        color="pink"
                                        icon="user delete"
                                        labelPosition="right"
                                        content="Match me?" />
                                </Modal.Actions> */}
                            {/* </Modal> */}
                        </h5>
                    </Card>
                </Card.Group>
            </Grid.Column>
        );
    }
}