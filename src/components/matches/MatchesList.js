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
        console.log(this.props.myLikes)
        console.log(this.props.likedMes)
        let myLikes = this.props.myLikes.filter(like => {
            if(like.likedByUserId === currentUserIdParsed) {
                return true
            } else {
                return false
            }
        }).map(like => {
            console.log("myLikes", like)
            return like.likedUserId
        })
        // let likedMes = this.props.likedMes.filter(like => {
        //     if(like.likedUserId !== currentUserIdParsed) {
        //         return true
        //     } else {
        //         return false
        //     }
        //     }).map(like => {
        //         console.log("likedMes", like)
        //         return like.likedByUserId 
        //     })
        return (
            <React.Fragment>
                <section className="matchesContainer">
                    {
                        this.props.users.map(user => {
                            if (myMatchesUserNames.includes(user.username) && myLikes.includes(user.id)) {
                                return <MatchesCard key={user.id} user={user} myMatchesUserNames={myMatchesUserNames} unmatch={this.props.unmatch}{...this.props} />
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