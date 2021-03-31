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
                <p className="PanicLogo"><img src={logo}/></p>
                <h5 className="PanicText">Parece que ha habido un problema</h5>
                <p className="PanicText"> Espere unos minutos y vuelva a intentarlo</p>
            </div>
        );
    }
}

export default PanicComponent;