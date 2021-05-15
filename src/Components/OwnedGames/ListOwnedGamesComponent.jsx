import React, { Component } from 'react';
import OwnedGameService from '../../Services/OwnedGameService';
import {CloudService} from '../../Services/CloudService';
import Card from 'react-bootstrap/Card';
import altLogo from '../../assets/Game-Controller-Logo-Design.jpg';
import Button from 'react-bootstrap/Button';

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
            <React.Fragment>
                <br/>
                 <Card className="bg-dark text-white" style={{maxWidth:'600px', maxHeight: '500px',justifyContent:"center",display:"flex"}} >
      {game.imagen ?
        <Card.Img src={"data:image/png;base64," + game.imagen} alt="Game cover" style={{ maxHeight: '500px'}}/>
       
   :
   <Card.Img src={altLogo} style={{ maxHeight: '500px'}}/>
   }
<Card.ImgOverlay>
  <Card.Title>{game.title}</Card.Title>
            {game.discount!=0.?(
                      <React.Fragment>
                        Price:<strike> {game.price}</strike>€ ({game.discount*100} %)
                        <br/>
                        {(game.price-game.price*game.discount).toFixed(2)}€
                      </React.Fragment>
                    ):
                    <React.Fragment>
                      Price: {game.price}€
                    </React.Fragment>
                  }
                   <Button onClick={(e)=>this.downloadGame(e,game.idCloud)} style={{justifyContent:"right" ,textAlign:"right",display:"flex", position:"bottom"}} variant="primary">Download</Button>
</Card.ImgOverlay>
</Card>
            </React.Fragment>
            )}
            </div>
            </div>
        );
    }
}

export default ListOwnedGamesComponent;