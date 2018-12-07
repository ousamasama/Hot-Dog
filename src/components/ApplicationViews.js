import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import UsersManager from "../managers/UsersManager";
import MatchesList from "./matches/MatchesList";
import MatchesManager from "../managers/MatchesManager";
import LikesManager from "../managers/LikesManager";
import RandomDog from "../randomdog/RandomDog";
import DogsList from "./dogs/DogsList"
import DogsDetail from "./dogs/DogsDetail"
import DogsManager from "../managers/DogsManager";
import APIManager from "../managers/APIManager";

export default class ApplicationViews extends Component {
    state = {
        messages: [],
        matches: [],
        // likes: [], 
        dogs: [],
        users: [],
        likedMes: [],
        myLikes: [],
        randomDog: [],
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

        let dogsLoading = DogsManager.getAll().then(dogs => {
            this.setState({
                dogs: dogs
            });
        });

        // let likesLoading = LikesManager.getAll().then(likes => {
        //     this.setState({
        //         likes: likes
        //     });
        // });

        let myLikesLoading = LikesManager.myLikes().then(myLikes => {
            this.setState({
                myLikes: myLikes
            });
        });

        let likedMeLoading = LikesManager.likedMe().then(likedMes => {
            this.setState({
                likedMes: likedMes
            });
        });

        // let oneRandomDogLoading = APIManager.oneRandomDog().then(randomDog => {
        //     this.setState({
        //         randomDog: randomDog
        //     })
        // })

        // let manyRandomDogsLoading = APIManager.manyRandomDogs().then(randomDog => {
        //     this.setState({
        //         randomDog: randomDog
        //     })
        // })


        Promise.all([usersLoading, dogsLoading, matchesLoading, myLikesLoading, likedMeLoading]).then(() => {
            this.setState(
                {
                    initialized: true
                }
            )
        })
    }

    isAuthenticated = () => sessionStorage.getItem("username") !== null

    theirLikesForMe = (theirId) => {
        return LikesManager.usersLikes(theirId)
    };

    myLikesForThem = (myId) => {
        return LikesManager.likesUser(myId);
    };

    theirMatchesForMe = (theirId) => {
        return MatchesManager.usersMatches(theirId)
    };

    myMatchesForThem = (myId) => {
        return MatchesManager.matchedUser(myId);
    };

    unmatch = (id) => {
        return MatchesManager.unmatch(id).then(matches =>
            this.setState({
                matches: matches
            })
        );
    };

    unlike = (id) => {
        return LikesManager.unlike(id).then(likes =>
            this.setState({
                likes: likes
            })
        );
    };


    match = (myNewMatch, myUsername, myId, theirId) =>
        MatchesManager.addAndList(myNewMatch, myUsername, myId, theirId).then(() => MatchesManager.all())
            .then(matches =>
                this.setState({
                    matches: matches
                })
            )

    like = (yourId, theirId) =>
        LikesManager.addAndList(yourId, theirId).then(() => LikesManager.all())
            .then(likes =>
                this.setState({
                    likes: likes
                })
            )



    render() {
        if (this.state.initialized) {
            return (
                <React.Fragment>
                    <Route exact path="/randomdog" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <RandomDog {...props}
                                randomDog={this.state.randomDog}
                            />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route exact path="/matches" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <MatchesList {...props}
                                matches={this.state.matches}
                                users={this.state.users}
                                // likes={this.state.likes}
                                myLikes={this.state.myLikes}
                                likedMes={this.state.likedMes}
                                // getUnmatched={this.getUnmatched}
                                // getUnliked={this.getUnliked}
                                unmatch={this.unmatch}
                                unlike={this.unlike}
                                theirLikesForMe={this.theirLikesForMe}
                                myLikesForThem={this.myLikesForThem}
                                theirMatchesForMe={this.theirMatchesForMe}
                                myMatchesForThem={this.myMatchesForThem}
                            />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route exact path="/dogs" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <DogsList {...props}
                                matches={this.state.matches}
                                match={this.match}
                                like={this.like}
                                // likes={this.state.likes}
                                users={this.state.users}
                                dogs={this.state.dogs} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route exact path="/dogs/:dogsId(\d+)" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <DogsDetail {...props}
                                matches={this.state.matches}
                                // likes={this.state.likes}
                                match={this.match}
                                like={this.like}
                                users={this.state.users}
                                dogs={this.state.dogs} />
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