import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import {SubscriptionService} from '../../Services/SubscriptionService';
import saveAs from 'jszip';
import {CloudService} from '../../Services/CloudService';
import Select from "react-select";
import { CategoryService } from '../../Services/CategoryService';
import ProgressBar from 'react-bootstrap/ProgressBar';

class CreateGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            imagen: "",
            imagenError:"",
            base64TextString: "",
            submitError: "",
            isPremium:false,
            idCloud:"",
            idCloudError:"",
            selectedOption:null,
            progress:0
        }

        this.categories = [];
        this.reformatedCategories = [];

        this.saveGame = this.saveGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changePegiHandler = this.changePegiHandler.bind(this);
        this.changeCategoriesHandler = this.changeCategoriesHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
        this.changeGameHandler=this.changeGameHandler.bind(this);
        SubscriptionService.checkHasSubscription().then((res)=>{
            this.setState({isPremium:res})
        })
    }

    componentDidMount(){
        CategoryService.findAll().then(data => {
            data.map(category =>{
                let categoria = {
                    value: category.title, label: category.title, id: category.id
                };
                this.categories.push(categoria)
            })
        });      
    }

    validate = () => {
        let titleError = "";
        let descriptionError = "";
        let requirementsError = "";
        let priceError="";
        let pegiError="";
        let imagenError="";
        let idCloudError="";

        if (this.state.title.length === 0) {
            titleError = "The game needs a title";
        }
        if (this.state.description.length === 0) {
            descriptionError = "The game needs a description"
        }
        if (this.state.requirements.length === 0) {
            requirementsError = "The game needs a specification of the minimum requirements"
        }
        if(this.state.idCloud.length===0){
            idCloudError="You must upload a game and let it a few seconds to upload"
        }
        if(this.state.imagen.length===0){
            imagenError="The game needs a cover"
        }
        if (this.state.isPremium) {
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
        this.setState({imagenError});
        this.setState({idCloudError});
        this.setState({ pegiError });
        if (titleError || descriptionError || requirementsError || priceError || imagenError || idCloudError || pegiError) {
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

    changeGameHandler=(event) =>{
        event.preventDefault()
        const zip = require('jszip')();
        let file=event.target.files[0];
        zip.file(file.name,file);
        zip.generateAsync({type:"blob"}).then(content=>{
            CloudService.uploadFile(content,(e)=>{
                this.setState({progress: Math.round((100 * e.loaded) / e.total)})
            }).then(res=>{
                this.setState({idCloud:res})
            })
        })
        
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

    changeCategoriesHandler = selectedOption => {
        this.setState({selectedOption})
        this.setState({categorias : selectedOption.map(item =>item.value)},()=>{console.log(this.state.categorias)});

    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

    saveGame = (e) => {
        e.preventDefault();
        if (this.state.isPremium !== true) {
            this.state.price = 0.0;
        }

        const isValid = this.validate();
        if (isValid) {
            this.state.selectedOption.map(category=>{
                let reformatedCategory = {id: category.id, title: category.label}
                this.reformatedCategories.push(reformatedCategory);
            })
            let game = {
                title: this.state.title, description: this.state.description, requirements: this.state.requirements, price: this.state.price, pegi: this.state.pegi
                ,categorias: this.reformatedCategories, idCloud: this.state.idCloud, isNotMalware: false, creator: null, imagen: this.state.base64TextString
            };
            GameService.addGame(game).then(data => {
                if (typeof data == "string") {
                    this.props.history.push('/games')
                } else {
                    var i = 0;
                    GameService.findAll().then(data => {
                        data.forEach(g => {
                            if (g.title === this.state.title) {
                                this.setState({ titleError: "A game with that title is already created!" });
                            }
                            if (AuthService.getUserData()['username'] === g.creator.username) {
                                i++;
                                if (!(i < 5)) {
                                    this.setState({ submitError: "You have to be a premium user in order to upload more games!" });
                                }
                            }

                        });
                    })
                }
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
                    <h2>Create a game</h2>
                    <br></br>
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input placeholder="Title" name="title" className="form-control"
                                value={this.state.title} onChange={this.changeTitleHandler}></input>

                            {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input placeholder="Description" name="description" className="form-control"
                                value={this.state.description} onChange={this.changeDescriptionHandler}></input>

                            {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Minimun requirements</label>
                            <input placeholder="Requirements" name="requirements" className="form-control"
                                value={this.state.requirements} onChange={this.changeRequirementsHandler}></input>

                            {this.state.requirementsError ? (<div className="ValidatorMessage">{this.state.requirementsError}</div>) : null}
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <p>Note: If you're a NON PREMIUM user, price will be 0€</p>
                            <input placeholder="Price" name="price" className="form-control" type="number" min="0" step="0.01"
                                value={this.state.price} onChange={this.changePriceHandler}></input>
                            {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                        </div >
                            <label>Categories</label>
                            <Select
                                isMulti
                                options={this.categories}
                                value={this.state.selectedOption}
                                onChange={this.changeCategoriesHandler}
                                className="basic-multi-select"
                                closeMenuOnSelect={false}
                            />
                        <div className="form-group">
                            <label>Pegi</label>
                            <input placeholder="Pegi" name="pegi" className="form-control" type="number"
                                value={this.state.pegi} onChange={this.changePegiHandler}></input>
                            {this.state.pegiError ? (<div className="ValidatorMessage">{this.state.pegiError}</div>) : null}
                        </div>
                        <div className="form-group">
                        {this.state.base64TextString !== "" ?
                            <React.Fragment>
                                <label>Actual image: </label>
                                < br />
                                <img src={"data:image/png;base64,"+this.state.base64TextString} width="120" height="80"/>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <label>Image: </label>
                            </React.Fragment>
                        }
                        < br />
                        <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                        {this.state.imagenError ? (<div className="ValidatorMessage">{this.state.imagenError}</div>) : null}

                        </div>
                        <div className="form-group">
                        <label>Game(.zip format):</label>
                        <input name="GameFile" type="file" className="ButtonFileLoad" multiple accept=".zip, .rar, .7z" onChange={(e)=>this.changeGameHandler(e)}/>
                        {this.state.progress!=0?(
                            <p><ProgressBar striped animated variant="success" now={this.state.progress} label={`${this.state.progress}%`}/></p>
                        ):null}
                        
                        {this.state.idCloudError ? (<div className="ValidatorMessage">{this.state.idCloudError}</div>) : null}

                        </div>
                        <button className="AceptButton" onClick={this.saveGame}>Add game</button>
                        {this.state.submitError ? (<div className="ValidatorMessage">
                            {this.state.submitError}
                        </div>) : null}
                        <button className="CancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                        <p className="text-danger">* you won't see your game published until admins check it</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateGameComponent;