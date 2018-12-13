import React, { Component } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleHeader extends Component {
  state = { 
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    sessionStorage.clear();
  };

  render() {
    const { activeItem } = this.state;

    let username = sessionStorage.getItem("username");
    // let currentUserId = sessionStorage.getItem("userID");
    // let currentUserIdParsed = Number(currentUserId)
    let logButton = "";

    // zac - testing conditional navbar links
    if (username === null) {
      // if no username, render both login and registration links, but NO logout
      logButton = (
        <React.Fragment>
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/register"
            name="register"
            active={activeItem === "register"}
            onClick={this.handleItemClick}
          />
        </React.Fragment>
      );
    } else {
      // if there IS a username, render user's name and logout button
      // user's name can be a link to their profile page
      logButton = (
        <React.Fragment>
          <Menu.Item
            as={Link}
            to="/home"
            name={username}
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={Link} to="/home" name="logout" onClick={this.logout} />
        </React.Fragment>
      );
    }

    return (
      <Menu pointing>
        <Menu.Item
          as={Link}
          to="/home"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
      />
        <Menu.Item
          as={Link}
          to="/profile"
          name="profile"
          active={activeItem === "profile"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/dogs"
          name="dogs"
          active={activeItem === "dogs"}
          onClick={this.handleItemClick}
        />
        {/* <Menu.Item
          as={Link}
          to="/randomdog"
          name="Random Dog"
          active={activeItem === "randomdog"}
          onClick={this.handleItemClick}
        /> */}
        <Menu.Item
          as={Link}
          to="/matches"
          name="matches"
          active={activeItem === "matches"}
          onClick={this.handleItemClick}
        />
        {/* <Menu.Item
          as={Link}
          to="/messages"
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        /> */}
        <Menu.Menu position="right">
          {logButton}
        </Menu.Menu>
      </Menu>
    );
  }
}