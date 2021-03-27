import React, { Component } from 'react';



class CreateReviewComponent extends Component {

	constructor(props){
		super(props)

		this.state = {
			text:"",
			score:""
		} 
		//this.saveReview = this.saveReview.bind(this);
	}

	//validate =()=>{}

	cancel(){
		this.props.history.push('/review-list');
	}
	saveReview = (e) =>{
		e.preventDefault();
		//isValid
		//if valid -> guardar
		//this.props.history.push('review-list');	
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
				<textarea placeholder="Text"  name="text" type="text-box" className="form-control" value={this.state.text}/>

			</div>
			<div className="form-group">
			<label> Score </label>
				<input placeholder="Score" name="score" className="form-control" type="number"></input>
			</div>
			<button className="AceptButton" onClick={this.saveReview}>Crear Review</button>
            <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>  
		</form>

	</div>
}

}

export default CreateReviewComponent;