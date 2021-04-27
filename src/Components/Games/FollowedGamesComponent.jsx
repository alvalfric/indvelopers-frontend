import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';


class FollowedGamesComponent extends Component {
	
	
	constructor(props){
		super(props)
		this.state={
			followedGames:[],
			rawGames:[],
			offset:[],
			perPage:10,
			pageCount:0,
			currentPage:0
		}
	
	}
	
	componentDidMount(){
		GameService.getFollowedGames().then(data =>{
			var slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
			this.setState({
				followedGames: slice,
				pageCount: Math.ceil(data.length/this.state.perPage),
				rawGames: data
			})
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
						
						<h4>{item.title}</h4>
					
					)}
				</div>
			</div>
		);
	}
}

export default FollowedGamesComponent;
