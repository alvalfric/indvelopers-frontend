import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';


class FollowedGamesComponent extends Component {
	
	
	constructor(props){
		super(props)
		this.state = {
			followedGames:[],
			rawGames:[],
			offset:[],
			perPage:10,
			pageCount:0,
			currentPage:0
		}
		this.handlePageClick = this.handlePageClick.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	
	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;

		this.setState({
			currentPage: selectedPage,
			offset: offset
		}, () =>{
			this.loadMoreData()
		})
	}

	loadMoreData(){
		const data = this.state.rawGames;

		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length/this.state.perPage),
			followedGames: slice
		})
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
										</p>
                  					</div>
               			 		</div>
              				</div>
            			</div>
					)}
				</div>
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

export default FollowedGamesComponent;
