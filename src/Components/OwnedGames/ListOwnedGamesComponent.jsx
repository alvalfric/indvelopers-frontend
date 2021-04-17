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
                <h1>My purchased games</h1>
                <br/>
                <div>
            {this.state.myGames.map(game=>
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
                            <button className="ModifyButton float-right" onClick={(e)=>this.downloadGame(e,game.idCloud)}>Download</button>
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

export default ListOwnedGamesComponent;