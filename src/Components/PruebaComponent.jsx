import React, { Component } from 'react';
import PruebaService from '../Services/PruebaService';

class PruebaComponent extends Component {
    
    constructor(props){
        super(props)

        this.state={
            Prueba :''
        }
    }

    componentDidMount(){
        PruebaService.communicate().then((res)=>{
            this.setState({Prueba:res.data});
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3>{Prueba}</h3>
                </div>
            </React.Fragment>
        );
    }
}

export default PruebaComponent;