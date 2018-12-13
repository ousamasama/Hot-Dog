import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import MatchesList from "./matches/MatchesList";
import MatchesManager from "../managers/MatchesManager";
import LikesManager from "../managers/LikesManager";
import RandomDog from "../randomdog/RandomDog";
import DogsList from "./dogs/DogsList"
import DogsDetail from "./dogs/DogsDetail"
import DogsManager from "../managers/DogsManager";
import MessagesList from "./messages/MessagesList";
import MessagesForm from "./messages/MessagesForm";
import MessagesManager from "../managers/MessagesManager";
import UsersList from "./users/UsersList"
import UsersEdit from "./users/UsersEdit"
import UsersManager from "../managers/UsersManager";
import APIManager from "../managers/APIManager";

export default class ApplicationViews extends Component {
    state = {
        messages: [],
        matches: [],
        likes: [],
        dogs: [],
        users: [],
        likedMes: [],
        myLikes: [],
        // theirMessages: [],
        // myMessages: [],
        randomDog: [],
        initialized: false
    };

    componentDidMount() {
        let currentUserId = sessionStorage.getItem("userID");


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

        if (currentUserId !== undefined) {
            this.refreshData(currentUserId).then(() => {
                this.setState(
                    {
                        initialized: true
                    }
                )
                this.interval = setInterval(
                    () => {
                        this.refreshData(currentUserId);
                        console.log("i have refreshed...");
                    }, 5000)
            })
        }

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshData = (id) => {
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

        let messagesLoading = MessagesManager.getAll().then(messages => {
            this.setState({
                messages: messages
            });
        });

        let likesLoading = LikesManager.getAll().then(likes => {
            this.setState({
                likes: likes
            });
        });

        let myLikesLoading = LikesManager.myLikes(id).then(myLikes => {
            this.setState({
                myLikes: myLikes
            });
        });

        let likedMeLoading = LikesManager.likedMe(id).then(likedMes => {
            this.setState({
                likedMes: likedMes
            });
        });

        return Promise.all([usersLoading, dogsLoading, messagesLoading, likesLoading, matchesLoading, myLikesLoading, likedMeLoading])
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

    // messagesToMe = (theirId) => {
    //     return MessagesManager.messagesToMe(theirId)
    // };

    // messagesFromMe = (theirId) => {
    //     return MessagesManager.messagesFromMe(theirId);
    // };

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

    editUsers = (users, url) =>
        UsersManager.patchAndListUsers(users, url).then(() => UsersManager.getAll())
            .then(users =>
                this.setState({
                    users: users
                })
            );

    editDogs = (dogs, url) =>
        DogsManager.patchAndListDogs(dogs, url).then(() => DogsManager.getAll())
            .then(dogs =>
                this.setState({
                    dogs: dogs
                })
            );

    deleteUsers = (id) => {
        return UsersManager.deleteProfile(id).then(users =>
            this.setState({
                users: users
            })
        );
    };

    deleteDogs = (id) => {
        return DogsManager.deleteProfile(id).then(dogs =>
            this.setState({
                dogs: dogs
            })
        );
    };

    deleteMessages = (id) => {
        return MessagesManager.deleteMessage(id).then(messages =>
            this.setState({
                messages: messages
            })
        );
    };

    addMessage = messages =>
        MessagesManager.addAndList(messages)
            .then(() => MessagesManager.getAll()).then(messages =>
                this.setState({
                    messages: messages
                })
            );


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
                            // console.log("state", this.state)
                            return <MatchesList {...props}
                                matches={this.state.matches}
                                users={this.state.users}
                                likes={this.state.likes}
                                myLikes={this.state.myLikes}
                                likedMes={this.state.likedMes}
                                messages={this.props.messages}
                                deleteMessages={this.deleteMessages}
                                // getUnmatched={this.getUnmatched}
                                // getUnliked={this.getUnliked}
                                unmatch={this.unmatch}
                                unlike={this.unlike}
                                // messagesToMe={this.messagesToMe}
                                // messagesFromMe={this.messagesFromMe}
                                theirLikesForMe={this.theirLikesForMe}
                                myLikesForThem={this.myLikesForThem}
                                theirMatchesForMe={this.theirMatchesForMe}
                                myMatchesForThem={this.myMatchesForThem}
                            />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route exact path="/profile" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <UsersList {...props}
                                deleteUsers={this.deleteUsers}
                                deleteDogs={this.deleteDogs}
                                unmatch={this.unmatch}
                                unlike={this.unlike}
                                matches={this.state.matches}
                                deleteMessages={this.deleteMessages}
                                messages={this.state.messages}
                                likes={this.state.likes}
                                users={this.state.users}
                                dogs={this.state.dogs} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route path="/users/edit/:userId(\d+)"
                        render={props => {
                            if (this.isAuthenticated()) {
                                return <UsersEdit {...props}
                                    users={this.state.users}
                                    dogs={this.state.dogs}
                                    editDogs={this.editDogs}
                                    editUsers={this.editUsers} />
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
                    <Route exact path="/messages/:toUserId" render={props => {
                        if (this.isAuthenticated()) {
                            return <MessagesList {...props}
                                messages={this.state.messages}
                                users={this.state.users}
                                matches={this.state.matches}
                                likes={this.state.likes}
                                myMessages={this.state.myMessages}
                                theirMessages={this.state.theirMessages}
                                // deleteMessage={this.deleteMessage}
                                // friends={this.state.friends}
                                // messagesToMe={this.messagesToMe}
                                // messagesFromMe={this.messagesFromMe}
                                // refreshData={this.refreshData}
                                addFriend={this.addFriend} />;
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                    />
                    <Route exact path="/messages/new/:toUserId" render={props => {
                        if (this.isAuthenticated()) {
                            return <MessagesForm {...props}
                                // refreshData={this.refreshData}
                                addMessage={this.addMessage} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                    />
                    <Route exact path="/login" render={props => {
                        return <Login {...props}
                            refreshData={this.refreshData}
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