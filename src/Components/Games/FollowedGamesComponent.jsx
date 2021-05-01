import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';


class FollowedGamesComponent extends Component {
	
	
	constructor(props){
		super(props)
		this.state = {
			followedGames:[],		
		}
	
	}
	
	componentDidMount(){
		GameService.findGamesByDeveloperFollowed().then((res)=>{
			console.log(res)
			this.setState({followedGames:res.data})
		})
	}

	getGame(id){
		GameService.getGameById(id).then(res => {
			this.props.history.push(`/game-View/${id}`);
		})
	}
	
	render(){
		return(
			<div>
				<br/>
				<br/>
				<h1> Following Games</h1>
				<div>
					{this.state.followedGames.map((item)=>
						<div className="pb-4">
              				<div className="w3-card-4">
                				<div className="w3-container">
                  					<div className="container">
                    					<img className="p-5" src={"data:image/png;base64," + item.imagen} style={{ display: "block" }} width="400" height="300" />
                    					<h4>{item.title}</h4>
                  					</div>
                  					<div className="w3-container p-3">
                    					<p class="card-text">
											Price: {item.price}€

											<button onClick={() => this.getGame(item.id)} className="ModifyButton float-right">Details</button>
										</p>
                  					</div>
               			 		</div>
              				</div>
            			</div>
					)}
				</div>

			</div>
		);
	}
}

export default FollowedGamesComponent;
