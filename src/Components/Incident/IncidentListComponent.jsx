import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { IncidentService } from '../../Services/IncidentService';

class IncidentListComponent extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			incidents:[],
		}
		this.createIncident = this.createIncident.bind(this);
		
	}

	componentDidMount(){
		IncidentService.listUnsolvedIncidents().then((res) =>{
			this.setState({incidents:res.data});
		})
	}


	createIncident(){
		if(AuthService.isAuthenticated()){
			this.props.history.push('/incident-create')
		}else{
			this.props.history.push('/login')
		}
	}
/*{AuthService.isAuthenticated() ?
					AuthService.getUserData().roles.includes("ADMIN") ?
					<React.Fragment>
						{this.state.incidents.map(
							incident =>
								<div>
								<br/>
									<div className="w3-card-4">
										<header className="w3-container">
											<h5>{incident.title}</h5>
										</header>
										<div className="w3-container">
											<p>{incident.description}</p>
										</div>
										<div className="w3-container">
											<p>{incident.cause}</p>
										</div>
									</div>
								</div> 
						)}
					</React.Fragment>
						:null
					:null 
				}*/
	render(){
		return (
			<div>
				<br></br>
				<br></br>
				<h2 className="text-center">  Incidents </h2>
				{/*Boton a formulario*
					<h4 className="text-center"> Tell us about the incident you found and we'll do our best to help  </h4>	
					<div className="row">
						<button className="Button" onClick={this.createIncident}> Send Incident </button>
				</div>*/}
				{/*Listado incidencias sin resolver*/}
				{this.state.incidents.map(
					incident =>
						<div>
						<br/>
							<p>{incident.title}</p>
						</div> 
				)}

			</div>
		);
	}
}

export default IncidentListComponent;