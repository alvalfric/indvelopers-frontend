import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import { SpamService } from '../../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class EditUserDetailsComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            id: this.props.history.location.state.profile.id,
            username: this.props.history.location.state.profile.username,
            description: this.props.history.location.state.profile.description == null ? "" : this.props.history.location.state.profile.description,
            descriptionError: "",
            email: this.props.history.location.state.profile.email,
            emailError: "",
            technologies: this.props.history.location.state.profile.technologies == null ? "" : this.props.history.location.state.profile.technologies,
            technologiesError: "",
            gameList: "",
            userRole: this.props.history.location.state.profile.technologies,
            imagen: "",
            base64TextString: this.props.history.location.state.profile.userImage,
            isPremium: this.props.history.location.state.profile.isPremium,
            spamError:""
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeTechnologiesHandler = this.changeTechnologiesHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
    }

    updateProfile = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        let profile = {
            id: this.state.id, username: this.state.username.trim(), email: this.state.email, gameList: this.gameList,
            userImage: this.state.base64TextString, userRole: this.state.userRole, description: this.state.description.trim(), technologies: this.state.technologies.trim(), isPremium: this.state.isPremium
        };
        if (isValid) {
            SpamService.checkDeveloperDto(profile).then((data)=>{
                if(data === false){
                    DeveloperService.updateProfile(this.state.id, profile).then(() => {
                        AuthService.loadUserData().then(()=>{this.props.history.push('/me');})
                    })
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
        }
    }

    validate = () => {
        let descriptionError = "";
        let emailError = "";
        let technologiesError = "";

        if (this.state.description.trim().length === 0) {
            descriptionError = "Profile needs a description.";
        }
        if (this.state.email.length === 0) {
            emailError = "Profile needs an email."
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.technologies.trim().length === 0) {
            technologiesError = "Profile needs technologies."
        }

        this.setState({ descriptionError });
        this.setState({ emailError });
        this.setState({ technologiesError });
        //this.setState({priceError});
        if (descriptionError || emailError || technologiesError) {
            return false;
        } else {
            return true;
        }
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value })
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    changeTechnologiesHandler = (event) => {
        this.setState({ technologies: event.target.value })
    }

    changeImagenHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ imagen: event.target.value });
    }
    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

    cancel() {
        //Redirigir a games
        this.props.history.push('/me');
    }

    render() {
        return (
            <div>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form className="FormStyle">
                    {AuthService.getUserData()['username'] === this.state.username ? (<h2>Edit User Details</h2>) : null}

                    <br></br>
                    
                        <Form.Group as={Row}>
                        {AuthService.getUserData()['username'] === this.state.username ? (
                            <React.Fragment>
                            <Form.Label column sm="1">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Description" name="description" className="FormInput"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}/>
                            </Col>
                            </React.Fragment>
                        ):
                        <React.Fragment>
                            <Form.Label column sm="1">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control disabled placeholder="Description" name="description" className="FormInput"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}/>
                            </Col>
                        </React.Fragment>
                        }
                        {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </Form.Group>
                        <Form.Group as={Row}>
                        {AuthService.getUserData()['username'] === this.state.username ? (
                           <React.Fragment>
                               {this.state.base64TextString==null?
                               <React.Fragment>
                                   <Form.Label column sm="1">Image</Form.Label>
                               </React.Fragment>
                            :
                            <React.Fragment>
                                   <Form.Label column sm="1">Current image</Form.Label>
                                   <Col sm="10">
                                   <Image src={"data:image/png;base64," + this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
                                   </Col>
                               </React.Fragment>
                            }
                            <Form.File placeholder="Image" type="file" name="image" className="FormInput" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler}/>
                           </React.Fragment> 
                        ):
                        <React.Fragment>
                               <div className="w3-display-container w3-text-white">
                                        <Image src={"data:image/png;base64," + this.state.base64TextString} style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} width="400" height="300" />
                                    </div>
                           </React.Fragment> 
                        }
                        </Form.Group>

                        <Form.Group as={Row}>
                        {AuthService.getUserData()['username'] === this.state.username ? (
                            <React.Fragment>
                                <Form.Label column sm="1">Email</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" placeholder={this.state.email} name="email" className="FormInput"
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                </Col>
                            </React.Fragment>
                        ):
                        <React.Fragment>
                            <Form.Label column sm="1">Email</Form.Label>
                                <Col sm="10">
                                    <Form.Control disabled type="email" placeholder={this.state.email} name="email" className="FormInput"
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                </Col>
                        </React.Fragment>
                        }
                        {this.state.emailError ? (<div className="ValidatorMessage">{this.state.emailError}</div>) : null}
                        </Form.Group>
                        <Form.Group as={Row}>
                        {AuthService.getUserData()['username'] === this.state.username ? (
                            <React.Fragment>
                                <Form.Label column sm="1">Technologies</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" className="FormInput" placeholder="Technologies" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                                </Col>
                            </React.Fragment>
                        ) :
                        <React.Fragment>
                            <Form.Label column sm="1">Technologies</Form.Label>
                                <Col sm="10">
                                    <Form.Control disabled type="text" className="FormInput" placeholder="Technologies" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                                </Col>
                        </React.Fragment>
                        }
                         {this.state.technologiesError ? (<div className="ValidatorMessage">{this.state.technologiesError}</div>) : null}
                        </Form.Group>

                        <div style={{justifyContent:"center",display:"flex"}}>
                        {AuthService.getUserData()['username'] === this.state.username ? (
                            <React.Fragment>
                                <Button className="ButtonRes" variant="outline-success" onClick={this.updateProfile}>Update profile</Button>
                                {this.state.submitError ? (<div className="ValidatorMessage">
                                    {this.state.submitError}
                                </div>) : null}
                            </React.Fragment>
                        ) : null}
                        <Button className="ButtonRes" variant="outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</Button>
                        
                        </div>
                        {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}  
                    </Form>
                </div>
            </div>
        );
    }
}

export default EditUserDetailsComponent;