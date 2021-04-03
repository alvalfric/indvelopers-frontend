import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { AuthService } from '../../Services/AuthService';
import portada from '../../assets/JuegoPortada.jpg';
import OwnedGameService from '../../Services/OwnedGameService';
import ListReviewComponent from '../Reviews/ListReviewComponent';
import { ReviewService } from '../../Services/ReviewService';

class UpdateGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            createReviewCheck: false,
            title:"",
            titleError:"",
            description:"",
            descriptionError:"",
            requirements:"",
            requirementsError:"",
            price:"",
            idCloud:"",
            isNotMalware:"",
            creator:"",
            isBought:false
        }
        this.buyGame=this.buyGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
    }

    componentDidMount() {
        GameService.getGameById(this.state.id).then((res) => {
            let game = res.data;
            this.setState({
                title: game.title,
                description: game.description,
                requirements: game.requirements,
                price: game.price,
                idCloud: game.idCloud,
                isNotMalware: game.isNotMalware,
                creator: game.creator
            });
            OwnedGameService.CheckGameOwned(this.state.id).then((res)=>{
                this.setState({isBought:res.data})
            })
        });
        ReviewService.getbyGame(this.state.id).then(data => {
            data.forEach(review => {
                console.log(review)
                if (AuthService.getUserData()['username'] === review.developer.username) {
                    this.setState({
                        createReviewCheck: true
                    })
                }
            })
        })
    }
    deleteGame = (e) => {
        e.preventDefault()
        GameService.deleteGame(this.state.id).then(() => {
            this.props.history.push('/games');
        })
    }

    updateGame = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        let game = {title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price
                    , idCloud: this.state.idCloud, isNotMalware: this.state.isNotMalware, creator: this.state.creator};
        if(isValid){
        GameService.updateGame(game, this.state.id).then(res => {
            this.props.history.push('/games');
        })
    }
    }
    buyGame(id){
        this.props.history.push(`/purchase-game/${id}`);
    }

    validate = () => {
        let titleError = "";
        let descriptionError = "";
        let requirementsError = "";
        //let priceError="";
        if (this.state.title.length === 0) {
            titleError = "The game needs a title";
        }
        if (this.state.description.length === 0) {
            descriptionError = "The game needs a description"
        }
        if (this.state.requirements.length === 0) {
            requirementsError = "The game needs a specification of the minimun requirements"
        }

        this.setState({ titleError });
        this.setState({ descriptionError });
        this.setState({ requirementsError });
        //this.setState({priceError});
        if (titleError || descriptionError || requirementsError) {
            return false;
        } else {
            return true;
        }
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value })
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value })
    }

    changeRequirementsHandler = (event) => {
        this.setState({ requirements: event.target.value })
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value })
    }

    cancel() {
        this.props.history.push('/games');
    }

    createReview(gameId) {
        if (AuthService.isAuthenticated()) {
            this.props.history.push(`/createReview/${gameId}`)
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    {AuthService.getUserData()['username'] === this.state.creator.username ? (<h2>Edit Game</h2>) : null}

                    <br></br>
                    <form>
                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.creator.username ? (
                                <React.Fragment>
                                    <label>Título</label>
                                    <input placeholder="Title" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div className="w3-display-container w3-text-white">
                                        <img src={portada} style={{ width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                                        <div className="w3-xlarge w3-display-bottomleft w3-padding" >{this.state.title}</div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}

                        </div>
                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.creator.username ? (
                                <React.Fragment>
                                    <label>Descripción</label>
                                    <input placeholder="Description" name="description" className="form-control"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Descripcion</h5>
                                            </header>
                                            <div className="w3-container">
                                                <p>{this.state.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </div>
                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.creator.username ? (
                                <React.Fragment>
                                    <label>Requisitos del sistema</label>
                                    <input placeholder="Requirements" name="requirements" className="form-control"
                                        value={this.state.requirements} onChange={this.changeRequirementsHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Requisitos del sistema</h5>
                                            </header>
                                            <div className="w3-container">
                                                <p>{this.state.requirements}</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.requirementsError ? (<div className="ValidatorMessage">{this.state.requirementsError}</div>) : null}
                        </div>
                        <div className="form-group">
                            {AuthService.getUserData()['username'] === this.state.creator.username ? (
                                <React.Fragment>
                                    <label>Price</label>
                                    <input placeholder="Price" name="price" className="form-control" type="number"
                                        value={this.state.price} onChange={this.changePriceHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Precio: {this.state.price}€</h5>
                                            </header>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                        <div>
                            <br />
                            <h3>Reviews</h3>
                            <ListReviewComponent gameId={this.state.id} />
                        </div>
                        <div>
                            <br />
                            {/* <button className="Button" onClick={() => this.createReview(this.state.id)}>Crear review</button> */}
                            {this.state.createReviewCheck ?
                                <h5>Ya has creado una review a este juego</h5>
                                :
                                <button className="Button" onClick={() => this.createReview(this.state.id)}>Crear review</button>
                            }
                            <br />
                            <br />
                        </div>

                        {AuthService.getUserData()['username'] === this.state.creator.username ? (
                            <React.Fragment>
                                <button className="AceptButton" onClick={this.updateGame}>Modificar juego</button>
                                <button className="DeleteButton" onClick={this.deleteGame}>Borrar Juego</button>
                            </React.Fragment>
                        ) : this.state.isBought?(<p>Ya lo tienes en tu lista de juegos comprados</p>):
                         <button className="DeleteButton" onClick={()=>this.buyGame(this.props.match.params.id)}>Comprar</button>}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Volver</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;