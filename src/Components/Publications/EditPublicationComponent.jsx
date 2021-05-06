import React, { Component } from 'react';
import {PublicationService} from '../../Services/PublicationService';
import { AuthService } from '../../Services/AuthService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row } from 'react-bootstrap';
import { SpamService } from '../../Services/SpamService';
import Image from 'react-bootstrap/Image'

class EditPublicationComponent extends Component{

	constructor(props){
		super(props)

		 this.state = {
            id: this.props.match.params.id,
            username: "",
            text: "",
            imagen: "",
            base64TextString: "",
            textError: "",
            userPicture: null,
            developer:null,
            spamError:""

        }
        this.savePublication = this.savePublication.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);

    }
    
     validate = () => {
        let textError = "";

        if (this.state.text.length === 0) {
            textError = "You must type something to publish!"
        }

        this.setState({ textError });
        if (textError) {
            return false;
        } else {
            return true;
        }

    }

    componentDidMount(){
        PublicationService.GetPublicationById(this.state.id).then(data => {
            this.setState({
                username:data.username,
                text: data.text,
                imagen: data.base64TextString,
                userPicture:data.userPicture,
                developer:data.developer,

            })
            console.log('Publication => ' + this.props.match.params.id)
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
                id:this.state.id,
                username: AuthService.getUserData()['username'],
                userPicture:this.state.userPicture,
                text: this.state.text,
                imagen: this.state.base64TextString,
                developer: this.state.developer
            }
            SpamService.checkPublication(publication).then((data)=>{
                if(data===false){
                    PublicationService.updatePublication(this.state.id, publication).then(res => {
                        this.props.history.push('/publication-List')
                    }) 
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })       
    }}

    cancel(){
        this.props.history.push('/publication-List');
    }

	render(){
		return(
			<div>
				<br/>
                <br/>
                <Form className="FormStyle">
                 <h2 className="text-center">Edit your publication</h2>
                 <br/>
                 <form>
                    {/* <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Description" name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                        {this.state.textError ? (<div className="ValidatorMessage">
                            {this.state.textError}
                        </div>) : null}
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div> */}
                        <Form.Group as={Row}>
                        <Form.Label column sm="1" >Description:</Form.Label>
                        <Col sm="10">
                        <Form.Control placeholder="Descripción" name="text" as="textarea" className="form-control" value={this.state.text} onChange={this.changeTextHandler}/>
                        {this.state.textError ? (<div className="ValidatorMessage">
                            {this.state.textError}
                        </div>) : null}
                        </Col>
                    </Form.Group>
{/*                     
                     <div className="form-group">
                        {this.state.base64TextString !== "" ?
                            <React.Fragment>
                                <label>Actual image: </label>
                                < br />
                                <img src={"data:image/png;base64,"+this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '150px' }}/>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <label>Image: </label>
                            </React.Fragment>
                        }
                        < br />
                        <Form.File placeholder="Image" type="file" name="image"  accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler}  />
                    </div> 
                     */}
                    <Form.Group >
                        {this.state.base64TextString !== "" ?
                        <React.Fragment>
                            <Form.Label column s> Actual Image </Form.Label>
                            <Image src={"data:image/png;base64,"+this.state.base64TextString} style={{float:"left", maxWidth: '200px', maxHeight: '200px' }} />
                        </React.Fragment> :
                        <React.Fragment>
                            <Form.Label column sm="2">
                            Image:
                            </Form.Label>
                        </React.Fragment>}
                        <Col sm="10">
                        <Form.File placeholder="Image" type="file" name="image" className="ButtonFileLoad"  accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                        </Col>
                    </Form.Group>
                    <Button variant="outline-success" size="lg" onClick={this.savePublication}> Modify publication</Button>
                    <Button variant="outline-danger" size="lg" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Cancel</Button>
                    {/* <button className="AceptButton" onClick={this.savePublication}>Create publication</button>
                    <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button> */}
                    {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                </form>
                </Form>
			</div>
		);
	}

}

export default EditPublicationComponent;