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
                <h1>My created games</h1>
                <br/>
                <div>
                {this.state.myCreatedGames.map(game=>
                <div className="pb-4">
                    <div className="w3-card-4">
                        <div className="w3-container">
                        <div className="card-header bg-transparent"> 
                            <h5 className="w3-container pt-2">{ game.title }</h5>
                        </div>
                        <div className="w3-container p-3"> 
                            <p class="card-text">
                                <img src={"data:image/png;base64,"+game.imagen} style={{ width: "10%", height: "10%", marginRight: "50px"}} />
                                Description: { game.description }
                                <button onClick={() => this.editGame(game.id)} className="ModifyButton float-right mt-2">Details</button>
                            </p>
                        </div>
                    </div>
                </div>
                </div>)}
                </div>      
            </div>
        );
    }
}

export default ListMyGamesComponent;