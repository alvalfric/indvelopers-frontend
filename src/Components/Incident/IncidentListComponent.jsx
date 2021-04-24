import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { IncidentService } from '../../Services/IncidentService';
import ReactPaginate from 'react-paginate';

class IncidentListComponent extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			incidents:[],
			rawIncidents:[],
			offSet: 5,
			perPage: 5,
			pageCount: 0,
			currentPage:0
		}
		this.createIncident = this.createIncident.bind(this);
		
	}

	componentDidMount(){
		IncidentService.listUnsolvedIncidents().then((res) =>{
			var data = res.data;
			var slice = data.slice(this.state.offSet, this.state.offSet + this.state.perPage)
			
			this.setState({
				incidents: slice,
				pageCount: Math.ceil(data.length/this.state.perPage),
				rawIncidents: res.data
			});
		})
	}

	loadMoreData(){
		const data = this.state.rawIncidents;

		const slice = data.slice(this.state.offSet, this.state.offSet + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length/this.state.perPage),
			publications: slice
		})
	}

	createIncident(){
		if(AuthService.isAuthenticated()){
			this.props.history.push('/incident-create')
		}else{
			this.props.history.push('/login')
		}
	}

	render(){
		return (
			<div>
				<br></br>
				<br></br>
				<h2 className="text-center">  Incidents </h2>
				{/*Boton a formulario*/}
					<h4 className="text-center"> Tell us about the incident you found and we'll do out best to help  </h4>	
					<div className="row">
						<button className="Button" onClick={this.createIncident}> Send Incident </button>
					</div>
				{/*Listado incidencias sin resolver*/}
				{AuthService.isAuthenticated() ?
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
				}

				<ReactPaginate previousLabel={"prev"}
         			nextLabel={"next"}
          			breakLabel={"..."}
          			breakClassName={"break-me"}
         	 		pageCount={this.state.pageCount}
          			marginPagesDisplayed={2}
          			pageRangeDisplayed={5}
          			onPageChange={this.handlePageClick}
          			containerClassName={"pagination"}
          			subContainerClassName={"pages pagination"}
          			activeClassName={"active"} />
			</div>
		);
	}
}

export default IncidentListComponent;