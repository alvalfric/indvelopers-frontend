import React, { Component } from "react";
import { AuthService } from "../Services/AuthService";
import { DeveloperService } from '../Services/DeveloperService';

class LoginComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            username:"",
            usernameError:"",
            password:"",
            passwordError:"",
            submitError:"",
            
        }
        this.loginDeveloper=this.loginDeveloper.bind(this);
        this.changeUsernameHandler=this.changeUsernameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
	}

    validate=()=>{
        let usernameError="";
        let passwordError="";

        if(this.state.username.length===0)  {
            usernameError = "Username cannot be empty";
        }
        if(this.state.password.length===0) {
            passwordError = "Password cannot be empty";
        }
        if(this.state.password.length<8) {
            passwordError = "Password must have at least 8 characters";
        }

        this.setState({usernameError});
        this.setState({passwordError});
        if(usernameError || passwordError) {
            return false;
        } else {
            return true;
        }
    }

    changeUsernameHandler=(event)=>{
        this.setState({username:event.target.value});
    }
    changePasswordHandler=(event)=>{
        this.setState({password:event.target.value});
    }
    loginDeveloper=(event)=>{
        event.preventDefault();
        const isValid=this.validate();
        if(isValid){
            DeveloperService.login(this.state.username, this.state.password).then(data =>
                {if(typeof data == "string") {
                    AuthService.authenticate(this.state.username, this.state.password, data).then((res)=>{
                       
                    this.props.history.push('/successLogin');
                    
                    })
                    
                } else {
                    this.setState({submitError:"Invalid credentials!"});
                }}
                );
        }
    }

    render() {
        return (
            <form>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    {this.state.usernameError?(<div className="ValidatorMessage">
                         {this.state.usernameError} 
                      </div>):null}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                    {this.state.passwordError?(<div className="ValidatorMessage">
                         {this.state.passwordError} 
                      </div>):null}
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={(e)=>this.loginDeveloper(e)}>Sign in</button>
                {this.state.submitError?(<div className="ValidatorMessage">
                         {this.state.submitError}
                      </div>):null}
                <p className="not-registered-yet text-right">
                    Not registered yet? <a href="/sign-up">sign up!</a>
                </p>
            </form>
        );
    }
}

export default LoginComponent;