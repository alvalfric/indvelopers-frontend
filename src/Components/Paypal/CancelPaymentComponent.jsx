import React, { Component } from 'react';

class CancelPaymentComponent extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        return (
            <React.Fragment>
                
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                
                <h1 style={{textAlign:"center"}}>The payment has been canceled</h1>
                <h2 style={{textAlign:"center"}}>You may close this window</h2>
                
                <br/>
            </div>
            </React.Fragment>
        );
    }
}

export default CancelPaymentComponent;