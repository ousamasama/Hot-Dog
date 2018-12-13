import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import LoggedInUsersMessages from "./LoggedInUsersMessages"
import MatchesMessages from "./MatchesMessages"
import { Button } from 'semantic-ui-react'
import "./Messages.css"

let currentUser = sessionStorage.getItem("username")
let currentUserId = sessionStorage.getItem("userID");
let currentUserIdParsed = Number(currentUserId)

export default class MessagesList extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        // let allMessages = this.props.messages.map(message => {
        //     console.log(message)
        // })
        const messagesFromMe = this.props.messages.filter(message => message.toUserId === parseInt(this.props.match.params.toUserId) && message.fromUserId === currentUserIdParsed)
        // console.log("messagesFromMe", messagesFromMe)
        const messagesToMe = this.props.messages.filter(message => message.toUserId === currentUserIdParsed && message.fromUserId === parseInt(this.props.match.params.toUserId))
        // console.log("messagesToMe", messagesToMe)
        const messages = messagesToMe.concat(messagesFromMe)
        // console.log("messages", messages)
        function compare(a,b) {
            if (a.date < b.date)
              return -1;
            if (a.date > b.date)
              return 1;
            return 0;
          }
        messages.sort(compare)
        console.log(messages)
        this.setState({
            messages: messages
        })
    }

    render() {
        // const toThisMatch = this.props.messages.find(message => message.toUserId === parseInt(this.props.match.params.toUserId))
        console.log("state", this.state.messages)
        let currentUser = sessionStorage.getItem("username");
        let currentUserId = sessionStorage.getItem("userID");
        let currentUserIdParsed = Number(currentUserId)
        let myMatchesUserNames = this.props.matches.filter(match => {
            if (match.username === currentUser) {
                return true
            } else {
                return false
            }
        }).map(match => {
            // let myMessages = this.props.messagesToMe(match.userId).then(() => {
            //     return console.log("messages to me", myMessages) 
            // })
            // let theirMessages = this.props.messagesFromMe(match.friendId).then(() => {
            //     return console.log("messages from me", theirMessages)
            // })
            // console.log("messages to me", myMessages)
            // console.log("messages from me", theirMessages)
            // console.log("match", match)
            return match.matchname
        })
        // let messagesToMe = this.props.theirMessages.filter(message => {
        //     if(message.toUserId === currentUserIdParsed) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }).map(message => {
        //     console.log("messages to me", message)
        //     return message
        // })
        // let messagesFromMe = this.props.myMessages.filter(message => {
        //     if(message.fromUserId === currentUserIdParsed) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }).map(message => {
        //     console.log("messages from me", message)
        //     return message
        // })
        // let myMatchesUserIds = this.props.matches.filter(match => {
        //     if (match.username === currentUser) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }).map(match => {
        //     console.log(`${match.matchname}`, match.friendId)
        //     return match.friendId
        // })
        return (
            <React.Fragment>
                <section className="messagesList">
                    {
                        this.state.messages.map(message => {
                            if (message.fromUserId === currentUserIdParsed) {
                                return <LoggedInUsersMessages key={message.id} message={message} myMatchesUserNames={myMatchesUserNames} deleteMessage={this.props.deleteMessage} {...this.props} />
                            } else {
                                return <MatchesMessages key={message.id} message={message} myMatchesUserNames={myMatchesUserNames} deleteMessage={this.props.deleteMessage} {...this.props} />
                            }
                        })
                    }
                </section>
                <Button as={Link} size="tiny" color="yellow" className="card-link" to={`/matches/`}>Back</Button>
                <section className="messagesButton">
                    <Button color="green" type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push(`/messages/new/${parseInt(this.props.match.params.toUserId)}`)
                        }}>New Message
                    </Button>
                </section>
            </React.Fragment>
        )
    }
}