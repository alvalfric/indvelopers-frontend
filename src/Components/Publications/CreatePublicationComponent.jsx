import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { PublicationService } from '../../Services/PublicationService';
import { SpamService } from '../../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'


class CreatePublicationComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            imagen: "",
            base64TextString: "",
            text: "",
            textError: "",
            userPicture: null,
            spamError:""

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
            console.log('Publication=>' + JSON.stringify(publication));
            SpamService.checkPublication(publication).then((data)=>{
                if(data === false){
                    PublicationService.AddPublication(publication).then(res => {
                        this.props.history.push('/publication-List');
                    })
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
            //Change it when connect to the back end
        }
    }

    render() {
        return (
            <React.Fragment>
            <br/>
            <br/>
            <br/>
            <Form className="FormStyle">
            <h2 className="text-center">Create your publication</h2>
            <div>
                <form>
                    {/* <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Descripción" name="text" type="text-box" className="form-control" value={this.state.text} onChange={this.changeTextHandler} />
                        {this.state.textError ? (<div className="ValidatorMessage">
                            {this.state.textError}
                        </div>) : null}
                    </div>
                    <div className="form-group">
                        <input name="userPicture" type="hidden" className="form-control" value={this.state.userPicture} />
                    </div> */}
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1" >Description:</Form.Label>
                        <Col sm="10">
                        <Form.Control placeholder="Descripción" name="text" as="textarea" className="FormInput" value={this.state.text} onChange={this.changeTextHandler}/>
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
                                <img src={"data:image/png;base64,"+this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <label>Image: </label>
                            </React.Fragment>
                        }
                        < br />
                        <Form.File placeholder="Image" type="file" name="image" className="ButtonFileLoad"  accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
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
                    <Button variant="outline-success" size="lg" onClick={this.savePublication}> Create publication</Button>
                    <Button variant="outline-danger" size="lg" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Cancel</Button>
                    {/* <button className="AceptButton" onClick={this.savePublication}>Create publication</button>
                    <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button> */}
                    {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                </form>
            </div>
            </Form>
            </React.Fragment>
        );
    }
}

export default CreatePublicationComponent;