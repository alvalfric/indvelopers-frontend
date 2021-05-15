import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import altLogo from '../../assets/Game-Controller-Logo-Design.jpg';
import Button from 'react-bootstrap/Button';

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
                   <Button onClick={() => this.editGame(item.id)} style={{justifyContent:"right" ,textAlign:"right",display:"flex", position:"bottom"}} variant="outline-primary">Details</Button>
</Card.ImgOverlay>
</Card>
        </div>
          )}
        </div>
        <div style={{justifyContent:"center",display:"flex"}}>
        <ReactPaginate 
         previousLabel={"prev"}
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
      </div>
            </React.Fragment>
        );
    }
}

export default OfferGamesComponent;