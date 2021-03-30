import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { AuthService } from '../../Services/AuthService';

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
            idCloud:"",
            isNotMalware:"",
            creator:""
        }
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame=this.deleteGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
    }

    componentDidMount() {
        GameService.getGameById(this.state.id).then((res) => {
            let game = res.data;
            this.setState({title: game.title,
                description: game.description,
                requirements: game.requirements,
                price: game.price,
                idCloud: game.idCloud,
                isNotMalware: game.isNotMalware,
                creator: game.creator
            });
            console.log('game => ' + JSON.stringify(game));
        });
    }
    deleteGame= (e)=>{
        e.preventDefault()
        GameService.deleteGame(this.state.id).then(()=>{
            this.props.history.push('/games');
        })
    }

    updateGame = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        let game = {title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price
                    , idCloud: this.state.idCloud, isNotMalware: this.state.isNotMalware, creator: this.state.creator};
        console.log('game => ' + JSON.stringify(game));

        //Hasta que no funcione el id esto no va a funcionar.
        GameService.updateGame(game, this.state.id).then(res => {
            this.props.history.push('/games');
        })
        
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
                {AuthService.getUserData()['username']===this.state.creator.username?(<h2>Edit Game</h2>):null}
                
                <br></br>
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            {AuthService.getUserData()['username']===this.state.creator.username?(
                            <input placeholder="Title" name="title" className="form-control"
                                value={this.state.title} onChange={this.changeTitleHandler}></input>
                            ):
                            <p>{this.state.title}</p>
                            }
                            {this.state.titleError?(<div className="ValidatorMessage">{this.state.titleError}</div>) : null} 
                            
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            {AuthService.getUserData()['username']===this.state.creator.username?(
                            <input placeholder="Description" name="description" className="form-control"
                                value={this.state.description} onChange={this.changeDescriptionHandler}></input>
                            ): 
                            <p>{this.state.description}</p>
                            }
                            {this.state.descriptionError?(<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Minimum requirements</label>
                            {AuthService.getUserData()['username']===this.state.creator.username?(
                            <input placeholder="Requirements" name="requirements" className="form-control"
                                value={this.state.requirements} onChange={this.changeRequirementsHandler}></input>
                            ):
                            <p>{this.state.requirements}</p>
                            }
                            {this.state.requirementsError?(<div className="ValidatorMessage">{this.state.requirementsError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            {AuthService.getUserData()['username']===this.state.creator.username?(
                            <input placeholder="Price" name="price" className="form-control" type="number"
                                value={this.state.price} onChange={this.changePriceHandler}></input>
                            ):
                            <p>{this.state.price}</p>
                            }
                        </div>
                        {AuthService.getUserData()['username']===this.state.creator.username?(
                        <React.Fragment>
                        <button className="AceptButton" onClick={this.updateGame}>Modificar juego</button>
                        <button className="DeleteButton" onClick={this.deleteGame}>Borrar Juego</button>
                        </React.Fragment>
                        ):null}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Volver</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;