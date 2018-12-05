import React, { Component } from 'react'
import MatchesCard from "./MatchesCard"
// import UsersCard from "./UsersCard"
import { Button } from 'semantic-ui-react'
// import "./UsersCard.css"

export default class MatchesList extends Component {
    render() {
        let currentUser = sessionStorage.getItem("username")
        let myMatchesUserNames = this.props.matches.filter(match => {
            if (match.username === currentUser) {
                return true
            } else {
                return false
            }
        }).map(match => {
            return match.matchname
        })
        return (
            <React.Fragment>
                <section className="matchesContainer">
                    {
                        this.props.users.map(user => {
                            if (myMatchesUserNames.includes(user.username)) {
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