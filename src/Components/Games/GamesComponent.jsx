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

      editGame(id) {
        if(AuthService.isAuthenticated()) {
            GameService.getGameById(id).then(res => {
                this.props.history.push(`/game-Update/${id}`);
            })
            console.log('game => ' + JSON.stringify(id))
        } else {
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
                        { this.state.games.map((item) =>
                            <div className="col mb-4">
                            <div className="card">
                                <div className="card-header bg-success border-primary"> 
                                    <h5 className="card-title" class="text-dark">{ item.title }</h5>
                                </div>
                                <div className="card-body"> 
                                    <p class="card-text" className="text-muted"> Price: { item.price }€ </p>
                                    <p>
                                        <button onClick={() => this.editGame(item.id)} className="ModifyButton">Detalles</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        ) }
                    </div>
                </div>
        );
    }
}

export default GamesComponent;