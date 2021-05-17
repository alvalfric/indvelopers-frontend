import React, { Component } from 'react';
import { AuthService } from "../../Services/AuthService";
import { DeveloperService } from '../../Services/DeveloperService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

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
                <Form className="FormStyle">
                <h2 style={{textAlign:"center"}}>Restore your password!</h2>
                <br />

                <Form.Group as={Row}>
                    <Form.Label column sm="1">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" className="FormInput" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                        {this.state.passwordError ? (<div className="ValidatorMessage">
                        {this.state.passwordError}
                    </div>) : null}
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column sm="1">Confirm pass</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" className="FormInput" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler}/>
                        {this.state.confirmPasswordError ? (<div className="ValidatorMessage">
                        {this.state.confirmPasswordError}
                    </div>) : null}
                    </Col>

                </Form.Group>
                <div style={{justifyContent:"center",display:"flex"}}>
                <Button type="submit" variant="outline-primary" onClick={this.restorePassword}>Restore my password!</Button>
                </div>
                {this.state.submitError ? (<div className="ValidatorMessage">
                    {this.state.submitError}
                </div>) : null}
                </Form>
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