import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { ForumService } from '../../Services/ForumService';
import { SpamService } from '../../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class CreateForumComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            title: "",
            titleError: "",
            spamError:""
        }

        this.saveForum = this.saveForum.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
    }
    validate = () => {
        let titleError = "";

        if (this.state.title.trim().length === 0) {
            titleError = "You must type something to publish!"
        }

        this.setState({ titleError });
        if (titleError) {
            return false;
        } else {
            return true;
        }

    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    saveForum = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let forum = {//aqui lo siguiente es crear el foro dto
                title: this.state.title.trim(), creationDate: null, developerCreatorId: AuthService.getUserData()['id'], developerCreatorUsername: AuthService.getUserData()['username'],
            }
            console.log('forum=>' + JSON.stringify(forum));
            SpamService.checkForum(forum).then((data)=>{
                if(data === false){
                    ForumService.addForum(forum).then(res => {
                        this.props.history.push('/forums');
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
            <div>

                <br></br>
                <br></br>
                <Form className="FormStyle">
                <h2 className="text-center">Create Forum</h2>
                <Form.Group as={Row}>
                    <Form.Label column sm="1" className="TextRes">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" placeholder="Title" name="title" type="text-box" className="FormInput" value={this.state.title} onChange={this.changeTitleHandler} />
                        {this.state.titleError ? (<div className="ValidatorMessage">
                            {this.state.titleError}
                        </div>) : null}
                    </Col>
                </Form.Group>
                <div style={{justifyContent:"center",display:"flex"}}>
                <Button className="ButtonRes" variant="outline-success" onClick={this.saveForum}>Create forum</Button>
                </div>
                {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                </Form>
            </div>
        );
    }
}

export default CreateForumComponent;