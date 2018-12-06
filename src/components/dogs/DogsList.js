import React, { Component } from 'react'
import { Button, Image } from 'semantic-ui-react'
import DogsCard from "./DogsCard"
import LikedDogsCard from "./LikedDogsCard"
import "./DogsCard.css"

export default class DogsList extends Component {
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
                        this.props.dogs.map(dog => {
                            if (!myMatchesUserNames.includes(dog.owner) && dog.owner !== currentUser) {
                                return <DogsCard matches={this.props.matches} match={this.props.match} key={dog.id} dog={dog} />
                            } else if(myMatchesUserNames.includes(dog.owner)) {
                                return <LikedDogsCard matches={this.props.matches} match={this.props.match} key={dog.id} dog={dog} />
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