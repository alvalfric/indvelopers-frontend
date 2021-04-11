import React, { Component } from 'react';
import OwnedGameService from '../../Services/OwnedGameService';
import {CloudService} from '../../Services/CloudService';

class ListOwnedGamesComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            myGames:[]
        }
        this.downloadGame=this.downloadGame.bind(this);
    }

    componentDidMount(){
        OwnedGameService.findAllMyOwnedGames().then((res)=>{
            this.setState({myGames:res.data});
        })
    }
    downloadGame=(e,id)=>{
        e.preventDefault()
        CloudService.downloadFile(id).then(res=>{
            const FileDownload = require('js-file-download')
            FileDownload(res,'game.zip')
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
                            <button className="ModifyButton" onClick={(e)=>this.downloadGame(e,game.idCloud)}>Descargar</button>
                        </p>
                    </div>
                </div>
            </div>)}
            </div>
        );
    }
}

export default ListOwnedGamesComponent;