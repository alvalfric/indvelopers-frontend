import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { AuthService } from '../../Services/AuthService';
import OwnedGameService from '../../Services/OwnedGameService';
import ListReviewComponent from '../Reviews/ListReviewComponent';
import { ReviewService } from '../../Services/ReviewService';
import {CloudService} from '../../Services/CloudService';
import saveAs from 'jszip';
import { UrlProvider } from '../../providers/UrlProvider';

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
            price: "",
            priceError: "",
            idCloud:"",
            isNotMalware:false,
            creator:"",
            imagen: "",
            base64TextString: "",
            isBought:false,
            isAdmin:false
        }
        this.downloadGame=this.downloadGame.bind(this);
        this.buyGame = this.buyGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
        this.changeConfirmHandler=this.changeConfirmHandler.bind(this);
    }

    componentDidMount() {
        GameService.getGameById(this.state.id).then((res) => {
            let game = res.data;
            this.setState({
                title: game.title,
                description: game.description,
                requirements: game.requirements,
                price: game.price + "",
                idCloud: game.idCloud,
                isNotMalware: game.isNotMalware,
                creator: game.creator,
                imagen: game.imagen
            });
            console.log(this.state.imagen)
            console.log("IDCLOUD===>"+JSON.stringify(this.state.idCloud))
            OwnedGameService.CheckGameOwned(this.state.id).then((res)=>{
                this.setState({isBought:res.data})
            })
         var roles= AuthService.getUserData()['roles']
         for(var i=0;i<roles.length;i++){
             if(roles[i]=="ADMIN"){
                 this.setState({isAdmin:true})
                 break;
             }
         }
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
    downloadGame=(e)=>{
        e.preventDefault()
        CloudService.downloadFile(this.state.idCloud).then(res=>{
            const FileDownload = require('js-file-download')
            FileDownload(res,'game.zip')
        })
    }

    updateGame = (e) => {
        e.preventDefault();
        if (AuthService.getUserData()['isPremium'] !== true) {
            this.state.price = 0.0;
        }
        const isValid = this.validate();
        let game = {title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price
                    , idCloud: this.state.idCloud, isNotMalware: this.state.isNotMalware, creator: this.state.creator, imagen: this.state.base64TextString};
        if(isValid){
        GameService.updateGame(game, this.state.id).then(data => {
            if (typeof data == "string") {
                this.props.history.push('/games');
            } else {
                GameService.findAll().then(data => {
                    data.forEach(g => {
                        if (g.title === this.state.title) {
                            this.setState({ titleError: "A game with that title is already created!" });
                        }
                    });
                })
            }
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
        let priceError = "";

        if (this.state.title.length === 0) {
            titleError = "The game needs a title";
        }
        if (this.state.description.length === 0) {
            descriptionError = "The game needs a description"
        }
        if (this.state.requirements.length === 0) {
            requirementsError = "The game needs a specification of the minimum requirements"
        }
        if (AuthService.getUserData()['isPremium'] === true) {
            if (this.state.price.length === 0) {
                priceError = "The game needs a price!"
            } else if (this.state.price < 0) {
                priceError = "Price must not be negative!"
            } else if (this.state.price.split('.').length == 2 && this.state.price.split('.')[1].length > 2) {
                priceError = "Price must not have more than 2 decimals!"
            }
        }

        this.setState({ titleError });
        this.setState({ descriptionError });
        this.setState({ requirementsError });
        this.setState({ priceError });
        if (titleError || descriptionError || requirementsError || priceError) {
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
    changeConfirmHandler= (event)=>{
        this.setState({isNotMalware: event.target.checked})
    }

    changeImagenHandler = (event) => {
        console.log("File to upload: ", event.target.files[0])
        let file = event.target.files[0]
        if(file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ imagen: event.target.value });
    }
    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
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
                                    <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div className="w3-xlarge w3-padding" >{this.state.title}</div>
                                    <div className="w3-display-container w3-text-white">
                                        <img src={"data:image/png;base64,"+this.state.imagen} style={{ width: "50%", display: "block", alignItems: "left", paddingLeft: "15px", paddingTop: "10px" }} />
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
                                    <input placeholder="Price" name="price" className="form-control" type="number" min="0" step="0.01"
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
                            {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                        </div>
                        {this.state.isAdmin?(
                        <div class="custom-control custom-checkbox">
                        <input type="checkbox" onClick={this.changeConfirmHandler} checked={this.state.isNotMalware} value={this.state.isNotMalware}/>
                       <label style={{color:"#838383"}}>¿Es seguro este software para la comunidad indie?</label>
                             </div>)
                             :null}
                        
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
                                <button className="DeleteButton" style={{ marginLeft: "10px" }} onClick={this.deleteGame}>Borrar Juego</button>
                            </React.Fragment>
                        ) :this.state.isAdmin?(<React.Fragment>
                            <button className="AdminButton" style={{ marginLeft: "10px" }} onClick={(e)=>this.downloadGame(e)} >Descargar</button>
                            <button className="AdminButton" style={{ marginLeft: "10px" }} onClick={this.updateGame} >Modificar juego</button>
                            <button className="DeleteButton" style={{ marginLeft: "10px" }} onClick={this.deleteGame} >Borrar Juego</button>
                        </React.Fragment>):this.state.isBought?(<p>Ya lo tienes en tu lista de juegos comprados</p>):
                         <button className="DeleteButton" onClick={()=>this.buyGame(this.props.match.params.id)}>Comprar</button>}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Volver</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;