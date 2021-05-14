import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { ReviewService } from '../../Services/ReviewService';
import { AuthService } from '../../Services/AuthService';
import { SpamService } from '../../Services/SpamService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


class EditReviewComponent extends Component {

	constructor(props) {
		super(props)

		this.state = {
			gameId: this.props.match.params.id,
			text: "",
			textError:"",
			score: "",
			scoreError:"",
			username: null,
			game: null,
			spamError:"",
			hasReview:false
			
		}
		this.saveReview = this.saveReview.bind(this);
		this.changeScoreHandler = this.changeScoreHandler.bind(this);
		this.changeTextHandler = this.changeTextHandler.bind(this);
	}
  
	componentDidMount() {
		if(AuthService.isAuthenticated()){
			ReviewService.getbyGame(this.state.gameId).then(data => {
				data.forEach(review => {
					if (AuthService.getUserData()['username'] == review.developer.username) {
						this.setState({
							text: review.text,
							score: review.score + "",
							hasReview:true
						})
					}
				})
				if(!this.state.hasReview){
					this.props.history.push('/game-View/'+this.state.gameId);
				}
			})
		}else{
			this.props.history.push("/login")
		}
	}

	validate = () => {
		let textError = "";
		let scoreError = "";

		if (this.state.text.trim().length === 0) {
			textError = "Cannot be empty";
		}
		if (this.state.score.length === 0) {
			scoreError = "Cannot be empty";
		}
		if (this.state.score < 0 || this.state.score > 5) {
			scoreError = "Score must be a number between 0 and 5";
		}
		console.log(this.state.score)
		if (this.state.score.split('.').length == 2 && this.state.score.split('.')[1].length > 1) {
			scoreError = "Score must not have more than 1 decimal!"
		}

		this.setState({ textError });
		this.setState({ scoreError });
		if (textError || scoreError) {
			return false;
		} else {
			return true;
		}

	}

	cancel() {
		this.props.history.push('/game-View/' + this.state.gameId);
	}

	changeTextHandler = (event) => {
		this.setState({ text: event.target.value })
	}

	changeScoreHandler = (event) => {
		this.setState({ score: event.target.value })
	}

	saveReview = (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if(isValid){
			GameService.getGameById(this.state.gameId).then(res => {
				let game = res.data;
				this.setState({title: game.title,
					description: game.description,
					requirements: game.requirements,
					price: game.price,
					idCloud: game.idCloud,
					isNotMalware: game.isNotMalware,
					creator: game.creator
				});
				let review={
					text: this.state.text.trim(),
					score: this.state.score,
                    edited: true,
					game: game,
					developer: AuthService.getUserData()
				}
				console.log('Game => ' + JSON.stringify(game))
				console.log('Review => ' + JSON.stringify(review));
				SpamService.checkReview(review).then((data)=>{
					if(data === false){
						ReviewService.editReview(this.state.gameId, review).then(res=>{
							this.props.history.push('/game-View/' + this.state.gameId);
						})
					}else{
						this.setState({spamError:"This form contains spam words! 😠"})
					}
				})
			})
        }
	}


	render() {
		return (
			<div>
				<br></br>
				<br></br>
				<form>
				<Form className="FormStyle">
					<h2 style={{textAlign:"center"}}>Add review</h2>
					<br/>
					{/* <div className="form-group">
						<label>Text</label>
						<textarea placeholder="Text" name="text" type="text-box" className="form-control" value={this.state.text}
							onChange={this.changeTextHandler} />
						{this.state.textError ? (<div className="ValidatorMessage">
							{this.state.textError}
						</div>) : null}
					</div> */}
					<Form.Group as={Row}>
						<Form.Label column sm="1">Text</Form.Label>
						<Col sm="10">
						<Form.Control as="textarea" placeholder="Text" name="text" type="text-box" className="FormInput" value={this.state.text}
							onChange={this.changeTextHandler}/>
							{this.state.textError ? (<div className="ValidatorMessage">
							{this.state.textError}
						</div>) : null}
						</Col>
					</Form.Group>
					{/* <div className="form-group">
						<label> Score </label>
						<input placeholder="Score" name="score" className="form-control" type="number" min="0" max="5" step="0.1" value={this.state.score}
							onChange={this.changeScoreHandler}></input>
						{this.state.scoreError ? (<div className="ValidatorMessage">
							{this.state.scoreError}
						</div>) : null}
					</div> */}
					<Form.Group as={Row}>
						<Form.Label column sm="1">Score</Form.Label>
						<Col sm="10">
							<Form.Control  placeholder="Score" name="score" className="FormInput" type="number" min="0" max="5" step="0.1" value={this.state.score}
							onChange={this.changeScoreHandler}/>
							{this.state.scoreError ? (<div className="ValidatorMessage">
							{this.state.scoreError}
						</div>) : null}
						</Col>
					</Form.Group>
					<div style={{justifyContent:"center",display:"flex"}}>
					<Button variant="outline-success" onClick={(e)=>this.saveReview(e)}>Edit Review</Button>
					<Button variant="outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</Button>
					</div>
					{this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
					</Form>
				</form>

			</div>
		);
	}
}

export default EditReviewComponent;
