import React, { Component } from 'react';
import { AuthService } from "../Services/AuthService";
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
            dateOfBirth: "",
            dateOfBirthError: "",
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            acceptedPolicy: false,
            acceptedError: "",
            submitError: "",
        }
        this.saveDeveloper = this.saveDeveloper.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeTechnologiesHandler = this.changeTechnologiesHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
        this.changeAcceptHandler = this.changeAcceptHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
	}

    validate = () => {
        let usernameError = "";
        let emailError = "";
        let descriptionError = "";
        let technologiesError = "";
        let dateOfBirthError = "";
        let passwordError = "";
        let confirmPasswordError = "";
        let acceptedError = "";

        if (this.state.username.length === 0) {
            usernameError = "Username cannot be empty";
        }
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.email.length === 0) {
            emailError = "Email cannot be empty";
        }
        if (this.state.description.length === 0) {
            descriptionError = "Description cannot be empty";
        }
        if (this.state.technologies.length === 0) {
            technologiesError = "Technologies cannot be empty";
        }
        if (new Date().getFullYear() - this.state.dateOfBirth.split('-')[0] < 13) {
            dateOfBirthError = "You must be 13 years old or older to use this website!";
        }
        if (this.state.dateOfBirth.split('-')[0] >= new Date().getFullYear()) {
            if(this.state.dateOfBirth.split('-')[1] >= new Date().getMonth()) {
                if(this.state.dateOfBirth.split('-')[2] >= new Date().getDate()) {
                    dateOfBirthError = "Birth date must be in the past!";
                }
            }
        }
        if (this.state.dateOfBirth.length === 0) {
            dateOfBirthError = "Birth date cannot be empty";
        }
        if (this.state.password.length < 8) {
            passwordError = "Password must have at least 8 characters";
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
        if (!this.state.acceptedPolicy) {
            acceptedError = "You have to agree to the terms and conditions for signing up!";
        }

        this.setState({ usernameError });
        this.setState({ emailError });
        this.setState({ descriptionError });
        this.setState({ technologiesError });
        this.setState({ dateOfBirthError });
        this.setState({ passwordError });
        this.setState({ confirmPasswordError });
        this.setState({ acceptedError });
        if (usernameError || emailError || descriptionError || technologiesError || dateOfBirthError || passwordError || confirmPasswordError || acceptedError) {
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
    changeDateOfBirthHandler = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    changeAcceptHandler = (event)=>{
        this.setState({acceptedPolicy: !this.state.acceptedPolicy})
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
                technologies: this.state.technologies,
                dateOfBirth: this.state.dateOfBirth
            }
            console.log(userForm.dateOfBirth)
            DeveloperService.signup(userForm).then(data => {
                if (typeof data == "object") {
                    this.props.history.push('/login')
                } else {
                    this.setState({ submitError: "Username or email already in use" });
                }
            }
            );
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
                    <label>Technologies (you use to develop your games)</label>
                    <input type="text" className="form-control" placeholder="Technologies like Unity, Wave engine, etc" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                    {this.state.technologiesError ? (<div className="ValidatorMessage">
                        {this.state.technologiesError}
                    </div>) : null}
                </div>

                <div className="form-group">
                    <label>Birth date</label>
                    <input type="date" className="form-control" value={this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler} />
                    {this.state.dateOfBirthError ? (<div className="ValidatorMessage">
                        {this.state.dateOfBirthError}
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

                <div className="form-group">
                    <input type="checkbox" defaultChecked={this.state.acceptedPolicy} onChange={this.changeAcceptHandler} />
                    <label>I have read and accept the <a href="/termsAndConditions">Terms and Conditions according to the GDPR legislation</a> and the <a href="/privacyPolicy">Privacy Policy</a> of the website</label>
                    {this.state.acceptedError ? (<div className="ValidatorMessage">
                        {this.state.acceptedError}
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