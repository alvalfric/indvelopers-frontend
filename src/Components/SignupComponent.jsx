import React, { Component } from 'react';
import { DeveloperService } from '../Services/DeveloperService';

class SignupComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            usernameError: "",
            email: "",
            emailError: "",
            description: "",
            descriptionError: "",
            technologies: "",
            technologiesError: "",
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            submitError: "",
        }
        this.saveDeveloper = this.saveDeveloper.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeTechnologiesHandler = this.changeTechnologiesHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
    }

    validate = () => {
        let usernameError = "";
        let emailError = "";
        let descriptionError = "";
        let technologiesError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (this.state.username.length === 0) {
            usernameError = "Username cannot be empty";
        }
        if (this.state.email.length === 0) {
            emailError = "Email cannot be empty";
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.description.length === 0) {
            descriptionError = "Description cannot be empty";
        }
        if (this.state.technologies.length === 0) {
            technologiesError = "Technologies cannot be empty";
        }
        if (this.state.password.length === 0) {
            passwordError = "Password cannot be empty";
        }
        if (this.state.password.length < 8) {
            passwordError = "Password must have at least 8 characters";
        }
        if (this.state.confirmPassword.length === 0) {
            confirmPasswordError = "Password confirmation cannot be empty";
        }
        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords don't match";
        }

        this.setState({ usernameError });
        this.setState({ emailError });
        this.setState({ descriptionError });
        this.setState({ technologiesError });
        this.setState({ passwordError });
        this.setState({ confirmPasswordError });
        if (usernameError || emailError || descriptionError || technologiesError || passwordError || confirmPasswordError) {
            return false;
        } else {
            return true;
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeTechnologiesHandler = (event) => {
        this.setState({ technologies: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    saveDeveloper = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let userForm = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                description: this.state.description,
                technologies: this.state.technologies
            }
            DeveloperService.signup(userForm).then(data => {
                if (typeof data == Object) {
                    this.props.history.push('/login')
                } else {
                    this.setState({ submitError: "Username or email already in use" });
                }
            }
            );
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    {this.state.usernameError ? (<div className="ValidatorMessage">
                        {this.state.usernameError}
                    </div>) : null}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.changeEmailHandler} />
                    {this.state.emailError ? (<div className="ValidatorMessage">
                        {this.state.emailError}
                    </div>) : null}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.changeDescriptionHandler} />
                    {this.state.descriptionError ? (<div className="ValidatorMessage">
                        {this.state.descriptionError}
                    </div>) : null}
                </div>

                <div className="form-group">
                    <label>Technologies</label>
                    <input type="text" className="form-control" placeholder="Technologies" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                    {this.state.technologiesError ? (<div className="ValidatorMessage">
                        {this.state.technologiesError}
                    </div>) : null}
                </div>

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

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.saveDeveloper}>Register</button>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}
                <p className="already-registered text-right">
                    Already registered <a href="/login">log in?</a>
                </p>
            </form>
        );
    }
}

export default SignupComponent;