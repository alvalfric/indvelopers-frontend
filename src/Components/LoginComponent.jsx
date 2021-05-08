import React, { Component } from "react";
import { AuthService } from "../Services/AuthService";
import { DeveloperService } from '../Services/DeveloperService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            usernameError: "",
            password: "",
            passwordError: "",
            submitError: "",

        }
        this.loginDeveloper = this.loginDeveloper.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
    }

    validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (this.state.username.length === 0) {
            usernameError = "Username cannot be empty";
        }
        if (this.state.password.length === 0) {
            passwordError = "Password cannot be empty";
        }
        if (this.state.password.length < 8) {
            passwordError = "Password must have at least 8 characters";
        }

        this.setState({ usernameError });
        this.setState({ passwordError });
        if (usernameError || passwordError) {
            return false;
        } else {
            return true;
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    loginDeveloper = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let loginData = {
                username: this.state.username,
                password: this.state.password
            }
            DeveloperService.login(loginData).then(data => {
                if (typeof data == "string") {
                    AuthService.authenticate(this.state.username, this.state.password, data);
                    this.props.history.push("/successLogin");
                } else {
                    this.setState({ submitError: "Invalid credentials!" });
                }
            }
            );
        }
    }

    loginForm() {
        return (
            <form>
                <br />
                <br />
                <br />
                <Form className="FormStyle">
                <h2 style={{textAlign:"center"}}>Log in</h2>
                <br />

                {/* <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    {this.state.usernameError ? (<div className="ValidatorMessage">
                        {this.state.usernameError}
                    </div>) : null}
                </div> */}
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Username </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" className="FormInput" placeholder="Enter username" value={this.state.username} onChange={this.changeUsernameHandler} />
                        {this.state.usernameError ? (<div className="ValidatorMessage">
                        {this.state.usernameError}
                    </div>) : null}
                    </Col>
                </Form.Group>

                {/* <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                    {this.state.passwordError ? (<div className="ValidatorMessage">
                        {this.state.passwordError}
                    </div>) : null}
                </div> */}
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" className="FormInput" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                        {this.state.passwordError ? (<div className="ValidatorMessage">
                        {this.state.passwordError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <div style={{justifyContent:"center",display:"flex"}}>
                <Button type="submit" variant="outline-primary"  onClick={(e) => this.loginDeveloper(e)}>Sign in</Button>
                </div>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}
                <p className="not-registered-yet text-right">
                    Not registered yet? <a href="/sign-up">sign up!</a>
                </p>
                <p className="already-registered text-right">
                    Lost password? <a href="/recoverPassword">Recover your password</a>
                </p>
                </Form>
            </form>
        )
    }

    render() {
        return (
            <div>
                {this.loginForm()}
            </div>
        );
    }
}

export default LoginComponent;