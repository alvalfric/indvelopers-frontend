import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { AuthService } from '../../Services/AuthService';
import OwnedGameService from '../../Services/OwnedGameService';
import ListReviewComponent from '../Reviews/ListReviewComponent';
import { ReviewService } from '../../Services/ReviewService';
import { CloudService } from '../../Services/CloudService';
import { CategoryService } from '../../Services/CategoryService';
import saveAs from 'jszip';
import {DeveloperService} from '../../Services/DeveloperService';
import PegiAssignation from './PegiAssignation';
import Select from "react-select";

class UpdateGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            createReviewCheck: false,
            title: "",
            titleError: "",
            description: "",
            descriptionError: "",
            requirements: "",
            requirementsError: "",
            price: "",
            priceError: "",
            pegi:"",
            pegiError:"",
            categorias:[],
            idCloud: "",
            isNotMalware: false,
            creator: "",
            imagen: "",
            base64TextString: "",
            isBought: false,
            isAdmin: false,
            isFollowed:false,
            selectedOption:null,
            allCategories:""
        }

        this.categories = [];
        this.beforeCategories = [];
        this.reformatedCategories = [];
        this.readOnlyCategories = "";

        this.downloadGame = this.downloadGame.bind(this);
        this.buyGame = this.buyGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changePegiHandler = this.changePegiHandler.bind(this);
        this.changeCategoriesHandler = this.changeCategoriesHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
        this.changeConfirmHandler = this.changeConfirmHandler.bind(this);
        this.changeGameHandler = this.changeGameHandler.bind(this);
        this.follow=this.follow.bind(this);
        this.unFollow=this.unFollow.bind(this);
    }

    componentDidMount() {
        GameService.getGameById(this.state.id).then((res) => {
            let game = res.data;
            this.setState({
                title: game.title,
                description: game.description,
                requirements: game.requirements,
                price: game.price + "",
                pegi: game.pegi,
                idCloud: game.idCloud,
                isNotMalware: game.isNotMalware,
                creator: game.creator,
                base64TextString: game.imagen
            });
            if (AuthService.isAuthenticated()) {
                OwnedGameService.CheckGameOwned(this.state.id).then((res) => {
                    this.setState({ isBought: res.data })
                })
                var roles = AuthService.getUserData()['roles']
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i] == "ADMIN") {
                        this.setState({ isAdmin: true })
                        break;
                    }
                }
                var following=AuthService.getUserData()['following']
                if(following.length!=0){
                   for(var i=0;i<following.length;i++){
                      if(following[i]['username']===this.state.creator.username){
                       this.setState({isFollowed:true})
                         break;
                        }
                    }
                }
                
            }
            //categorias actuales del juego formateadas para el dropdown
            game.categorias.map(category =>{
                let categoria2 = {
                    value: category.title, label: category.title, id:category.id
                };
                console.log(category)
                this.beforeCategories.push(categoria2);
                //Esto es para la vista de NO creador
                if(this.readOnlyCategories === ""){
                    this.readOnlyCategories = category.title
                }else{
                    this.readOnlyCategories = this.readOnlyCategories +", " + category.title
                }
            })
            this.setState({ selectedOption : this.beforeCategories })
            console.log(this.state.selectedOption)
            
        });
        ReviewService.getbyGame(this.state.id).then(data => {
            data.forEach(review => {
                console.log(review)
                if (AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) {
                    this.setState({
                        createReviewCheck: true
                    })
                }
            })
        })
        //Trae todas las categorias y las formatea para dropdown
        CategoryService.findAll().then(data => {
            data.map(category =>{
                let categoria = {
                    value: category.title, label: category.title, id: category.id
                };
                this.categories.push(categoria)
            })
        });      
    
    }
    follow=(username,e)=>{
        e.preventDefault()
        DeveloperService.followDeveloper(username).then(()=>{
         
             AuthService.loadUserData().then(()=>{
                 window.location.reload()
                this.props.history.push(`/game-View/${this.state.id}`);
             })
          
            
        })

    }
    unFollow=(username,e)=>{
        e.preventDefault()
        DeveloperService.unfollowDeveloper(username).then(()=>{
            
           AuthService.loadUserData().then(()=>{
            window.location.reload()
            this.props.history.push(`/game-View/${this.state.id}`);
         })
        })
    }
    deleteGame = (e) => {
        e.preventDefault()
        GameService.deleteGame(this.state.id).then(() => {
            this.props.history.push('/games');
        })
    }
    changeGameHandler = (e) => {
        e.preventDefault()
        CloudService.deleteFile(this.state.idCloud).then(res => {
            console.log("ANTERIOR IDCLOUD===>" + JSON.stringify(this.state.idCloud))
            const zip = require('jszip')();
            let file = e.target.files[0];
            zip.file(file.name, file);
            zip.generateAsync({ type: "blob" }).then(content => {
                CloudService.uploadFile(content).then(res => {
                    this.setState({ idCloud: res })
                    console.log("NUEVA IDCLOUD===>" + JSON.stringify(this.state.idCloud))
                })
            })
        })

    }
    downloadGame = (e) => {
        e.preventDefault()
        CloudService.downloadFile(this.state.idCloud).then(res => {
            const FileDownload = require('js-file-download')
            FileDownload(res, 'game.zip')
        })
    }

    updateGame = (e) => {
        e.preventDefault();
        if (AuthService.getUserData()['isPremium'] !== true) {
            this.state.price = 0.0;
        }
        const isValid = this.validate();
        if (isValid) {
            this.state.selectedOption.map(category=>{
                let reformatedCategory = {id: category.id, title: category.label}
                this.reformatedCategories.push(reformatedCategory);
            })
            let game = {
                title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price, pegi: this.state.pegi, 
                categorias: this.reformatedCategories, idCloud: this.state.idCloud, isNotMalware: this.state.isNotMalware, creator: this.state.creator, imagen: this.state.base64TextString
            };
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
    buyGame(id) {
        this.props.history.push(`/purchase-game/${id}`);
    }

    validate = () => {
        let titleError = "";
        let descriptionError = "";
        let requirementsError = "";
        let priceError = "";
        let pegiError = "";

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
        if (this.state.pegi === '') {
            pegiError = "The game needs a pegi number!"
        } else if (this.state.pegi != 3 & this.state.pegi !=7 & this.state.pegi !=12 & this.state.pegi !=16 & this.state.pegi !=18 ) {
            pegiError = "Pegi valid number are 3, 7, 12, 16 and 18"
        }

        this.setState({ titleError });
        this.setState({ descriptionError });
        this.setState({ requirementsError });
        this.setState({ priceError });
        this.setState({ pegiError });
        if (titleError || descriptionError || requirementsError || priceError || pegiError) {
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

    changePegiHandler = (event) => {
        this.setState({ pegi: event.target.value })
    }

    changeCategoriesHandler = selectedOption => {
        this.setState({selectedOption})
        this.setState({categorias : selectedOption.map(item =>item.value)},()=>{console.log(this.state.categorias)});

    }

    changeConfirmHandler = (event) => {
        this.setState({ isNotMalware: event.target.checked })
    }

    changeImagenHandler = (event) => {
        console.log("File to upload: ", event.target.files[0])
        let file = event.target.files[0]
        if (file) {
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
                    {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (<h2>Edit Game</h2>) : null}

                    <br></br>
                    <form>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    <label>Title</label>
                                    <input placeholder="Title" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler}></input>
                                    {this.state.base64TextString !== "" ?
                                        <React.Fragment>
                                            <label>Imágen actual: </label>
                                            < br />
                                            <img src={"data:image/png;base64," + this.state.base64TextString} width="120" height="80" />
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <label>Imágen: </label>
                                        </React.Fragment>
                                    }
                                    < br />
                                    <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                                    <br />
                                    <br />
                                    <label>Game:</label>
                                    <input name="GameFile" type="file" className="ButtonFileLoad" multiple accept=".zip, .rar, .7z" onChange={(e) => this.changeGameHandler(e)} />

                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    
                                    <div className="w3-display-container w3-text-white">
                                        <img src={"data:image/png;base64," + this.state.base64TextString} style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} width="400" height="300" />
                                        <div className="w3-xlarge w3-display-bottomleft w3-padding" >{this.state.title}</div>
                                    </div>
                                </React.Fragment>

                            }
                            {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}

                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    <label>Description</label>
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
                                                <h5>Description</h5>
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
                        <div>
                            <br/>
                            <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Creator</h5>
                                            </header>
                                            <div className="w3-container">
                                                <p>{this.state.creator.username}</p>
                                                {(this.state.isFollowed)? 
                                                <React.Fragment>
                                                    <p>You are following this creator. You can unfollow the creator</p>
                                                    <button className="DeleteButton" onClick={(e)=>this.unFollow(this.state.creator.username,e)}>Unfollow</button>
                                                </React.Fragment>
                                                :(AuthService.isAuthenticated() && AuthService.getUserData['username']!=this.state.creator.username)?
                                                <React.Fragment>
                                                    <button className="AceptButton" onClick={(e)=>this.follow(this.state.creator.username,e)}>Follow this user</button>
                                                </React.Fragment>
                                                :null}
                                            </div>
                                        </div>
                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    <label>System requirements</label>
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
                                                <h5>System requirements</h5>
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
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
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
                                                <h5>Price: {this.state.price}€</h5>
                                            </header>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    <label>Categories</label>
                                    <Select
                                        isMulti
                                        options={this.categories}
                                        value={this.state.selectedOption}
                                        onChange={this.changeCategoriesHandler}
                                        className="basic-multi-select"
                                        closeMenuOnSelect={false}
                                    />
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Categories: {this.readOnlyCategories}</h5>
                                            </header>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    <label>Pegi</label>
                                    <input placeholder="Pegi" name="pegi" className="form-control" type="number" 
                                        value={this.state.pegi} onChange={this.changePegiHandler}></input>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                            <header className="w3-container ">
                                                <img />
                                                <PegiAssignation pegi = {this.state.pegi}/>
                                            </header>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.pegiError ? (<div className="ValidatorMessage">{this.state.pegiError}</div>) : null}
                        </div>
                        {this.state.isAdmin ? (
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" onClick={this.changeConfirmHandler} checked={this.state.isNotMalware} value={this.state.isNotMalware} />
                                <label style={{ color: "#838383" }}>¿This software is reliable for the community?</label>
                            </div>)
                            : null}

                        <div>
                            <br />
                            <h3>Reviews</h3>
                            <ListReviewComponent gameId={this.state.id} history={this.props.history}/>
                        </div>
                        <div>
                            <br />
                            {AuthService.isAuthenticated() ?
                                (this.state.createReviewCheck ?
                                    <h5>You've already reviewed this game</h5>
                                    :
                                    <button className="Button" onClick={() => this.createReview(this.state.id)}>Crear review</button>)
                                :
                                null}
                            <br />
                            <br />
                        </div>

                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                            <React.Fragment>
                                <button className="AceptButton" onClick={this.updateGame}>Modify game</button>
                                <button className="DeleteButton" style={{ marginLeft: "10px" }} onClick={this.deleteGame}>Delete game</button>
                            </React.Fragment>
                        ) : this.state.isAdmin ? (<React.Fragment>
                            <button className="AdminButton" style={{ marginLeft: "10px" }} onClick={(e) => this.downloadGame(e)} >Download</button>
                            <button className="AdminButton" style={{ marginLeft: "10px" }} onClick={this.updateGame} >Modify game</button>
                            <button className="DeleteButton" style={{ marginLeft: "10px" }} onClick={this.deleteGame} >Delete game</button>
                        </React.Fragment>) : this.state.isBought ? (<p>You already have it in your game library</p>) :
                            AuthService.isAuthenticated() ?
                                <button className="DeleteButton" onClick={() => this.buyGame(this.props.match.params.id)}>Buy</button>
                                : null}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Back</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;