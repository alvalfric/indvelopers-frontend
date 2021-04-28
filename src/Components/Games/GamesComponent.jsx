import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import ReactPaginate from 'react-paginate';

class GamesComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      games: [],
      rawGames: [],
      offset: 0,
      perPage: 10,
      pageCount: 0,
      currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.createGame = this.createGame.bind(this);
    this.MyOwnedGames = this.MyOwnedGames.bind(this);
    this.MyCreatedGames = this.MyCreatedGames.bind(this);
    this.MyFollowedGames = this.MyFollowedGames.bind(this);
    this.ListGamesToRevise = this.ListGamesToRevise.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    const data = this.state.rawGames;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      games: slice
    })
  }
  componentDidMount() {
    GameService.findVerified().then(data => {
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        games: slice,
        pageCount: Math.ceil(data.length / this.state.perPage),
        rawGames: data
      })
    })

  }

  createGame() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push('/game-Create')
    } else {
      this.props.history.push('/login')
    }

  }
  MyOwnedGames() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push('/purchased-games')
    } else {
      this.props.history.push('/login')
    }

  }

  MyCreatedGames() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push('/my-games')
    } else {
      this.props.history.push('/login')
    }
  }

  MyFollowedGames(){
    if(AuthService.isAuthenticated()){
      this.props.history.push('/followedGames')
    }else{
      this.props.history.push('/login')
    }
  }

  editGame(id) {
    GameService.getGameById(id).then(res => {
      this.props.history.push(`/game-View/${id}`);
    })
    console.log('game => ' + JSON.stringify(id))
  }

  ListGamesToRevise() {
    if (AuthService.isAuthenticated()) {
      GameService.findGamesToRevise().then(res => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(res.length / this.state.perPage),
          games: slice,
          rawGames: res
        })
      })
    } else {
      this.props.history.push('/login')
    }
  }


  render() {
    return (
      <div className='container'  >
        <h1 style={{ paddingTop: '5%' }}>Game List</h1>
        <div className="row">
          <button className="Button" onClick={this.createGame}>Create game</button>
          <button className="Button" onClick={this.MyOwnedGames} style={{ marginLeft: "10px" }}>My purchased games</button>
          <button className="Button" onClick={this.MyCreatedGames} style={{ marginLeft: "10px" }}> My created games</button>
          <button className="Button" onClick={this.MyFollowedGames} style={{marginLeft:"10px"}}>Followed games</button>
          {AuthService.isAuthenticated() ?
            AuthService.getUserData().roles.includes("ADMIN") ?
              <React.Fragment>
                <button onClick={this.componentDidMount} className="AdminButton" style={{ marginLeft: "10px" }}>Checked games</button>
                <button onClick={this.ListGamesToRevise} className="AdminButton" style={{ marginLeft: "10px" }}>Games to check</button>
              </React.Fragment>
              : null
            : null
          }
        </div>
        <br />
        <div>
          {this.state.games.map((item) =>
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

                      <button onClick={() => this.editGame(item.id)} className="ModifyButton float-right">Details</button>
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

export default GamesComponent;