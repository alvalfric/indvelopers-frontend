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
				<h1> Following Games</h1>
				<div>
					{this.state.followedGames.map((item)=>
						// <div className="pb-4">
              			// 	<div className="w3-card-4">
                		// 		<div className="w3-container">
                  		// 			<div className="container">
                    	// 				<img className="p-5" src={"data:image/png;base64," + item.imagen} style={{ display: "block" }} style={{ maxWidth: '500px', maxHeight: '250px' }} />
                    	// 				<h4>{item.title}</h4>
                  		// 			</div>
                  		// 			<div className="w3-container p-3">
                    	// 				<p class="card-text">
						// 					Price: {item.price}€

						// 					<button onClick={() => this.getGame(item.id)} className="ModifyButton float-right">Details</button>
						// 				</p>
                  		// 			</div>
               			//  		</div>
              			// 	</div>
            			// </div>
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
