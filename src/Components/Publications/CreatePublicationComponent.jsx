import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import PublicationService from '../../Services/PublicationService';



class CreatePublicationComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            imagen: "",
            base64TextString: "",
            text: "",
            textError: "",
            userPicture: null

        }

        this.savePublication = this.savePublication.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }
    validate = () => {
        let textError = "";

        if (this.state.text.trim().length === 0) {
            textError = "You must type something to publish!"
        }

        this.setState({ textError });
        if (textError) {
            return false;
        } else {
            return true;
        }

    }

    cancel() {
        this.props.history.push('/publication-List');
    }
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    changeImagenHandler = (event) => {
        let file = event.target.files[0]
        if(file) {
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

    savePublication = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let publication = {
                username: AuthService.getUserData()['username'], userPicture: null,
                text: this.state.text.trim(), imagen: this.state.base64TextString, developer: null
            }
            PublicationService.AddPublication(publication).then(res => {
                this.props.history.push('/publication-List');
            })
            //Change it when connect to the back end
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <form>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Descripción" name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                        {this.state.textError ? (<div className="ValidatorMessage">
                            {this.state.textError}
                        </div>) : null}
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div>
                    <div className="form-group">
                        {this.state.base64TextString !== "" ?
                            <React.Fragment>
                                <label>Actual image: </label>
                                < br />
                                <img src={"data:image/png;base64,"+this.state.base64TextString} width="120" height="80"/>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <label>Image: </label>
                            </React.Fragment>
                        }
                        < br />
                        <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                    </div>
                    <button className="AceptButton" onClick={this.savePublication}>Create publication</button>
                    <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default CreatePublicationComponent;