import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import UsersManager from "../managers/UsersManager";

export default class ApplicationViews extends Component {
    state = {
        messages: [],
        matches: [],
        users: [],
        initialized: false
    };

    componentDidMount() {
        let usersLoading = UsersManager.getAll().then(allUsers => {
            this.setState({
                users: allUsers
            });
        });

        // isAuthenticated = () => sessionStorage.getItem("username") !== null

        Promise.all([usersLoading]).then(() => {
            this.setState(
                {
                    initialized: true
                }
            )
        })
    }


    render() {
        if (this.state.initialized) {
            return (
                <React.Fragment>
                    <Route exact path="/login" render={props => {
                        return <Login {...props}
                            users={this.state.users} />;
                    }}
                    />
                    <Route exact path="/register" render={props => {
                        return <Register {...props}
                            users={this.state.users} />;
                    }}
                    />

                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    Making Your Hot Dog...
                </React.Fragment>
            )
        }
    }

}