import React, { Component } from 'react'
import UsersCard from "./UsersCard"
import { Button, Grid } from 'semantic-ui-react'

export default class UsersList extends Component {
    render() {
        let currentUser = sessionStorage.getItem("username")
        let currentUserId = sessionStorage.getItem("userID");
        let currentUserIdParsed = Number(currentUserId)
        let myUserName = this.props.users.filter(user => {
            if (user.username === currentUser) {
              return true
            } else {
              return false
            }
          }).map(user => {
            return user
          })
        let myDog = this.props.dogs.filter(dog => {
            if(dog.ownerId === currentUserIdParsed) {
                return true
            } else {
                return false
            }
        }).map(dog => {
            console.log(dog)
            return dog
        })
        return (
            <React.Fragment className="usersContainer">
                    {
                        myUserName.map(user => {
                            if (currentUser) {
                                return <UsersCard
                                    key={user.id}
                                    myDog={myDog}
                                    user={user}
                                    {...this.props} />
                            } else {
                                return null
                            }
                        })
                    }
            </React.Fragment>
        )
    }
    return
}