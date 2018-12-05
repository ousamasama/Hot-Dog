import React, { Component } from "react"
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default class MatchesDetail extends Component {
    render() {
        // const user = this.props.users.find(a => a.id === parseInt(this.props.match.params.matchesId)) || {}
        // let currentUser = sessionStorage.getItem("username")
        // let currentUserId = sessionStorage.getItem("userID");
        // let myMatchesUserIds = this.props.matches.filter(match => {
        //     if (match.username === currentUser) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }).map(match => {
        //     return match
        // })
        // let thisSpecificMatch;
        // myMatchesUserIds.forEach(thisMatch => {
        //     if (thisMatch.friendname === user.username) {
        //         thisSpecificMatch = thisMatch.id
        //     }
        // })
        return (
            // <section className="matches details">
            //     <div key={user.id} className="card">
            //         <div className="card-body">
            //             <div className="card-title">
            //                 <h1>User: {user.username}</h1>
            //                 <Button as={Link} size="tiny" color="yellow" className="card-link" to={`/dogs/`}>Back</Button>
            //                 <Button size="tiny" color="red"
            //                     onClick={() => this.props.match(this.props.dog.owner, currentUser, currentUserId, this.props.dog.ownerId).then(() => this.props.history.push("/matches"))}
            //                     className="card-link">Match me?</Button>
            //             </div>

            //         </div>
            //     </div>
            // </section>
            <React.Fragment>
                cake
            </React.Fragment>
        )
    }
}