import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import GameCardComponent from './GameCardComponent';

class GamesComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            games : []
        }
        this.createGame = this.createGame.bind(this);
    }

    componentDidMount(){
        GameService.findAll().then(data => {
            this.setState({ games : data })
        })

    }

    createGame(){
        if(AuthService.isAuthenticated()){
          this.props.history.push('/game-Create')
        }else{
          this.props.history.push('/login')
        }
  
      }

    render() {
        return (
                <div className='container'  >
                    <h1 style={{paddingTop: '10%'}}>Lista de Juegos</h1>
                    <div className="row">
                        <button className="Button" onClick={this.createGame}>Crear juego</button>
                    </div>
                    <div className="row row-cols-1 row-cols-md-4">
                        { this.state.games.map((item) => {
                            return(
                                <GameCardComponent 
                                    game = { item }
                                />
                            )
                        }) }
                    </div>
                </div>
        );
    }
}

export default GamesComponent;