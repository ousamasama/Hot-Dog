import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
// import "./UsersCard.css"

export default class RandomDog extends Component {
    render() {
        console.log(this.props.randomDog)
        return (
            <React.Fragment>
                <section className="randomDogContainer">
                    <img src={this.props.randomDog.message}></img>
                </section>
            </React.Fragment>
        )
    }
}