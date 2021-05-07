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
            //     <div className="pb-4">
            //     <div className="w3-card-4">
            //     <div className="w3-container">
            //         <div className="card-header bg-transparent"> 
            //             <h5 className="w3-container pt-2">{ game.title }</h5>
            //         </div>
            //         <div className="w3-container p-3"> 
            //             <p class="card-text">
            //                 <img src={"data:image/png;base64,"+game.imagen} style={{ marginRight: "50px"}} style={{ maxWidth: '500px', maxHeight: '250px' }} />
            //                 Description: { game.description }
            //                 <button className="ModifyButton float-right" onClick={(e)=>this.downloadGame(e,game.idCloud)}>Download</button>
            //             </p>
            //         </div>
            //         </div>
            //     </div>
            // </div>
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