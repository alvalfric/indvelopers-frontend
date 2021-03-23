import React, { Component } from 'react';

class ListPublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            publications:[]
            
        }
    this.createPublication=this.createPublication.bind(this);
    }
    componentDidMount(){

    }
    createPublication(){
        this.props.history.push('/publication-Create')

    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
               <h2 className="text-center">Publicaciones de la comunidad</h2> 
               <div className="row">
                    <button className="btn btn-primary" onClick={this.createPublication}>Publicar</button>
                </div>
            </div>
        );
    }
}

export default ListPublicationComponent;