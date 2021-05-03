import React, { Component } from 'react';
import {PaypalService} from '../../Services/PaypalService';

class SuccessSubscriptionPaymentComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            payerId:"",
            paymentId:""
        }
        this.endPurchase=this.endPurchase.bind(this);
    }

    componentDidMount(){
        this.setState({payerId:new URLSearchParams(window.location.search).get('PayerID')})
    this.setState({paymentId:new URLSearchParams(window.location.search).get('paymentId')})
    }
    endPurchase=(e)=>{
        e.preventDefault()
        PaypalService.SuccessSubscription(this.state.paymentId,this.state.payerId).then(res=>{
            window.close()
        })
    }
    render() {
        return (
            <React.Fragment>
                <br/>
            <br/>
            <br/>
            <br/>
            <div>
                
                <h1 style={{textAlign:"center"}}>Payment was successful</h1>
                <h2 style={{textAlign:"center"}}>Click on the button to finish the process</h2>
                <br/>
                <p style={{textAlign:"center"}}><button className="AceptButton"   onClick={(e)=>this.endPurchase(e)}>Finalize purchase</button></p>
            </div>
            </React.Fragment>
        );
    }
}

export default SuccessSubscriptionPaymentComponent;