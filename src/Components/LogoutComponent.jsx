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
                <h1>¡Has cerrado sesión correctamente!</h1>
                <h2>Pulsa aquí para volver a la <a href="/">Página inicial</a></h2>
            </React.Fragment>
        );
    }
}

export default LogoutComponent;
