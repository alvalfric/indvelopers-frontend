import React, { Component } from 'react';
import {SubscriptionService} from '../../Services/SubscriptionService';
import portada from '../../assets/InDvelopersLogo.png';
import {AuthService} from '../../Services/AuthService';
import {PaypalService} from '../../Services/PaypalService';

class BuySubscriptionComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            acceptedPurchase:false,
            AcceptMessage:""
        }
        this.buySubscription=this.buySubscription.bind(this);
        this.changeConfirmHandler=this.changeConfirmHandler.bind(this);
    }
    buySubscription(){
        const isValid=this.validate();
        if(isValid){
            // SubscriptionService.buySubscription().then(()=>{
            //     this.props.history.push("/me")
            // })
            PaypalService.paySubscription().then(paypalUrl=>{
                window.open(paypalUrl,"paypal",true)
                this.props.history.push("/wait")
            })
        }

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
    changeConfirmHandler= (event)=>{
        this.setState({acceptedPurchase: event.target.value})
    }

    getDetails=()=>{
        return(
            <React.Fragment>
                <br/>
                <br/>
                
                <h2>Finalizar compra</h2>
                <h4 style={{color:"#838383"}}>_______________________________________________________________________________________________________</h4>
                <div className="gridContainer">
                <div className="sidenav">
                <img src={portada}  style={{display:"block"}}/>
                <div style={{marginRight:"30%"}}>
                 <br/>
                   <div className="w3-card-4" >
                  <header className="w3-container ">
                  <img/>
                  <h5>Description</h5>
                  </header>

                  <div className="w3-container">
                  <p>Subscripcion a inDvelopers</p>
                  </div>
                  </div>
                 </div>
                </div >
                <div className="sidenav2">
                <h4 style={{color:"#838383"}}>Precio:7.99 €</h4>
                <h4 style={{color:"#838383"}}>______________________________________________</h4>
                <h4 style={{color:"#838383"}}>total:7.99 €</h4>
                <h3>Método de pago</h3>
                <h4>Paypal</h4>
                <div class="custom-control custom-checkbox">
                 <input type="checkbox" onClick={this.changeConfirmHandler} />
                 <label style={{color:"#838383"}}>Haz click para confirmar tu compra</label>
                {this.state.AcceptMessage?(<div className="ValidatorMessage">{this.state.AcceptMessage}</div>) : null} 
              </div>
              
                <button className="AceptButton"  onClick={this.buySubscription}>Finalizar compra</button>
                </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
                <React.Fragment>
                    {AuthService.isAuthenticated()?
                     this.getDetails()   
                     :
                     this.props.history.push('/login')
                    }           
            </React.Fragment>
        );
    }
}

export default BuySubscriptionComponent;