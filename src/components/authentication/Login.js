import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import UsersManager from "../../managers/UsersManager";
import { Link } from "react-router-dom";

// shoutout to zac for crushing sessionstorage on our group project.
// i've learned a lot from him. I will clean this up later into how I would make it.
// using his boilerplate for now.

export default class Login extends Component {
    // Set initial state
    state = {
        username: "",
        password: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // function to clear all the fields on the page (not currently functional)
    clearFields = e => {
        this.refs.userField.value = "";
        this.refs.passField.value = "";
        this.refs.newUserField.value = "";
        this.refs.newPassField.value = "";
    };

    // clearFields using getElementById
    clearFields2 = e => {
        this.signIn.reset();
    };

    // zac's login function
    verifyUser = event => {
        event.preventDefault();
        let testResult;
        let currentUsersId;
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].username === this.state.username) {
                // now check password
                // console.log("am i working?")
                if (this.props.users[i].password === this.state.password) {
                    // log in: store user ID (from matching object) in session storage
                    console.log("logged in")
                    sessionStorage.setItem("userID", this.props.users[i].id);
                    sessionStorage.setItem("username", this.props.users[i].username);
                    currentUsersId = this.props.users[i].id
                    testResult = "You are logged in!";
                    break;
                } else {
                    testResult = "Your password does not match. Please try again.";
                    break;
                }
            } else {
                testResult = "No username found. Please register a new account.";
            }
        }
        // tell the user the result of the test
        // console.log(testResult);
        // console.log("current users id", currentUsersId)
        this.props.refreshData(currentUsersId)
        this.props.history.push("/home")
    };

    // zac's logout function
    logout = () => {
        console.log("logout clicked");
        // clear out session storage
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/home")
    };

    render() {
        return (
            // leaving in this basic form for now, but we can refactor with multiple semantic UI forms if we have enough time
            <React.Fragment>
                <Form onSubmit={this.verifyUser}>
                    <h1 className="">Please sign in</h1>
                    <label htmlFor="inputUsername">Username</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="text"
                        id="username"
                        placeholder="username"
                        required
                        autoFocus=""
                    />
                    <label htmlFor="inputPassword">Password</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="password"
                        required
                    />

                    <Button basic color="purple" type="submit">
                        Sign in
          </Button>
                </Form>
                <br></br>
                <Button as={Link} size="tiny" color="black" className="card-link" to={`/register/`}>Need To Register? Click here.</Button>
            </React.Fragment>
        );
    }
}