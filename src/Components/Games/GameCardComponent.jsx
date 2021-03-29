import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';

class GameCardComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            game: []
        }
        this.editGame = this.editGame.bind(this);
    }

    componentDidMount() {
        GameService.findAll().then((res) => {
            this.setState({ game : res.data })
        })
    }  

    editGame(_id) {
        if(AuthService.isAuthenticated()) {
//          GameService.getGameById(id).then(res => {
//              this.props.history.push(`/game-Update/${id}`);
//          })
            console.log('game => ' + JSON.stringify(_id))
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className="col mb-4">
                <div className="card">
                    <div className="card-header bg-success border-primary"> 
                        <h5 className="card-title" class="text-dark">{ this.props.game.title }</h5>
                    </div>
                    <div className="card-body"> 
                        <p class="card-text" className="text-muted"> Price: { this.props.game.price }€ </p>
                        <p>
                            <button onClick={(game) => this.editGame(game._id)} className="ModifyButton">Modificar juego</button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameCardComponent;