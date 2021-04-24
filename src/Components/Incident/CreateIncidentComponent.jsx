import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { IncidentService } from '../../Services/IncidentService';

class CreateIncidentComponent extends Component {

	constructor(props){

		super(props)
		
		this.state = {
			username: "",
			title:"",
			description:"",
			cause:"",
			solved:""

		}
		this.saveIncident = this.saveIncident.bind(this);
		this.changeTitleHandler = this.changeTitleHandler.bind(this);
		this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
		this.changeCauseHandler = this.changeCauseHandler.bind(this);
	}
	validate = () => {
		let textError = "";

		if(this.state.title.length === 0){
			textError = "Cannot be empty";
		}
		if(this.state.description.length === 0){
			textError = "Cannot be empty";
		}
		if(this.state.cause.length === 0){
			textError = "Cannot be empty";
		}

		this.setState({textError})
		if(textError){
			return false;
		}else{
			return true;
		}
	}
	changeTitleHandler = (event) => {
		this.setState({ title: event.target.value })
	}

	changeDescriptionHandler = (event) => {
		this.setState({ description: event.target.value })
	}

	changeCauseHandler = (event) => {
		this.setState({ cause: event.target.value })
	}

	saveIncident = (e) => {
		e.preventDefault();
		const isValid = this.validate();

		if(isValid){
	    	let incident = {
				username: AuthService.getUserData()['username'],
				title: this.state.title,
				description: this.state.description,
				cause: this.state.cause,
		   		solved: false
			}
			console.log('Incident =>' + JSON.stringify(incident));
	    	IncidentService.addIncident(incident).then(data => {
			   this.props.history.push('/incidents')
	   	})
	}
    }
	
	render(){
		return(
			<div>
				<br></br>
				<br></br>
				<form>
                    <div className="form-group">
						<label>Title</label>
                        <input placeholder="Title" name="title" className="form-control"
                            value={this.state.title} onChange={this.changeTitleHandler}>
						</input>
                    </div>
                	<div className="form-group">
                            <label>Description</label>
                            <input placeholder="Description" name="description" className="form-control"
                                value={this.state.description} onChange={this.changeDescriptionHandler}>
							</input>
					</div>
					<div>
						<label>Cause</label>
						<input placeholder="Cause" name="title" className="form-control"
							value={this.state.cause} onChange={this.changeCauseHandler}>
						</input>
					</div>
                   <br></br>
				   <button className="AcceptButton" onClick={this.saveIncident}> Save Incident</button>
                </form>

			</div>
		);
	}
}
export default CreateIncidentComponent;