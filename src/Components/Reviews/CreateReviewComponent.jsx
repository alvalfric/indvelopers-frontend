import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { ReviewService } from '../../Services/ReviewService';
import { AuthService } from '../../Services/AuthService';


class CreateReviewComponent extends Component {

	constructor(props) {
		super(props)

		this.state = {
			gameId: this.props.match.params.id,
			text: "",
			score: "",
			username: null,
			game: null,
		}
		this.saveReview = this.saveReview.bind(this);
		this.changeScoreHandler = this.changeScoreHandler.bind(this);
		this.changeTextHandler = this.changeTextHandler.bind(this);
	}

	validate = () => {
		let textError = "";
		let scoreError = "";

		if (this.state.text.length === 0) {
			textError = "Cannot be empty";
		}
		if (this.state.score.length === 0) {
			scoreError = "Cannot be empty";
		}
		if (this.state.score < 0 || this.state.score > 5) {
			scoreError = "Score must be a number between 0 and 5";
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
					text: this.state.text,
					score: this.state.score,
					game: game,
					developer: AuthService.getUserData()
				}
				console.log('Game => ' + JSON.stringify(game))
				console.log('Review => ' + JSON.stringify(review));
				ReviewService.addReview(this.state.gameId, review).then(res=>{
					this.props.history.push('/game-View/' + this.state.gameId);
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
					<h2>Add review</h2>
					<div className="form-group">
						<label>Text</label>
						<textarea placeholder="Text" name="text" type="text-box" className="form-control" value={this.state.text}
							onChange={this.changeTextHandler} />
						{this.state.textError ? (<div className="ValidatorMessage">
							{this.state.textError}
						</div>) : null}
					</div>
					<div className="form-group">
						<label> Score </label>
						<input placeholder="Score" name="score" className="form-control" type="number" min="0" max="5" step="0.1" value={this.state.score}
							onChange={this.changeScoreHandler}></input>
						{this.state.scoreError ? (<div className="ValidatorMessage">
							{this.state.scoreError}
						</div>) : null}
					</div>
					<button className="AceptButton" onClick={this.saveReview}>Crear Review</button>
					<button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
				</form>

			</div>
		);
	}

}

export default CreateReviewComponent;