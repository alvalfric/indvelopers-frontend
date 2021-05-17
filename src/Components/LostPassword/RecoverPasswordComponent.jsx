import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import emailjs from 'emailjs-com';

var serviceID = "service_x4mybgl"

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
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    recoverPasswordByEmail = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        const templateId = 'template_rf431cp';
        if (isValid) {
            DeveloperService.recoverPasswordByEmail(this.state.email).then(data => {
                if (typeof data == "object") {
                    this.sendFeedback(templateId, {
                        email: this.state.email,
                        to_name: data.username,
                        passwordReset: "https://continuous-indvelopers.herokuapp.com/restorePassword/" + data.id
                    })
                } else {
                    this.setState({ submitError: "That email is not registered!" });
                }
            }
            )
        }
    }

    sendFeedback = (templateId, variables) => {
        emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            // Email successfully sent alert
            alert('Email Successfully Sent')
        })
            // Email Failed to send Error alert
            .catch(err => {
                alert('Email Failed to Send')
                console.error('Email Error:', err)
            })
    }

    recoverPasswordForm() {
        return (
            <form>
                <br />
                <br />
                <br />
                <br />
                <Form className="FormStyle">
                <h2 style={{textAlign:"center"}}>Recover your password!</h2>
                <br />
                
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" className="FormInput" placeholder="Enter email" value={this.state.email} onChange={this.changeEmailHandler}/>
                        {this.state.emailError ? (<div className="ValidatorMessage">
                        {this.state.emailError}
                    </div>) : null}
                    </Col>
                </Form.Group>
                <div style={{justifyContent:"center",display:"flex"}}>
                <Button type="submit" variant="outline-primary" onClick={this.recoverPasswordByEmail}>Recover my password!</Button>
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
                {this.recoverPasswordForm()}
            </div>
        );
    }
}

export default RecoverPasswordComponent;