import React, { Component } from 'react';

class GameCardComponent extends Component {

    constructor(props){
        super(props)

        this.state={
        }
    }

    render() {
        return (
            <div className="col mb-4">
                <div className="card">
                    <div className="card-header bg-success border-primary"> 
                        <h5 className="card-title" class="text-dark">{ this.props.game.title }</h5>
                    </div>
                    <div className="card-body"> 
                        <p class="card-text" className="text-muted"> Price: { this.props.game.price }€ </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameCardComponent;