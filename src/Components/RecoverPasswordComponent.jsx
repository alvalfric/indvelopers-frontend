import React, { Component } from 'react';
import { AuthService } from "../Services/AuthService";
import { DeveloperService } from '../Services/DeveloperService';

class RecoverPasswordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            emailError: "",
            submitError: "",
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
	}

    validate = () => {
        let emailError = "";

        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.email.length === 0) {
            emailError = "Email cannot be empty";
        }

        this.setState({ emailError });
        if (emailError) {
            return false;
        } else {
            return true;
        }
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    updateDeveloper = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            
        }
    }

    render() {
        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.changeEmailHandler} />
                    {this.state.emailError ? (<div className="ValidatorMessage">
                        {this.state.emailError}
                    </div>) : null}
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.updateDeveloper}>Register</button>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}

            </form>
        );
    }
}

export default RecoverPasswordComponent;