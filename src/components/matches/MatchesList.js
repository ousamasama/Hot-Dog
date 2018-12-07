import React, { Component } from 'react'
import MatchesCard from "./MatchesCard"
// import UsersCard from "./UsersCard"
import { Button } from 'semantic-ui-react'
// import "./UsersCard.css"

export default class MatchesList extends Component {
    render() {
        let currentUser = sessionStorage.getItem("username")
        let currentUserId = sessionStorage.getItem("userID");
        let currentUserIdParsed = Number(currentUserId)
        let myMatchesUserNames = this.props.matches.filter(match => {
            if (match.username === currentUser) {
                return true
            } else {
                return false
            }
        }).map(match => {
            return match.matchname
        })
        let myLikes = this.props.myLikes.filter(like => {
            if(like.likedByUserId === currentUserIdParsed) {
                return true
            } else {
                return false
            }
        }).map(like => {
            return like.likedUserId
        })
        return (
            <React.Fragment>
                <section className="matchesContainer">
                    {
                        this.props.users.map(user => {
                            if (myMatchesUserNames.includes(user.username) && myLikes.includes(user.id)) {
                                return <MatchesCard 
                                key={user.id} 
                                user={user} 
                                myLikes={this.props.myLikes} 
                                likedMes={this.props.likedMes} 
                                matches={this.props.matches} 
                                myMatchesUserNames={myMatchesUserNames} 
                                unmatch={this.props.unmatch} 
                                unlike={this.props.unlike}
                                // getUnmatched={this.props.getUnmatched}
                                // getUnliked={this.props.getUnliked}
                                theirLikesForMe={this.props.theirLikesForMe}
                                myLikesForThem={this.props.myLikesForThem}
                                theirMatchesForMe={this.props.theirMatchesForMe}
                                myMatchesForThem={this.props.myMatchesForThem}
                                {...this.props} />
                            // } else if (user.username !== currentUser) {
                            //     return <UsersCard key={user.id} user={user} myMatchesUserNames={myMatchesUserNames} addFriend={this.props.addFriend} {...this.props} />
                            } else {
                                return null
                            }
                        })
                    }
                </section>
            </React.Fragment>
        )
    }
    return
}