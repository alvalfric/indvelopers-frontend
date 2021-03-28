import React, { Component } from 'react';
import PruebaService from '../Services/PruebaService';

class PruebaComponent extends Component {
    
    constructor(props){
        super(props)

        this.state={
            Prueba :'',
            Lista :[]
        }
    }

    componentDidMount(){
        PruebaService.communicate().then((res)=>{
            this.setState({Prueba: res.data});
        });
        PruebaService.ListPrueba().then((res)=>{
            this.setState({Lista: res.data})
        });
    }
    render() {
        return (
            <React.Fragment>
                
                <div className="container">
                    <h3>{this.state.Prueba}</h3>
                </div>
                <h2>Listado de prueba desde Spring</h2>
                <table className="table table-stripped table bordered">
                    <thead>
                       <tr>
                         <th>Text</th>
                         <th>Number</th>  
                        </tr> 
                    </thead>
                    <tbody>
                      {
                      this.state.Lista.map(e=>
                        <tr key={e.id}>
                        <td>{e.text}</td> 
                        <td>{e.number}</td>   
                        </tr>)    
                      }  
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default PruebaComponent;