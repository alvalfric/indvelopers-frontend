import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import Card from 'react-bootstrap/Card';
import altLogo from '../../assets/Game-Controller-Logo-Design.jpg';
import Button from 'react-bootstrap/Button';

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
        } else {
            this.props.history.push('/login')
        }
    }

    componentDidMount() {

        GameService.findAllMyCreatedGames().then((res) => {
            this.setState({myCreatedGames:res.data});
            
            let myg = {myCreatedGames: this.state.myCreatedGames};
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
                // <div className="pb-4">
                //     <div className="w3-card-4">
                //         <div className="w3-container">
                //         <div className="card-header bg-transparent"> 
                //             <h5 className="w3-container pt-2">{ game.title }</h5>
                //         </div>
                //         <div className="w3-container p-3"> 
                //             <p class="card-text">
                //                 <img src={"data:image/png;base64,"+game.imagen} style={{ marginRight: "50px"}} style={{ maxWidth: '500px', maxHeight: '250px' }} />
                //                 Description: { game.description }
                //                 <button onClick={() => this.editGame(game.id)} className="ModifyButton float-right mt-2">Details</button>
                //             </p>
                //         </div>
                //     </div>
                // </div>
                // </div>
                <div className="pb-4">
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
                       <Button onClick={() => this.editGame(game.id)} style={{justifyContent:"right" ,textAlign:"right",display:"flex", position:"bottom"}} variant="outline-primary">Details</Button>
    </Card.ImgOverlay>
  </Card>
            </div>
                )}
                </div>      
            </div>
        );
    }
}

export default ListMyGamesComponent;