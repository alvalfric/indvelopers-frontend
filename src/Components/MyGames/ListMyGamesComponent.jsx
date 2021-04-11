import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';

class ListMyGamesComponent extends Component {
    constructor(props){
        super(props)
        
        this.state={
            myCreatedGames:[]
        }

        this.editGame = this.editGame.bind(this);
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

    componentDidMount() {
        GameService.findAllMyCreatedGames().then((res) => {
            this.setState({myCreatedGames:res.data});
            
            let myg = {myCreatedGames: this.state.myCreatedGames};
            console.log('Myg => ' + JSON.stringify(myg))
        })
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <h1>Mis juegos creados</h1>
                <br/>
                {this.state.myCreatedGames.map(game=>
                <div className="col mb-4">
                <div className="card">
                    <div className="card-header bg-success border-primary"> 
                        <h5 className="card-title" class="text-dark">{ game.title }</h5>
                    </div>
                    <div className="card-body"> 
                        <p class="card-text" className="text-muted">{ game.description } </p>
                        <p>
                            <button onClick={() => this.editGame(game.id)} className="ModifyButton">Detalles</button>
                        </p>
                    </div>
                </div>
            </div>)}            
            </div>
        );
    }
}

export default ListMyGamesComponent;