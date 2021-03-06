import React, { Component } from 'react';
import { AuthService } from "../Services/AuthService";
import { DeveloperService } from '../Services/DeveloperService';
import { SpamService } from '../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import emailjs from 'emailjs-com';

var serviceID = "service_x4mybgl"


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
            spamError: ""
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

        if (this.state.username.trim().length === 0) {
            usernameError = "Username cannot be empty";
        }
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.email.length === 0) {
            emailError = "Email cannot be empty";
        }
        if (this.state.description.trim().length === 0) {
            descriptionError = "Description cannot be empty";
        }
        if (this.state.technologies.trim().length === 0) {
            technologiesError = "Technologies cannot be empty";
        }
        if (new Date().getFullYear() - this.state.dateOfBirth.split('-')[0] < 13) {
            dateOfBirthError = "You must be 13 years old or older to use this website!";
        }
        if (this.state.dateOfBirth.split('-')[0] >= new Date().getFullYear()) {
            if (this.state.dateOfBirth.split('-')[1] >= new Date().getMonth()) {
                if (this.state.dateOfBirth.split('-')[2] >= new Date().getDate()) {
                    dateOfBirthError = "Birth date must be in the past!";
                }
            }
        }
        if (this.state.dateOfBirth.length === 0) {
            dateOfBirthError = "Birth date cannot be empty";
        }
        var passwordPattern = new RegExp(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}/)
        if (!passwordPattern.test(this.state.password)) {
            passwordError = "Password must contain 8 or more characters that are of at least one number, one uppercase and lowercase letter and a special character.";
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
    changeAcceptHandler = (event) => {
        this.setState({ acceptedPolicy: !this.state.acceptedPolicy })
    }
    saveDeveloper = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        const templateId = 'template_7t39cwp';
        if (isValid) {
            let userForm = {
                username: this.state.username.trim(),
                password: this.state.password,
                email: this.state.email,
                description: this.state.description.trim(),
                technologies: this.state.technologies.trim(),
                dateOfBirth: this.state.dateOfBirth
            }
            SpamService.checkDeveloper(userForm).then((data) => {
                if (data === false) {
                    DeveloperService.signup(userForm).then(data => {
                        if (typeof data == "object") {
                            this.sendFeedback(templateId, {
                                to_name: this.state.username,
                                email: this.state.email
                            })
                            this.props.history.push('/login')
                        } else {
                            this.setState({ submitError: "Username or email already in use" });
                        }
                    });
                } else {
                    this.setState({ spamError: "This form contains spam words! ????" })
                }
            })
        }
    }

    sendFeedback = (templateId, variables) => {
        emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            // Email successfully sent alert
            alert('Email Confirmation Successfully Sent')
        })
            // Email Failed to send Error alert
            .catch(err => {
                alert('Email Failed to Send')
                console.error('Email Confirmation Error:', err)
            })
    }

    signupForm() {
        return (
            <Form className="FormStyle">
            <form>
                <br />
                <br />
                <h2 style={{textAlign:"center"}}>Sign up</h2>
                <br />

                <Form.Group as={Row}>
                    <Form.Label column sm="1">Username:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" className="FormInput" placeholder="Username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    {this.state.usernameError ? (<div className="ValidatorMessage">
                        {this.state.usernameError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Email:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" className="FormInput" placeholder="Enter email" value={this.state.email} onChange={this.changeEmailHandler} />
                    {this.state.emailError ? (<div className="ValidatorMessage">
                        {this.state.emailError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Description:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" className="FormInput" placeholder="Description" value={this.state.description} onChange={this.changeDescriptionHandler} />
                    {this.state.descriptionError ? (<div className="ValidatorMessage">
                        {this.state.descriptionError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Technologies</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" className="FormInput" placeholder="Technologies like Unity, Wave engine, etc" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                    {this.state.technologiesError ? (<div className="ValidatorMessage">
                        {this.state.technologiesError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Birth Date:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="date" className="FormInput" value={this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler}/>
                    {this.state.dateOfBirthError ? (<div className="ValidatorMessage">
                        {this.state.dateOfBirthError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Password:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" className="FormInput" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler}/>
                    {this.state.passwordError ? (<div className="ValidatorMessage">
                        {this.state.passwordError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Confirm pass:</Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" className="FormInput" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler}/>
                    {this.state.confirmPasswordError ? (<div className="ValidatorMessage">
                        {this.state.confirmPasswordError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <br />
                <div className="form-group">
                    <input type="checkbox" defaultChecked={this.state.acceptedPolicy} onChange={this.changeAcceptHandler} />
                    <label>I have read and accept the <a href="/termsAndConditions">Terms and Conditions according to the GDPR legislation</a> and the <a href="/privacyPolicy">Privacy Policy</a> of the website</label>
                    {this.state.acceptedError ? (<div className="ValidatorMessage">
                        {this.state.acceptedError}
                    </div>) : null}
                </div>
                <div style={{justifyContent:"center",display:"flex"}}>
                <Button type="submit" variant="outline-primary"  onClick={this.saveDeveloper}>Sign up</Button>
                </div>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}
                <p className="already-registered text-right">
                    Already registered <a href="/login">log in?</a>
                </p>
                <p className="already-registered text-right">
                    Lost password? <a href="/recoverPassword">Recover your password</a>
                </p>
                {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}
            </form>
            </Form>

        )
    }
    render() {
        return (
            <div>
                {this.signupForm()}
            </div>
        );
    }
}

export default SignupComponent;