import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import OwnedGameService from '../../Services/OwnedGameService';

class OwnedGameComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            acceptedPurchase:false,
            game:"",
            AcceptMessage:""
        }
        this.changeConfirmHandler=this.changeConfirmHandler.bind(this);
        this.purchaseGame=this.purchaseGame.bind(this);

    }
    changeConfirmHandler= (event)=>{
        this.setState({acceptedPurchase: event.target.value})
    }
    componentDidMount(){
        GameService.getGameById(this.state.id).then((res)=>{
            this.setState({game:res.data});
            console.log('game => ' + JSON.stringify(this.state.game));
        })
    }
    validate=()=>{
        let AcceptMessage="";
        if(!this.state.acceptedPurchase){
            AcceptMessage="Debes hacer click para finalizar la compra"
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
            OwnedGameService.buyGame(id).then(()=>{
                this.props.history.push("/games");
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Finalizar compra</h2>
                <h3>Titulo del juego</h3>
                <h3>{this.state.game.title}</h3>
                <h4>Precio:{this.state.game.price} €</h4>
                <h4>Descuento:0€</h4>
                <h4>_____________________</h4>
                <h4>total:{this.state.game.price} €</h4>
                <h3>Método de pago</h3>
                <h4>Paypal</h4>
                <div class="custom-control custom-checkbox">
                 <input type="checkbox" onClick={this.changeConfirmHandler} />
                 <label>Haz click para confirmar tu compra</label>
                {this.state.AcceptMessage?(<div className="ValidatorMessage">{this.state.AcceptMessage}</div>) : null} 
              </div>
                <button className="AceptButton"  onClick={()=>this.purchaseGame(this.state.id)}>Finalizar compra</button>
            </div>
        );
    }
}

export default OwnedGameComponent;