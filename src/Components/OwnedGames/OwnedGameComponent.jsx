import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import OwnedGameService from '../../Services/OwnedGameService';
import portada from '../../assets/JuegoPortada.jpg';
import {PaypalService} from '../../Services/PaypalService';
import paypal from 'paypal-checkout';

class OwnedGameComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            acceptedPurchase:false,
            game:"",
            AcceptMessage:"",
            isBought:false
        }
        this.changeConfirmHandler=this.changeConfirmHandler.bind(this);
        this.purchaseGame=this.purchaseGame.bind(this);

    }
    changeConfirmHandler= (event)=>{
        this.setState({acceptedPurchase: event.target.value})
    }
    
    componentDidMount(){
        OwnedGameService.CheckGameOwned(this.state.id).then((res)=>{
            this.setState({isBought:res.data})
        console.log("isBought=>"+ JSON.stringify(this.state.isBought))
        })
        if(this.state.isBought){
            this.props.history.push(`/game-View/${this.state.id}`);
        }else{
        GameService.getGameById(this.state.id).then((res)=>{
            this.setState({game:res.data});
            console.log("PRECIO====>"+JSON.stringify(this.state.game.price))
        })
    }
    }
    validate=()=>{
        let AcceptMessage="";
        if(!this.state.acceptedPurchase){
            AcceptMessage="You must agree to the purchase before continuing"
        }
        this.setState({AcceptMessage})
        if(AcceptMessage){
            return false;
        }else{
            return true;
        }
    }
    purchaseGame(id){
        const isValid = this.validate();
        if(isValid){
            if(this.state.game.price==0 || this.state.game.price==0.0 || this.state.game.price==undefined){

            OwnedGameService.buyGame(id).then(()=>{
                this.props.history.push("/games");
            })

            }else{
            PaypalService.summary(id).then(order=>{
                
                PaypalService.payment(order).then(code=>{
                    
                    window.open(code,"paypal",true)
                    this.props.history.push("/wait")
                    
                })
            })
            }
        }
    }

    getDetails=()=>{
        return(
        <React.Fragment>
            <br/>
                <br/>
                
                <h2>Finalize purchase</h2>
                <h4 style={{color:"#838383"}}>_______________________________________________________________________________________________________</h4>
                <div className="gridContainer">
                <div className="sidenav">
                <img src={"data:image/png;base64," + this.state.game.imagen}  style={{display:"block"}} width="400" height="300" />
                <div style={{marginRight:"30%"}}>
                 <br/>
                   <div className="w3-card-4" >
                  <header className="w3-container ">
                  <img/>
                  <h5>Description</h5>
                  </header>

                  <div className="w3-container">
                  <p>{this.state.game.description}</p>
                  </div>
                  </div>
                 </div>
                </div >
                <div className="sidenav2">
                <h3>Game title</h3>
                <h3>{this.state.game.title}</h3>
                <h4 style={{color:"#838383"}}>Price:{this.state.game.price} €</h4>
                <h4 style={{color:"#838383"}}>Discount:0€</h4>
                <h4 style={{color:"#838383"}}>______________________________________________</h4>
                <h4 style={{color:"#838383"}}>total:{this.state.game.price} €</h4>
                <h3>purchase method</h3>
                <h4>Paypal</h4>
                <div class="custom-control custom-checkbox">
                 <input type="checkbox" value={this.state.acceptedPurchase} onClick={this.changeConfirmHandler} />
                 <label style={{color:"#838383"}}>Click here to finalize your purchase</label>
                {this.state.AcceptMessage?(<div className="ValidatorMessage">{this.state.AcceptMessage}</div>) : null} 
              </div>
              
                <button className="AceptButton"  onClick={()=>this.purchaseGame(this.state.id)}>Finalize purchase</button>
                </div>
                </div>
        </React.Fragment>
        )
    }
    render() {
        return (
            <div>
                {this.state.isBought?(
                    this.props.history.push(`/game-View/${this.state.id}`)
                ):
                this.getDetails()
                }
            </div>
        );
    }
}

export default OwnedGameComponent;