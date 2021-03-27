import React, { Component } from 'react';



class CreateReviewComponent extends Component {

	constructor(props){
		super(props)

		this.state = {
			text:"",
			score:""
		} 
		this.saveReview = this.saveReview.bind(this);
		this.changeScoreHandler = this.changeScoreHandler.bind(this);
		this.changeTextHandler = this.changeTextHandler.bind(this);
	}

	validate =()=>{
		let textError = "";
		let scoreError = "";

		if(this.state.text.length == 0){
			textError = "Cannot be empty";
		}
		if(this.state.score.length==0){
			scoreError == "Cannot be empty";
		}
		this.setState({textError});
		this.setState({scoreError});

		if(textError || scoreError){
			return false;
		}else{
			return true;
		}

	}

	cancel(){
		this.props.history.push('/review-list');
	}

	changeTextHandler = (event) => {
		this.setState({text: event.target.value})
	}

	changeScoreHandler = (event) => {
		this.setState({score: event.target.value})
	}

	saveReview = (e) =>{
		e.preventDefault();
		const isValid = this.validate();
		if(isValid){
			this.props.history.push('review-list');
		}
	}


	render(){
		<div>
			<br></br>
			<br></br>
			<form>
				<div className="form-group">
					<label> Review </label>
				
				</div>
				<div className="form-group">
					<label>Text</label>
					<textarea placeholder="Text"  name="text" type="text-box" className="form-control" value={this.state.text}
					onChange={this.changeTextHandler}/>
					{this.state.textError ?(<div className="ValidatorMessage">
						{this.state.textError}
					</div>): null}

				</div>
				<div className="form-group">
				<label> Score </label>
					<input placeholder="Score" name="score" className="form-control" type="number" value={this.state.score}
					onChange={this.changeScoreHandler}></input>
					{this.state.scoreError ?(<div className="ValidatorMessage">
						{this.state.scoreError}
					</div>): null}
				</div>
				<button className="AceptButton" onClick={this.saveReview}>Crear Review</button>
           		<button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>  
			</form>

		</div>
	}

}

export default CreateReviewComponent;