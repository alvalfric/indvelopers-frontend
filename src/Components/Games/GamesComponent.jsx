import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';
import portada from '../../assets/JuegoPortada.jpg';

class GamesComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            games : [],
            rawGames:[],
            offset:0,
            perPage:10,
            pageCount:0,
            currentPage:0
        }
        this.handlePageClick=this.handlePageClick.bind(this);
        this.createGame = this.createGame.bind(this);
        this.MyOwnedGames=this.MyOwnedGames.bind(this);
    }
    handlePageClick= (e)=>{
        const selectedPage=e.selected;
        const offset=selectedPage*this.state.perPage;
        this.setState({
          currentPage:selectedPage,
          offset: offset
        },()=>{
          this.loadMoreData()
        })
      }
      loadMoreData(){
        const data = this.state.rawGames;
  
        const slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(data.length/this.state.perPage),
          games:slice
        })
      }
    componentDidMount(){
        GameService.findAll().then(data => {
            var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
            this.setState({ games : slice,
            pageCount: Math.ceil(data.length/this.state.perPage),
        rawGames:data})
        })

    }

    createGame(){
        if(AuthService.isAuthenticated()){
          this.props.history.push('/game-Create')
        }else{
          this.props.history.push('/login')
        }
  
      }
      MyOwnedGames(){
        if(AuthService.isAuthenticated()){
            this.props.history.push('/purchased-games')
          }else{
            this.props.history.push('/login')
          }

      }

      editGame(id) {
        if(AuthService.isAuthenticated()) {
            GameService.getGameById(id).then(res => {
                this.props.history.push(`/game-View/${id}`);
            })
            console.log('game => ' + JSON.stringify(id))
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
      return (
        <div className='container'  >
            <h1 style={{paddingTop: '5%'}}>Lista de Juegos</h1>
            <div className="row">
                <button className="Button" onClick={this.createGame}>Crear juego</button>
                
                <button className="Button" onClick={this.MyOwnedGames} style={{marginLeft:"10px"}}>Mis juegos comprados</button>
            </div>
            <br/>
            <div>
                { this.state.games.map((item) =>
                <div className="pb-4">
                    <div className="w3-card-4">
                    <div className="w3-container">
                        <div className="card-header bg-transparent">
                            <h4 className="w3-container pt-2">{ item.title }</h4>
                        </div>
                        <div className="w3-container p-3">
                            <p class="card-text"> 
                              <img src={portada} style={{ width: "10%", height: "10%", marginRight: "50px" }}></img>
                              Price: { item.price }€ 
                              <button onClick={() => this.editGame(item.id)} className="ModifyButton float-right mt-2">Detalles</button>
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                ) }
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
activeClassName={"active"}/>
        </div>
);
    }
}

export default GamesComponent;