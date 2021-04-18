import React, { Component } from "react";
import { AuthService } from "../Services/AuthService";

class LogoutComponent extends Component {

    componentDidMount() {
        AuthService.logout()
        this.props.history.push('/')
        window.location.reload()
    }

    render() {
        return null
    }
}

export default LogoutComponent;
