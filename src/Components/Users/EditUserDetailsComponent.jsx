import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';

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
            base64TextString: this.props.history.location.state.profile.image,
            isPremium: this.props.history.location.state.profile.isPremium
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
            id: this.state.id, username: this.state.username, email: this.state.email, gameList: this.gameList,
            userImage: this.state.base64TextString, userRole: this.state.userRole, description: this.state.description, technologies: this.state.technologies, isPremium: this.state.isPremium
        };
        console.log('profile => ' + JSON.stringify(profile));
        if (isValid) {
            DeveloperService.updateProfile(this.state.id, profile).then(res => {
                AuthService.loadUserData();
                this.props.history.push('/');
            })
        } else {
            this.setState({ submitError: "Invalid credentials!" });
        }
    }

    validate = () => {
        let descriptionError = "";
        let emailError = "";
        let technologiesError = "";

        if (this.state.description.length === 0) {
            descriptionError = "Profile needs a description.";
        }
        if (this.state.email.length === 0) {
            emailError = "Profile needs an email."
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.technologies.length === 0) {
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
        console.log("File to upload: ", event.target.files[0])
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
                    {AuthService.getUserData()['username'] === this.state.username ? (<h2>Edit User Details</h2>) : null}

                    <br></br>
                    <form>
                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.username ? (
                                <React.Fragment>
                                    <label>Description</label>
                                    <input placeholder={this.props.history.location.state.profile.description} name="description" className="form-control"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div className="w3-display-container w3-text-white">
                                        <div className="w3-xlarge w3-display-bottomleft w3-padding" >{this.state.description}</div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </div>

                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.username ? (
                                <React.Fragment>
                                    {this.state.base64TextString !== "" ?
                                        <React.Fragment>
                                            <label>Imágen actual</label>
                                            < br />
                                            <img src={"data:image/png;base64," + this.state.base64TextString} width="120" height="80" />
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <label>Imágen</label>
                                        </React.Fragment>
                                    }
                                    < br />
                                    <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div className="w3-display-container w3-text-white">
                                        <img src={"data:image/png;base64," + this.state.base64TextString} style={{ width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                                    </div>
                                </React.Fragment>
                            }
                        </div>

                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.username ? (
                                <React.Fragment>
                                    <label>Email</label>
                                    <input placeholder={this.state.email} name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeEmailHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <h5>Email</h5>
                                            </header>
                                            <div className="w3-container">
                                                <p>{this.state.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.emailError ? (<div className="ValidatorMessage">{this.state.emailError}</div>) : null}
                        </div>

                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.username ? (
                                <React.Fragment>

                                    <div className="form-group">
                                        <label>Technologies</label>
                                        <input type="text" className="form-control" placeholder="Technologies" value={this.state.technologies} onChange={this.changeTechnologiesHandler} />
                                    </div>
                                </React.Fragment>
                            ) :

                                <div>
                                    <br />
                                    <div className="w3-card-2" >
                                        <header className="w3-container ">
                                            <h5>Tecnologies</h5>
                                        </header>
                                        <div className="w3-container">
                                            <p>{this.state.technologies}</p>
                                        </div>
                                    </div>
                                </div>}
                            {this.state.technologiesError ? (<div className="ValidatorMessage">{this.state.technologiesError}</div>) : null}
                        </div>

                        {AuthService.getUserData()['username'] === this.state.username ? (
                            <React.Fragment>
                                <button className="AceptButton" onClick={this.updateProfile}>Modificar Perfil</button>
                                {this.state.submitError ? (<div className="ValidatorMessage">
                                    {this.state.submitError}
                                </div>) : null}
                            </React.Fragment>
                        ) : null}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Volver</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditUserDetailsComponent;