import React, { Component } from 'react';
import { AuthService } from "../../Services/AuthService";
import { DeveloperService } from '../../Services/DeveloperService';

var serviceID = "service_x4mybgl"

class RecoverPasswordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
			id: this.props.match.params.id,
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            submitError: "",
        }
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
    }

    validate = () => {
        let passwordError = "";
        let confirmPasswordError = "";

        var passwordPattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
        if (!passwordPattern.test(this.state.password)) {
            passwordError = "Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter.";
        }
        if (this.state.password.length === 0) {
            passwordError = "Password cannot be empty";
        }
        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords don't match";
        }
        if (this.state.confirmPassword.length === 0) {
            confirmPasswordError = "Password confirmation cannot be empty";
        }

        this.setState({ passwordError });
        this.setState({ confirmPasswordError });
        if (passwordError || confirmPasswordError) {
            return false;
        } else {
            return true;
        }
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    restorePassword = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            DeveloperService.restorePassword(this.state.id, this.state.password).then(data => {
                if (typeof data == "object") {
                    this.props.history.push("/login");
                } else {
                    alert("Error " + data)
                }
            }
            )
        }
    }

    restorePasswordForm() {
        return (
            <form>
                <br />
                <br />
                <br />
                <h2>Restore your password!</h2>
                <br />

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                    {this.state.passwordError ? (<div className="ValidatorMessage">
                        {this.state.passwordError}
                    </div>) : null}
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler} />
                    {this.state.confirmPasswordError ? (<div className="ValidatorMessage">
                        {this.state.confirmPasswordError}
                    </div>) : null}
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.restorePassword}>Restore my password!</button>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}

            </form>
        )
    }

    render() {
        return (
            <div>
                {this.restorePasswordForm()}
            </div>
        );
    }
}

export default RecoverPasswordComponent;