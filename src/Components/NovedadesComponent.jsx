import React, { Component} from 'react';
import { GameService } from '../Services/GameService';
//import { GameService } from '../../Services/GameService';


class NovedadesComponent extends Component{

	constructor(props){
		
		super(props)
		this.state={
			topGamesAllTime:[],
			rawTop:[],
			topNewGames:[],
			rawNew:[],
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(){
		GameService.getTopGames().then((res)=>{
			var slice = res.slice(0,10)
			this.setState({
				topGamesAllTime: slice,
				rawTop: res})
		})
		
		GameService.getNewGames().then((res)=>{
			var slice = res.slice(0,10)
			this.setState({
				topNewGames:slice,
				rawNew:res
			})
		})
		
	}

	render(){
		return(
			<div>
				<br></br>
				<br></br>
				<h1 className="text-center" style={{paddingTop:'5%'}}>Top Juegos</h1>

				<div>
					{this.state.topGamesAllTime.map((item) =>
					 <div className="pb-4">
                            <div className="w3-card-4">
                              <div className="w3-container">
                                <div className="container">
                                  <img className="p-5" src={"data:image/png;base64,"+item.imagen} style={{ width: "100%", display: "block" }} />
                                    <h4>{ item.title }</h4>
                                </div>
                                <div className="w3-container p-3"> 
                                    <p class="card-text">

                                      Price: { item.price }€

                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
					)}
				</div>

				<h1 className="text-center" style={{paddingTop:'5%'}}>Juegos Nuevos</h1>
				<div>
					{this.state.topNewGames.map((item) =>
					 <div className="pb-4">
                            <div className="w3-card-4">
                              <div className="w3-container">
                                <div className="container">
                                  <img className="p-5" src={"data:image/png;base64,"+item.imagen} style={{ width: "100%", display: "block" }} />
                                    <h4>{ item.title }</h4>
                                </div>
                                <div className="w3-container p-3"> 
                                    <p class="card-text">

                                      Price: { item.price }€

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

export default NovedadesComponent;