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
    let myDog = this.props.dogs.filter(dog => {
      if (dog.ownerId === currentUserIdParsed) {
        return true
      } else {
        return false
      }
    }).map(dog => {
      return dog
    })
    let myLikes = this.props.likes.filter(like => {
      if (like.likedByUserId === currentUserIdParsed) {
        return true
      } else {
        return false
      }
    }).map(like => {
      return like
    })
    let myMessages = this.props.messages.filter(message => {
      if(message.toUserId === currentUserIdParsed) {
        return true
      } else {
        return false
      }
    }).map(message => {
      return message
    })
    let theirMessages = this.props.messages.filter(message => {
      if(message.fromUserId === currentUserIdParsed) {
        return true
      } else {
        return false
      }
    }).map(message => {
      return message
    })
    // console.log("their messages", theirMessages)
    // console.log("my messages", myMessages)

    let theirLikes = this.props.likes.filter(like => {
      if (like.likedUserId === currentUserIdParsed) {
        return true
      } else {
        return false
      }
    }).map(like => {
      return like
    })
    let myMatches = this.props.matches.filter(match => {
      if (match.username === currentUser) {
        return true
      } else {
        return false
      }
    }).map(match => {
      return match
    })
    let theirMatches = this.props.matches.filter(match => {
      if (match.matchname === currentUser) {
        return true
      } else {
        return false
      }
    }).map(match => {
      return match
    })
    // console.log("my likes", myLikes)
    // console.log("their likes", theirLikes)
    // console.log("my matches", myMatches)
    // console.log("their matches", theirMatches)
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
              <Button as={Link} size="tiny" color="orange" className="card-link" to={`/users/edit/${this.props.user.id}`}>Edit Your Profile</Button>
              {/* <Button
              onClick={
                ()=> {
                  myLikes.forEach(like => {
                    console.log("each of my likes", like)
                  })
  
                  theirLikes.forEach(like => {
                    console.log("each of their likes", like)
                  })
  
                  myMatches.forEach(match => {
                    console.log("each of my matches", match)
                  })
  
                  theirMatches.forEach(match => {
                    console.log("each of their matches", match)
                  })
                }
              }
              >
                Test
              </Button> */}
              <Button
                size="tiny"
                color="red"
                onClick={
                  () => {
                    // debugger;
                    var results = [];
                    //put them all into array empty arrays then delete them
                    // let deleteTheseLikes = []
                    // let deleteTheseMatches = []
                    // let deleteTheseMessages = []
                   let unlikeMyLikes =  myLikes.forEach(like => {
                     results.push(this.props.unlike(like.id))
                      // this.props.unlike(like.id)
                      // deleteTheseLikes.push(like.id)
                      // results.push(like.id)
                    })
                    let unlikeTheirLikes = theirLikes.forEach(like => {
                      results.push(this.props.unlike(like.id))
                      // this.props.unlike(like.id)
                      // deleteTheseLikes.push(like.id)
                      // results.push(like.id)
                    })
                    let unmatchMyMatches = myMatches.forEach(match => {
                      results.push(this.props.unmatch(match.id))
                      // this.props.unmatch(match.id)
                      // deleteTheseMatches.push(match.id)
                      // results.push(match.id)
                    })
                    let unmatchTheirMatches = theirMatches.forEach(match => {
                      results.push(this.props.unmatch(match.id))
                      // this.props.unmatch(match.id)
                      // deleteTheseMatches.push(match.id)
                      // results.push(match.id)
                    })
                    let deleteTheirMessages = theirMessages.forEach(message => {
                      results.push(this.props.deleteMessages(message.id))
                      // this.props.deleteMessages(message.id)
                      // deleteTheseMessages.push(message.id)
                      // results.push(message.id)
                    })
                    let deleteMyMessages = myMessages.forEach(message => {
                      results.push(this.props.deleteMessages(message.id))
                      // this.props.deleteMessages(message.id)
                      // deleteTheseMessages.push(message.id)
                      results.push(message.id)
                    })
                    // console.log(deleteTheseLikes)
                    // console.log(deleteTheseMessages)
                    // console.log(deleteTheseMatches)
                    let deleteUser = this.props.deleteUsers(this.props.user.id)
                    results.push(deleteUser)
                    let deleteDog = this.props.deleteDogs(myDog[0].id)
                    results.push(deleteDog)
                    console.log(results)

                      Promise.all(results)
                      .then(() => sessionStorage.clear())
                      .then(() => {
                        window.location.replace("http://localhost:3000/home")
                      })
                      .then(() => this.props.history.push("/home"))
                    console.log("Your profile has been deleted and you have been logged out. Return you to our home page.")
                  }
                }
                className="card-link"
              >
                Delete Your Profile
              </Button>
            </h5>
          </Card>
        </Card.Group>
      </React.Fragment>
    );
  }
}