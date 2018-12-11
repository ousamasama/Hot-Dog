import React, { Component } from "react";
import { Button, Image, Header, Modal, Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import "./UsersCard.css"
// import "./Friends.css";

export default class MatchesCard extends Component {
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
      if (thisMatch.matchname === this.props.user.username) {
        thisSpecificMatch = thisMatch.id;
      }
    })
    //list of logged in user's matches
    // let unmatchId = this.props.matches.map(match => {
    //   if (match.username === currentUser) {
    //     console.log("logged in user's matches", match, match.id)
    //     return match.id
    //   }
    // })
    //use a find next time
    //list of matched to logged in user
    // let getUnmatchedId = this.props.matches.map(match => {
    //   if (match.matchname === currentUser) {
    //     console.log("matched to logged in user's details", match, match.id)
    //     return match.id
    //   }
    // })
    //list of logged in user's likes
    // let unlikeId = this.props.myLikes.map(like => {
    //   if (like.likedByUserId === currentUserIdParsed) {
    //     console.log("logged in user's like details", like, like.id)
    //     return like.id
    //   }
    // })
    //list of likes for logged in user
    // let getUnlikedId = this.props.likedMes.map(like => {
    //   if (like.likedUserId === currentUserIdParsed)
    //     console.log("likes for logged in user ", like, like.id)
    //   return like.id
    // })
    const { open, dimmer } = this.state;
    return (
      <Grid.Column>
        <Card.Group className="friendsCard">
          <Card color='green' key={this.props.user.id} className="card">
            <h5 className="card-title">
              <Image
                floated="right"
                size="mini"
                src={this.props.user.dog}
              />

              <Card.Header>{this.props.user.dogName}, {this.props.user.username}'s Dog</Card.Header>
              <Card.Meta>You matched!</Card.Meta>
              <Button
                size="tiny"
                color="red"
                onClick={() => {
                  let theirLikesForMe = this.props.theirLikesForMe(this.props.user.id)
                  let myLikesForThem = this.props.myLikesForThem(this.props.user.id)
                  let theirMatchesForMe = this.props.theirMatchesForMe(this.props.user.id)
                  let myMatchesForThem = this.props.myMatchesForThem(this.props.user.id)
                  Promise.all([theirLikesForMe, myLikesForThem, theirMatchesForMe, myMatchesForThem])
                    .then(([theirLikesForMe, myLikesForThem, theirMatchesForMe, myMatchesForThem]) => {
                      this.props.unlike(myLikesForThem[0].id)
                      this.props.unmatch(theirMatchesForMe[0].id)
                      this.props.unlike(theirLikesForMe[0].id)
                      this.props.unmatch(myMatchesForThem[0].id)
                      console.log("You unmatched...")
                    })
                }
                }
                // this.props.theirLikesForMe(this.props.user.id).then(theirLikesForMe => {
                //   // return myLikesForThem
                //     this.props.myLikesForThem(this.props.user.id).then(myLikesForThem => {
                //     this.props.theirMatchesForMe(this.props.user.id).then(theirMatchesForMe => {
                //       this.props.myMatchesForThem(this.props.user.id).then(myMatchesForThem => {
                //         // this.props.unlike(myLikesForThem[0].id)
                //         // this.props.unmatch(theirMatchesForMe[0].id)
                //         // this.props.unlike(theirLikesForMe[0].id)
                //         // this.props.unmatch(myMatchesForThem[0].id)
                //         Promise.all(
                //           [
                //             this.props.unlike(myLikesForThem[0].id),
                //             this.props.unmatch(theirMatchesForMe[0].id),
                //             this.props.unlike(theirLikesForMe[0].id),
                //             this.props.unmatch(myMatchesForThem[0].id)
                //           ]
                //         )
                //         // .then()
                //         // return myLikesForThem
                //       });
                //       // return myLikesForThem
                //     });
                //   });
                // });

                // this.props.unmatch(unmatchId)
                // this.props.unlike(unlikeId)
                // this.props.getUnliked(getUnlikedId)
                // this.props.getUnmatched(getUnmatchedId)
                // }
                // }
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
      </Grid.Column>
    );
  }
}