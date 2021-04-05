import React, { Component } from 'react';
import OwnedGameService from '../../Services/OwnedGameService';

class ListOwnedGamesComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            myGames:[]
        }
    }

    componentDidMount(){
        OwnedGameService.findAllMyOwnedGames().then((res)=>{
            this.setState({myGames:res.data});
        })
    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <h1>Juegos comprados</h1>
                <br/>
            {this.state.myGames.map(game=>
                <div className="col mb-4">
                <div className="card">
                    <div className="card-header bg-success border-primary"> 
                        <h5 className="card-title" class="text-dark">{ game.title }</h5>
                    </div>
                    <div className="card-body"> 
                        <p class="card-text" className="text-muted">{ game.description } </p>
                        <p>
                            <button className="ModifyButton">Descargar(Próximamente)</button>
                        </p>
                    </div>
                </div>
            </div>)}
            </div>
        );
    }
}

export default ListOwnedGamesComponent;