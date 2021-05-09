import React, { Component } from 'react';
import { GameService } from '../Services/GameService';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import altLogo from '../assets/Game-Controller-Logo-Design.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, FormText, Row,ListGroup } from 'react-bootstrap';


class NovedadesComponent extends Component {

	constructor(props) {

		super(props)
		this.state = {
			topGamesAllTime: [],
			rawTop: [],
			topNewGames: [],
			rawNew: [],
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		GameService.getTopGames().then((res) => {
			var slice = res.slice(0, 10)
			this.setState({
				topGamesAllTime: slice,
				rawTop: res
			})
		})

		GameService.getNewGames().then((res) => {
			var slice = res.slice(0, 10)
			this.setState({
				topNewGames: slice,
				rawNew: res
			})
		})

	}

	editGame(id) {
		GameService.getGameById(id).then(res => {
			this.props.history.push(`/game-View/${id}`);
		})
	}

	render() {
		return (
			<div>
				<br></br>
				<br></br>
				<h1 className="text-center" style={{ paddingTop: '5%' }}>Top Games</h1>

				<Carousel>
					{this.state.topGamesAllTime.map((item) =>
					<Carousel.Item onClick={() => this.editGame(item.id)}>
						{/* <div className="pb-4">
							<div className="w3-card-4">
								<div className="w3-container">
									<div className="container">
										<img className="p-5" src={"data:image/png;base64," + item.imagen} style={{ display: "block" }} width="400" height="300" />
										<h4>{item.title}</h4>
									</div>
									<div className="w3-container p-3">
										<p class="card-text">

											Price: {item.price}€

									  <button onClick={() => this.editGame(item.id)} className="ModifyButton float-right">Details</button>
										</p>
									</div>
								</div>
							</div>
						</div> */}
						 <Card className="bg-dark text-white" style={{maxWidth:'1200px', maxHeight: '500px',justifyContent:"center",display:"flex"}} >
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
  </Card.ImgOverlay>
</Card>
						</Carousel.Item>
					)}
				</Carousel>

				<h1 className="text-center" style={{ paddingTop: '5%' }}>New Games</h1>
				<Carousel>
					{this.state.topNewGames.map((item) =>
					<Carousel.Item onClick={() => this.editGame(item.id)}>
						{/* <div className="pb-4">
							<div className="w3-card-4">
								<div className="w3-container">
									<div className="container">
										<img className="p-5" src={"data:image/png;base64," + item.imagen} style={{ display: "block" }} width="400" height="300" />
										<h4>{item.title}</h4>
									</div>
									<div className="w3-container p-3">
										<p class="card-text">

											Price: {item.price}€

									  <button onClick={() => this.editGame(item.id)} className="ModifyButton float-right">Details</button>
										</p>
									</div>
								</div>
							</div>
						</div> */}
						 <Card className="bg-dark text-white" style={{maxWidth:'1200px', maxHeight: '500px',justifyContent:"center",display:"flex"}} >
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
  </Card.ImgOverlay>
  
</Card>

						</Carousel.Item>
					)}
				</Carousel>
				
			</div>
		);
	}

}

export default NovedadesComponent;