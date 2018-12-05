import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import UsersManager from "../managers/UsersManager";
import MatchesList from "./matches/MatchesList";
import MatchesManager from "../managers/MatchesManager";

export default class ApplicationViews extends Component {
    state = {
        messages: [],
        matches: [],
        users: [],
        initialized: false
    };

    componentDidMount() {
        let usersLoading = UsersManager.getAll().then(users => {
            this.setState({
                users: users
            });
        });

        let matchesLoading = MatchesManager.getAll().then(matches => {
            this.setState({
                matches: matches
            });
        });


        Promise.all([usersLoading, matchesLoading]).then(() => {
            this.setState(
                {
                    initialized: true
                }
            )
        })
    }

    isAuthenticated = () => sessionStorage.getItem("username") !== null

    unmatch = id => {
        return MatchesManager.removeAndList(id).then(matches =>
            this.setState({
                matches: matches
            })
        );
    };


    render() {
        if (this.state.initialized) {
            return (
                <React.Fragment>
                    <Route exact path="/matches" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <MatchesList {...props}
                                matches={this.state.matches}
                                users={this.state.users}
                                unmatch={this.unmatch} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
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