import React, { Component } from "react";

class LoginComponent extends Component {

    componentDidMount() {
        this.props.history.push('/')
        window.location.reload()
    }

    render() {
        return null
    }

}

export default LoginComponent;
