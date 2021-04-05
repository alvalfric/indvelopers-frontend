import React, { Component } from "react";

class LoginComponent extends Component {

    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <h1>¡Te has logueado correctamente!</h1>
                <h2>Pulsa aquí para volver a la <a href="/">Página inicial</a></h2>
            </React.Fragment>
        );
    }
}

export default LoginComponent;
