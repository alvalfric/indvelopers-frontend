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
                <div className="card-body">
                    <h5 className="card-title">{ this.props.game.title}</h5>
                </div>
            </div>
            </div>
        );
    }
}

export default GameCardComponent;