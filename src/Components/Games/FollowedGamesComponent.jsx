import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import altLogo from '../../assets/Game-Controller-Logo-Design.jpg';
import Button from 'react-bootstrap/Button';

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
				<h1> Followed developer's games</h1>
				<div>
					{this.state.followedGames.map((item)=>
						<div className="pb-4">
						<br/>
					  <Card className="bg-dark text-white" style={{maxWidth:'600px', maxHeight: '500px',justifyContent:"center",display:"flex"}} >
				  {item.imagen ?
					<Card.Img src={"data:image/png;base64," + item.imagen} alt="Game cover" style={{ maxHeight: '500px'}}/>
				   
			   :
			   <Card.Img src={altLogo} style={{ maxHeight: '500px'}}/>
			   }
			<Card.ImgOverlay>
			  <Card.Title>{item.title}</Card.Title>
						{item.discount!=0.?(
								  <React.Fragment>
									Price:<strike> {item.price}</strike>€ ({item.discount*100} %)
									<br/>
									{(item.price-item.price*item.discount).toFixed(2)}€
								  </React.Fragment>
								):
								<React.Fragment>
								  Price: {item.price}€
								</React.Fragment>
							  }
							   <Button onClick={() => this.getGame(item.id)} style={{justifyContent:"right" ,textAlign:"right",display:"flex", position:"bottom"}} variant="outline-primary">Details</Button>
			</Card.ImgOverlay>
		  </Card>
					</div>
					)}
				</div>

			</div>
		);
	}
}

export default FollowedGamesComponent;
