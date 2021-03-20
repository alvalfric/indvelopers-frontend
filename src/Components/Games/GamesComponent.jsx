import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import GameCardComponent from './GameCardComponent';

class GamesComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            games : []
        }
    }

    componentDidMount(){
        GameService.findAll().then(data => {
            this.setState({ games : data })
        })

    }

    render() {
        return (
            <React.Fragment>
                <div className='container' style={{position:"fixed"}}>
                    <h3 style={{paddingTop: '10%'}}>Lista de Juegos</h3> 
                    <div className="row row-cols-1 row-cols-md-4">
                        { this.state.games.map((item) => {
                            return(
                                <GameCardComponent 
                                    game = { item }
                                />
                            )
                        }) }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GamesComponent;