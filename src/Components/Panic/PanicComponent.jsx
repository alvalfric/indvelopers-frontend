import React, { Component } from 'react';
import logo from '../../assets/brokenController.png';

class PanicComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            error:""
        }
    }
    render() {
        return (
            <div>
                <br/>
                <h1 className="PanicTitle">Ups!</h1>
                <p className="PanicLogo"><img  src={logo}/></p>
                <h5 className="PanicText">Something wrong happened</h5>
                <p className="PanicText"> Wait a couple of minutes and try again</p>
            </div>
        );
    }
}

export default PanicComponent;