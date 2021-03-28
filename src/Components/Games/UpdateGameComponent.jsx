import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';

class UpdateGameComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            title:"",
            titleError:"",
            description:"",
            descriptionError:"",
            requirements:"",
            requirementsError:"",
            price:"",
            priceError:"",
        }
        this.updateGame = this.updateGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
    }

    validate =()=>{
        let titleError="";
        let descriptionError="";
        let requirementsError="";
        let priceError="";
        if(this.state.title.length===0) {
            titleError="The game needs a title";
        }
        if(this.state.description.length===0) {
            descriptionError="The game needs a description"
        }
        if(this.state.requirements.length===0) {
            requirementsError="The game needs a specification of the minimun requirements"
        }
        if(this.state.price.length===0) {
            priceError="The game needs a price"
        }

        this.setState({titleError});
        this.setState({descriptionError});
        this.setState({requirementsError});
        this.setState({priceError});
        if(titleError || descriptionError || requirementsError || priceError){
            return false;
        }else{
            return true;
        }
    }

    updateGame = (e) => {
        e.preventDefault();
        let game = {title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price};
        console.log('game => ' + JSON.stringify(game));
    }

    componentDidMount() {
        GameService.getGameById(this.state.id).then((res) => {
            let game = res.data;
            this.setState({title: game.title,
                description: game.description,
                requirements: game.requirements,
                price: game.price
            });
        });
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

    updateGame = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid) {
            //Redirigir a games
            this.props.history.push('/games');
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
                <h2>Update Game</h2>
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

                            {this.state.priceError?(<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                        </div>

                        <button className="AceptButton" onClick={this.updateGame}>Actualizar juego</button>
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;