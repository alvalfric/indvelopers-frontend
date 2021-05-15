import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { PostService } from '../../Services/PostService';
import { AuthService } from '../../Services/AuthService';
import { SpamService } from '../../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class PostCreateUpdateComponent extends Component {

	constructor(props) {
		super(props)

		this.state = {
			forumId: this.props.match.params.id,
			description: "",
			descriptionError:"",
            creationDate: "",
            isEdited:false,
			username: null,
			spamError:"",
            amIUpdating: this.props.location.state
			
		}
		this.savePost = this.savePost.bind(this);
		this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
	}
  
	componentDidMount() {
		if(this.state.amIUpdating){
            PostService.getPostById(this.props.location.state.postId).then((post)=>{
				console.log(post)
                this.setState({
                    description: post.data.description,
                    creationDate : post.data.creationDate,
                    foroId : post.data.foroId,
                    developerCreatorId: post.data.developerCreatorId,
                    developerCreatorUsername: post.data.developerCreatorUsername
                })
            })
        }
	}

	validate = () => {
		let descriptionError = "";

		if (this.state.description.trim().length === 0) {
			descriptionError = "Cannot be empty";
		}
		this.setState({ descriptionError });
		if (descriptionError ) {
			return false;
		} else {
			return true;
		}

	}

	cancel() {
		this.props.history.push('/posts/' + this.state.forumId);
	}

	changeDescriptionHandler = (event) => {
		this.setState({ description: event.target.value })
	}

	savePost = (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if(isValid){
            if(this.props.location.state){
                let post = {description: this.state.description.trim(), creationDate: this.state.creationDate, edited: true, foroId: this.state.forumId,
                    developerCreatorId: this.state.developerCreatorId, developerCreatorUsername: this.state.developerCreatorUsername}
           
                SpamService.checkPost(post).then((data)=>{
                    if(data === false){
                        PostService.updatePost(this.props.location.state.postId, post).then(res =>{
                           this.props.history.push('/posts/' + this.state.forumId);
                        })
                    }else{
                       this.setState({spamError:"This form contains spam words! 😠"})
                    }
                })
            
            }else{
                let post = {description: this.state.description.trim(), creationDate: null, edited: false, foroId: this.state.forumId,
                     developerCreatorId: AuthService.getUserData()['id'], developerCreatorUsername: AuthService.getUserData()['username']}
            
                SpamService.checkPost(post).then((data)=>{
					if(data === false){
                        PostService.addPostToForum(this.state.forumId, post).then(res =>{
							this.props.history.push('/posts/' + this.state.forumId);
						})
					}else{
						this.setState({spamError:"This form contains spam words! 😠"})
				}
			})
            }
        }
	}


	render() {
		return (
			<div>
				<br></br>
				<br></br>
				<Form className="FormStyle">
				{this.state.amIUpdating?
                    <h2 className="text-center">Update Post</h2>
                    :<h2 className="text-center">Add Post</h2>}
				<Form.Group as={Row}>
					<Form.Label column sm="1">Description</Form.Label>
					<Col sm="10">
					<Form.Control as="textarea" placeholder="description" name="description" type="text-box" className="FormInput" value={this.state.description}
							onChange={this.changeDescriptionHandler} />
							{this.state.descriptionError ? (<div className="ValidatorMessage">
							{this.state.descriptionError}
						</div>) : null}
					</Col>
				</Form.Group>
				<br/>
					<div style={{justifyContent:"center",display:"flex"}}>
					{this.state.amIUpdating?
					<Button variant="outline-success" onClick={(e)=>this.savePost(e)}>Edit Post</Button>
                    :
                    <Button variant="outline-success" onClick={(e)=>this.savePost(e)}>New Post</Button>
                    }
					<Button variant="outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</Button>
					</div>
					{this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
				</Form>

			</div>
		);
	}
}

export default PostCreateUpdateComponent;
