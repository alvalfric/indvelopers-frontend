import React, { Component } from "react";

class LoginComponent extends Component {

    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <h1>¡You logged successfully!</h1>
                <h2>Click here to go back to the <a href="/">Main site</a></h2>
            </React.Fragment>
        );
    }
}

export default LoginComponent;
