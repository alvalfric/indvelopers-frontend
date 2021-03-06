import React, { Component } from 'react';
import {useLocation} from 'react-router-dom';
import {PaypalService} from '../../Services/PaypalService'
class SuccessPaymentComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            payerId:"",
            paymentId:"",
            gameId:""

        }
        this.endPurchase=this.endPurchase.bind(this);
        
    }
    componentDidMount(){
     this.setState({payerId:new URLSearchParams(window.location.search).get('PayerID')})
    this.setState({paymentId:new URLSearchParams(window.location.search).get('paymentId')})
    this.setState({gameId:new URLSearchParams(window.location.search).get('gameId') })
    }
    endPurchase=(e)=>{
        e.preventDefault()
        PaypalService.successPay(this.state.paymentId,this.state.payerId,this.state.gameId).then(res=>{
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

export default SuccessPaymentComponent;