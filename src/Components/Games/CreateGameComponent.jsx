import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';

class CreateGameComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            title:"",
            titleError:"",
            description:"",
            descriptionError:"",
            requirements:"",
            requirementsError:"",
            price:"",
        }
        this.saveGame = this.saveGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
    }

    validate =()=>{
        let titleError="";
        let descriptionError="";
        let requirementsError="";
        //let priceError="";
        if(this.state.title.length===0) {
            titleError="The game needs a title";
        }
        if(this.state.description.length===0) {
            descriptionError="The game needs a description"
        }
        if(this.state.requirements.length===0) {
            requirementsError="The game needs a specification of the minimun requirements"
        }

        this.setState({titleError});
        this.setState({descriptionError});
        this.setState({requirementsError});
        //this.setState({priceError});
        if(titleError || descriptionError || requirementsError){
            return false;
        }else{
            return true;
        }
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value})
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value})
    }

    changeRequirementsHandler = (event) => {
        this.setState({requirements: event.target.value})
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value})
    }

    saveGame = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid) {
            //Redirigir a games
            //this.props.history.push('/games');
            if(this.state.price.length===0) {
                this.state.price = 0.0;
            }
            let game = {title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price
                , idCloud: null, isNotMalware: null, creator: null};
            console.log('game => ' + JSON.stringify(game));
            GameService.addGame(game).then(res => {
                this.props.history.push('/games');
            })
        }
    }

    cancel() {
        //Redirigir a games
        this.props.history.push('/games');
    }

    render() {
        return (
            <div>
                <div>
                <br></br>
                <br></br>
                <br></br>
                <h2>Add Game</h2>
                <br></br>
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input placeholder="Title" name="title" className="form-control"
                                value={this.state.title} onChange={this.changeTitleHandler}></input>

                            {this.state.titleError?(<div className="ValidatorMessage">{this.state.titleError}</div>) : null} 
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input placeholder="Description" name="description" className="form-control"
                                value={this.state.description} onChange={this.changeDescriptionHandler}></input>

                            {this.state.descriptionError?(<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Minimum requirements</label>
                            <input placeholder="Requirements" name="requirements" className="form-control"
                                value={this.state.requirements} onChange={this.changeRequirementsHandler}></input>

                            {this.state.requirementsError?(<div className="ValidatorMessage">{this.state.requirementsError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input placeholder="Price" name="price" className="form-control" type="number"
                                value={this.state.price} onChange={this.changePriceHandler}></input>
                        </div>

                        <button className="AceptButton" onClick={this.saveGame}>Añadir juego</button>
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateGameComponent;