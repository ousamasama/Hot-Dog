
import React, { Component } from 'react';
import ApplicationViews from "./components/ApplicationViews"
import './App.css';
import NavBar from "./components/nav/NavBar"
import { Container } from 'semantic-ui-react'



export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Container>
                    <ApplicationViews />
                </Container>
            </React.Fragment>
        )
    }
}