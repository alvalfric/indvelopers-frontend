import React, { Component } from "react";

class SuccessfulLoginComponent extends Component {

    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <h1>¡You've logged in successfully!</h1>
                <h2>Click <a href="/">here</a> to go to the main screen</h2>
            </React.Fragment>
        );
    }

}

export default SuccessfulLoginComponent;
