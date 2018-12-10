import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import UsersManager from "../../managers/UsersManager";
import DogsManager from "../../managers/DogsManager";
import { Link } from "react-router-dom";

// shoutout to zac for crushing sessionstorage on our group project.
// i've learned a lot from him. I will clean this up later into how I would make it.
// using his boilerplate for now.
export default class Login extends Component {
    // Set initial state
    state = {
        username: "",
        password: "",
        dogName: "",
        avatar: "",
        dog: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // function to clear all the fields on the page
    clearFields = e => {
        this.refs.userField.value = "";
        this.refs.passField.value = "";
        this.refs.newUserField.value = "";
        this.refs.newPassField.value = "";
    };

    // zac's logout function
    logout = () => {
        console.log("logout clicked");
        // clear out session storage
        sessionStorage.clear();
    };

    // zac's registration function
    registerUser = event => {
        event.preventDefault();
        // check database to see if user exists
        let verified = true;
        let message = "";
        for (let i = 0; i < this.props.users.length; i++) {
            // this checks if user already exists
            if (this.props.users[i].username.indexOf(this.state.username) !== -1) {
                message = "Username already exists, please try logging in.";
                verified = false;
                break;
            } else {
                verified = true;
            }
        }
        // if user was not in database, allow registration
        if (verified) {
            message = "New user saved. Please log in.";

            // create an object to be saved to database
            let toSave = {
                username: this.state.username,
                password: this.state.password,
                dogName: this.state.dogName,
                dog: this.state.dog,
                avatar: this.state.dog
            };


            // post them to the database (object is stringified in UserManager)
            UsersManager.addUser(toSave).then(newUser => {
                let newDog = {
                    name: this.state.dogName,
                    owner: this.state.username,
                    ownerId: newUser.id,
                    picture: this.state.dog
                }
                return newDog
            }).then(newDog => DogsManager.addDog(newDog))
        }

        console.log(message);
        this.props.history.push("/home")
    };

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.registerUser}>
                    <h1 className="h3 mb-3 font-weight-normal list">
                        New user registration
          </h1>
                    <label htmlFor="newUsername">Username</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="text"
                        id="username"
                        placeholder="desired username"
                        required=""
                        autoFocus=""
                    />
                    <label htmlFor="newPassword">Password</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="desired password"
                        required=""
                    />
                    <label htmlFor="newDogName">Dog Name</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="text"
                        id="dogName"
                        placeholder="your dog name"
                        required=""
                    />
                    <label htmlFor="newDogPic">Dog Pic URL</label>
                    <Form.Input
                        onChange={this.handleFieldChange}
                        type="url"
                        id="dog"
                        placeholder="url of dog pic"
                        required=""
                    />
                    <Button basic color="green" type="submit">
                        Register
          </Button>
                </form>
                <br />
                <Button onClick={this.logout} basic color="red" type="">
                    Log out
        </Button>
                <Button as={Link} size="tiny" color="black" className="card-link" to={`/login/`}>Already Have an Account? Click here.</Button>

            </React.Fragment>
        );
    }
}