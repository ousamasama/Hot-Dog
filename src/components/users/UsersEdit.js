import React, { Component } from 'react'
import { Button, Card, Image, Modal } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class UsersEdit extends Component {

    state = {
        username: "",
        password: "",
        dogName: "",
        dog: "",
        avatar: "",
        id: ""
    };

    // need to clarify this
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    componentDidMount() {
        // store the existing values in state to start
        let newState = {}
        // Error here
        let user = this.props.users.find(user => user.id === parseInt(this.props.match.params.userId))
        console.log(user)
        newState.username = user.username
        newState.password = user.password
        newState.dogName = user.dogName
        newState.dog = user.dog
        newState.avatar = user.dog
        newState.id = user.id

        this.setState(newState)
    }

    // this.props.addUser(toSave).then(newUser => {
    //     let newDog = {
    //         name: this.state.dogName,
    //         owner: this.state.username,
    //         ownerId: newUser.id,
    //         picture: this.state.dog
    //     }
    //     return newDog
    // }).then(newDog => this.props.addDog(newDog))

    editThisUser = e => {
        // prepare objects for editing database
        e.preventDefault()
        let currentUser = sessionStorage.getItem("username");
        let currentUserId = sessionStorage.getItem("userID");
        let currentUserIdParsed = Number(currentUserId)

        const user = {
            username: this.state.username,
            password: this.state.password,
            dogName: this.state.dogName,
            dog: this.state.dog,
            avatar: this.state.dog,
            id: this.state.id
        }
        // let myDog = this.props.dogs.filter(dog => {
        //     if (dog.ownerId === currentUserIdParsed) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }).map(dog => {
        //     console.log("dog", dog)
        //     return dog
        // })
        // console.log("mydog", myDog)
        let userUrl = "http://localhost:5002/users/"
        let dogsUrl = "http://localhost:5002/dogs/"
        let myDog = this.props.dogs.filter(dog => {
            if (dog.ownerId === currentUserIdParsed) {
                return true
            } else {
                return false
            }
        }).map(dog => {
            console.log("dog", dog)
            return dog
        })
        console.log("mydog", myDog[0])
        return this.props.editUsers(user, `${userUrl}${this.state.id}`).then(user => {
            let editedDog = {
                name: this.state.dogName,
                owner: this.state.username,
                ownerId: this.state.id,
                picture: this.state.dog,
                id: myDog[0].id
            }
            console.log("edited dog", editedDog)
            return editedDog
        }).then(editedDog => this.props.editDogs(editedDog, `${dogsUrl}${myDog[0].id}`))
            .then(() => this.props.history.push("/profile"))
    }
    render() {
        return (
            <div className="container">
                <form className="editEventForm">
                    <div className="form-group">
                        <label htmlFor="eventName">Change Username</label>
                        <input type="text" required className="form-control" onChange={this.handleFieldChange} id="username" value={this.state.username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventDate">Change Password</label>
                        <input type="text" required className="form-control" onChange={this.handleFieldChange} id="password" value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventTime">Change Dog Name</label>
                        <input type="text" required className="form-control" onChange={this.handleFieldChange} id="dogName" value={this.state.dogName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventLocation">Change Dog Picture</label>
                        <input type="url" required className="form-control" onChange={this.handleFieldChange} id="dog" value={this.state.dog} />
                    </div>

                    <Button type="submit" size="tiny" color="green" className="btn btn-primary" onClick={this.editThisUser}>Edit Your Profile</Button>
                    <Button as={Link} size="tiny" color="yellow" className="card-link" to={`/profile/`}>Back</Button>
                </form>
            </div>
        );
    }
}
export default UsersEdit 