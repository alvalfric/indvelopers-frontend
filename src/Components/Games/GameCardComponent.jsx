import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';

class GameCardComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            game: []
        }
        this.editGame = this.editGame.bind(this);
    }

    componentDidMount() {
        GameService.findAll().then((res) => {
            this.setState({ game : res.data })
        })
    }  

    

    render() {
        return(
            <div></div>
        );
    }
}

export default GameCardComponent;