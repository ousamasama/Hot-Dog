import React, { Component } from "react"
import { Button } from 'semantic-ui-react'
import "./Messages.css"
let currentUser = sessionStorage.getItem("username")
let currentUserId = sessionStorage.getItem("userID");
let currentUserIdParsed = Number(currentUserId)

export default class NewsForm extends Component {
    // Set initial state
    state = {
        message: "",
        username: "",
        fromUserId: "",
        toUserId: "",
        date: ""
    }


    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewMessage = evt => {
        evt.preventDefault()
        const messages = {
            message: this.state.message,
            username: currentUser,
            fromUserId: currentUserIdParsed,
            toUserId:  parseInt(this.props.match.params.toUserId),
            date: new Date()
        }
        // this.props.refreshData(currentUserIdParsed)
        this.props.addMessage(messages).then(() => this.props.history.push(`/messages/${parseInt(this.props.match.params.toUserId)}`))
    }

    render() {
        return (
            <React.Fragment>
                <form className="messagesForm">
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <br />
                        <input type="text" required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message"
                            placeholder="Input New Message..." />
                    </div>
                    <Button color="green" type="submit" onClick={this.constructNewMessage} className="btn btn-primary">Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}