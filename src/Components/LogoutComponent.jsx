import React, { Component } from "react";
import { AuthService } from "../Services/AuthService";

class LogoutComponent extends Component {
    componentDidMount() {
		AuthService.logout()
	}

    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <h1>¡You logout successfully!</h1>
                <h2>Click here to go back to the <a href="/">Main site</a></h2>
            </React.Fragment>
        );
    }
}

export default LogoutComponent;
