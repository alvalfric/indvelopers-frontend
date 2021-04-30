import React, { Component } from 'react';
import {PublicationService} from '../../Services/PublicationService';
import { AuthService } from '../../Services/AuthService';


class EditPublicationComponent extends Component{

	constructor(props){
		super(props)

		 this.state = {
            id: "",
            username: "",
            imagen: "",
            base64TextString: "",
            text: "",
            textError: "",
            userPicture: null

        }
        this.savePublication = this.savePublication.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);

	}

    componentDidMount(){
        PublicationService.GetPublicationById(this.state.id).then(data => {
            data.forEach(publication =>{
                if(AuthService.getUserData()['username'] !== publication.developer.username){
                    this.props.history.push('/publication-List')
                }
                this.setState({
                    text: publication.text,
                })
            })
        })
    }

    changeTextHandler = (event) => {
        this.setState({text: event.target.value})
    }

    changeImagenHandler = (event) => {
        let file = event.target.files[0]
        if(file){
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ imagen: event.target.value });
    }

	savePublication = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let publication = {
                username: AuthService.getUserData()['username'], userPicture: null,
                text: this.state.text, imagen: this.state.base64TextString, developer: null
            }
            console.log('Publication=>' + JSON.stringify(publication));
            PublicationService.AddPublication(publication).then(res => {
                this.props.history.push('/publication-List');
            })
        }
    }

	render(){
		return(
			<div>
				<br/>
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
                    <button className="AceptButton" onClick={this.savePublication}>Edit publication</button>
                </form>
			</div>
		);
	}

}

export default EditPublicationComponent;