import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';

class OfferGamesComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            followingGames:[],
            games:[],
            offset: 0,
            perPage: 10,
            pageCount: 0,
            currentPage: 0
        }
    this.editGame=this.editGame.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this);
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
          currentPage: selectedPage,
          offset: offset
        }, () => {
          this.loadMoreData()
        })
      }
      loadMoreData() {
        const data = this.state.followingGames;
    
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          games: slice
        })
      }

    componentDidMount(){
        GameService.findGamesWithDiscount().then(data=>{
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
           this.setState({
        games: slice,
        pageCount: Math.ceil(data.length / this.state.perPage),
        followingGames: data
      })
        })
    }
    editGame(id) {
        GameService.getGameById(id).then(res => {
          this.props.history.push(`/game-View/${id}`);
        })
        console.log('game => ' + JSON.stringify(id))
      }
    render() {
        return (
            <React.Fragment>
                <div className='container'  >
        <h1 style={{ paddingTop: '5%' }}>Offers</h1>
        <div className="row">

        </div>
        <br />
        <div>
          {this.state.followingGames.map((item) =>
            <div className="pb-4">
              <div className="w3-card-4">
                <div className="w3-container">
                  <div className="container">
                    <img className="p-5" src={"data:image/png;base64," + item.imagen} style={{ display: "block" }} width="400" height="300" />
                    <h4>{item.title}</h4>
                  </div>
                  <div className="w3-container p-3">
                    <p class="card-text">

                      <strike> {item.price}</strike>€ <p>{(item.price-(item.price*item.discount)).toFixed(2)}€</p>
                      <button onClick={() => this.editGame(item.id)} className="ModifyButton float-right">Details</button>
                    </p>
                    <p>Discount: {item.discount*100}%</p>
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
            </React.Fragment>
        );
    }
}

export default OfferGamesComponent;