import React, { Component } from 'react';
import {SubscriptionService} from '../../Services/SubscriptionService';
import portada from '../../assets/InDvelopersLogo.png';
import {AuthService} from '../../Services/AuthService';
import {PaypalService} from '../../Services/PaypalService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, Form, FormText, Row,Image } from 'react-bootstrap';

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
        this.setState({acceptedPurchase: !this.state.acceptedPurchase})
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
                    <Image width="100%" height="35%" src={portada}  alt="inDvelopersLogo" style={{ maxWidth: '800px', maxHeight: '800px', marginBottom: '20px' }}/>
                    <br/>
                    <div className="w3-card-4" >
                  <header className="w3-container ">
                  <img/>
                  <h5 className="TextRes">Description</h5>
                  </header>

                  <div className="w3-container">
                  <p className="TextRes">Subscription to inDvelopers</p>
                  </div>
                  </div>
                    </Col>
                    <Col>
                    
                <Row><h4 className="TextRes" style={{color:"#838383"}}>Price:7.99 ???</h4></Row>
                <Row><h4 className="TextRes" style={{color:"#838383"}}>______________________________________________</h4></Row>
                <Row><h4 className="TextRes" style={{color:"#838383"}}>total:7.99 ???</h4></Row>
                <Row><h3 className="TextRes">Purchase method</h3></Row>
                <Row><h4 className="TextRes">Paypal</h4></Row>
                
                <Row className="TextRes"> <input  type="checkbox" defaultChecked={this.state.acceptedPurchase} onClick={this.changeConfirmHandler} />
                 <label className="TextRes" style={{color:"#838383"}}>Click here to finalize your purchase</label></Row>
                {this.state.AcceptMessage?(<div className="ValidatorMessage">{this.state.AcceptMessage}</div>) : null} 
              
              
                <Button className="ButtonRes" variant="outline-success"  onClick={this.buySubscription}>Finalize purchase</Button>
                
                    </Col>
                </Row>
                </Col>
                </Form>
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