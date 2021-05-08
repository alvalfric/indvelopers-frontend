import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { PostService } from '../../Services/PostService';
import { AuthService } from '../../Services/AuthService';
import { SpamService } from '../../Services/SpamService';

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
				<form>
                    {this.state.amIUpdating?
                    <h2>Update Post</h2>
                    :<h2>Add Post</h2>}
					<div className="form-group">
						<label>Description</label>
						<textarea placeholder="description" name="description" type="text-box" className="form-control" value={this.state.description}
							onChange={this.changeDescriptionHandler} />
						{this.state.descriptionError ? (<div className="ValidatorMessage">
							{this.state.descriptionError}
						</div>) : null}
					</div>
                    {this.state.amIUpdating?
					<button className="AceptButton" onClick={(e)=>this.savePost(e)}>Editar Post</button>
                    :
                    <button className="AceptButton" onClick={(e)=>this.savePost(e)}>New Post</button>
                    }
					<button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
					{this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
				</form>

			</div>
		);
	}
}

export default PostCreateUpdateComponent;
