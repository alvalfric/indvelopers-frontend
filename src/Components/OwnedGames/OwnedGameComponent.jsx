import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import OwnedGameService from '../../Services/OwnedGameService';
import portada from '../../assets/JuegoPortada.jpg';
import {PaypalService} from '../../Services/PaypalService';
import paypal from 'paypal-checkout';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, Form, FormText, Row,Image } from 'react-bootstrap';

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
        this.setState({acceptedPurchase: !this.state.acceptedPurchase})
    }
    
    componentDidMount(){
        OwnedGameService.CheckGameOwned(this.state.id).then((res)=>{
            this.setState({isBought:res.data})
        })
        if(this.state.isBought){
            this.props.history.push(`/game-View/${this.state.id}`);
        }else{
        GameService.getGameById(this.state.id).then((res)=>{
            this.setState({game:res.data});
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

                 <Form>
                    <br/>
                    <br/>
                    <br/>
                    <Col>
                <Row><h2>Finalize purchase</h2>
                <h4 style={{color:"#838383"}}>_______________________________________________________________________________________________________</h4>
                </Row>
                <br/>
                <Row>
                    <Col>
                    <Image width="100%" height="65%" src={"data:image/png;base64," + this.state.game.imagen}   alt="Game cover" style={{ maxWidth: '800px', maxHeight: '800px', marginBottom: '20px' }}/>
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
                    </Col>
                    <Col>
                    
                <Row><h4 style={{color:"#838383"}}>Price:{this.state.game.price} €</h4></Row>
                <Row><h4 style={{color:"#838383"}}>Discount: {this.state.game.discount*100}%</h4></Row>
                <Row><h4 style={{color:"#838383"}}>______________________________________________</h4></Row>
                <Row><h4 style={{color:"#838383"}}>total:{(this.state.game.price-this.state.game.discount*this.state.game.price).toFixed(2)} €</h4></Row>
                <Row><h3>Purchase method</h3></Row>
                <Row><h4>Paypal</h4></Row>
                
                <Row> <input type="checkbox" defaultChecked={this.state.acceptedPurchase} onClick={this.changeConfirmHandler} />
                 <label style={{color:"#838383"}}>Click here to finalize your purchase</label></Row>
                {this.state.AcceptMessage?(<div className="ValidatorMessage">{this.state.AcceptMessage}</div>) : null} 
              
              
                <Button variant="outline-success"  onClick={()=>this.purchaseGame(this.state.id)}>Finalize purchase</Button>
                
                    </Col>
                </Row>
                </Col>
                </Form>
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