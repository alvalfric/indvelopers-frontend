import {  Component } from 'react';
import React from 'react';
import { AuthService } from '../../Services/AuthService';
import { GameService } from '../../Services/GameService';
import { SubscriptionService } from '../../Services/SubscriptionService';
import saveAs from 'jszip';
import { CloudService } from '../../Services/CloudService';
import Select from "react-select";
import { CategoryService } from '../../Services/CategoryService';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { SpamService } from '../../Services/SpamService';
import validator from 'validator';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

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
            pegi: null,
            pegiSelected: null,
            pegiOptions:[{label:"3",value:3},{label:"7",value:7},{label:"12",value:12},{label:"16",value:16},{label:"18",value:18}],
            pegiError: "",
            categorias: [],
            imagen: "",
            imagenError: "",
            base64TextString: "",
            isAdmin: false,
            submitError: "",
            isPremium:false,
            idCloud:"",
            idCloudError:"",
            selectedOption:null,
            selectedOptionError:"",
            progress:0,
            spamError: "",
            urlVideo:"",
            urlVideoError:"",
            galleryImage: "",
            galleryImageIndex: "",
            galleryError: "",
            gallery: []
        }

        this.categories = [];
        this.reformatedCategories = [];

        this.saveGame = this.saveGame.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeRequirementsHandler = this.changeRequirementsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        // this.changePegiHandler = this.changePegiHandler.bind(this);
        this.changePegiHandler2 = this.changePegiHandler2.bind(this);
        this.changeCategoriesHandler = this.changeCategoriesHandler.bind(this);
        this.changeImagenHandler = this.changeImagenHandler.bind(this);
        this.changeGameHandler=this.changeGameHandler.bind(this);
        this.urlChangeHandler = this.urlChangeHandler.bind(this);
        this.changeGalleryHandler = this.changeGalleryHandler.bind(this);
        this.eraseGallery = this.eraseGallery.bind(this);
        SubscriptionService.checkHasSubscription().then((res) => {
            this.setState({ isPremium: res })
        })
    }

    componentDidMount() {
        CategoryService.findAll().then(data => {
            data.map(category => {
                let categoria = {
                    value: category.title, label: category.title, id: category.id
                };
                this.categories.push(categoria)
            })
        });
        if (AuthService.isAuthenticated()) {
            var roles = AuthService.getUserData()['roles']
            for (var i = 0; i < roles.length; i++) {
                if (roles[i] == "ADMIN") {
                    this.setState({ isAdmin: true })
                    break;
                }
            }
        }
    }

    validate = () => {
        let titleError = "";
        let descriptionError = "";
        let requirementsError = "";
        let priceError="";
        let pegiError="";
        let imagenError="";
        let idCloudError="";
        let urlVideoError="";
        let selectedOptionError="";
        

        if (this.state.title.trim().length === 0) {
            titleError = "The game needs a title";
        }
        if (this.state.description.trim().length === 0) {
            descriptionError = "The game needs a description"
        }
        if (this.state.requirements.trim().length === 0) {
            requirementsError = "The game needs a specification of the minimum requirements"
        }
        if (this.state.idCloud.length === 0) {
            idCloudError = "You must upload a game and let it a few seconds to upload"
        }
        if (this.state.imagen.length === 0) {
            imagenError = "The game needs a cover"
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
        } else if (this.state.pegi != 3 & this.state.pegi != 7 & this.state.pegi != 12 & this.state.pegi != 16 & this.state.pegi != 18) {
            pegiError = "Pegi valid number are 3, 7, 12, 16 and 18"
        }
        if(this.state.urlVideo.length === 0) {
            urlVideoError = ""
        } else if(!validator.isURL(this.state.urlVideo)) {
            urlVideoError = "Must enter a valid URL"
        }
        if(this.state.selectedOption==null || this.state.selectedOption.length==0){
            selectedOptionError="You must select at least one category"
        }

        this.setState({ titleError });
        this.setState({ descriptionError });
        this.setState({ requirementsError });
        this.setState({ priceError });
        this.setState({ imagenError });
        this.setState({ idCloudError });
        this.setState({ pegiError });
        this.setState({urlVideoError});
        this.setState({selectedOptionError});
        if (titleError || descriptionError || requirementsError || priceError || imagenError || idCloudError || pegiError || urlVideoError || selectedOptionError) {
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

    // changePegiHandler = (event) => {
    //     this.setState({ pegi: event.target.value })
    // }


    urlChangeHandler = (event) => {
        this.setState({ urlVideo: event.target.value })
    }

    changeGameHandler = (event) => {
        event.preventDefault()
        const zip = require('jszip')();
        let file = event.target.files[0];
        if (file) {
            zip.file(file.name, file);
            zip.generateAsync({ type: "blob" }).then(content => {
                CloudService.uploadFile(content, (e) => {
                    this.setState({ progress: Math.round((100 * e.loaded) / e.total) })
                    if (this.state.progress == 100) {
                        this.setState({ progress: 75 })
                    }
                }).then(res => {
                    this.setState({ idCloud: res })
                    this.setState({ progress: 100 })
                    window.alert("Your game has been uploaded successfully")
                })
            })
        }
    }

    changeImagenHandler = (event) => {
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

    changeGalleryHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleMultipleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ galleryImage: event.target.value });
    }
    _handleMultipleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.gallery.push(btoa(binaryString))
        this.setState({ 
            galleryImageIndex: this.state.gallery.length
        })
    }
    eraseGallery = (e) => {
        e.preventDefault()
        this.setState({
            galleryImage: "",
            galleryImageIndex: "",
            galleryError: "",
            gallery: []
        })
    }

    changeCategoriesHandler = selectedOption => {
        this.setState({ selectedOption })
        this.setState({ categorias: selectedOption.map(item => item.value) });
    }
    changePegiHandler2 = pegiSelected => {
        this.setState({pegiSelected})
        this.setState({pegi:pegiSelected.value})
    }

    saveGame = (e) => {
        e.preventDefault();
        if (this.state.isPremium !== true && !this.state.isAdmin) {
            this.state.price = 0.0;
        }
        const isValid = this.validate();
        if (isValid) {
            this.state.selectedOption.map(category => {
                let reformatedCategory = { id: category.id, title: category.label }
                this.reformatedCategories.push(reformatedCategory);
            })
            let game = {
                title: this.state.title.trim(), description: this.state.description.trim(), requirements: this.state.requirements.trim(), price: this.state.price, pegi: this.state.pegi
                , categorias: this.reformatedCategories, idCloud: this.state.idCloud, isNotMalware: false, creator: null, imagen: this.state.base64TextString, gallery: this.state.gallery, urlVideo: this.state.urlVideo
            };
            console.log(JSON.stringify(game))
            SpamService.checkGame(game).then((data) => {
                if (data === false) {
                    GameService.addGame(game).then(data => {
                        if (typeof data == "string") {
                            this.props.history.push('/my-games')
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
                } else {
                    this.setState({ spamError: "This form contains spam words! 😠" })
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
                    <Form className="FormStyle">
                    <h2 style={{textAlign:"center"}}>Create a game</h2>
                    <br></br>
                    <form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Title" name="title" className="FormInput"
                                value={this.state.title} onChange={this.changeTitleHandler} />
                                {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" placeholder="Description" name="description" className="FormInput"
                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Minimun requirements</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Requirements" name="requirements" className="FormInput"
                                value={this.state.requirements} onChange={this.changeRequirementsHandler} />
                                {this.state.requirementsError ? (<div className="ValidatorMessage">{this.state.requirementsError}</div>) : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Price</Form.Label>
                            <Col sm="10">
                                <p>Note: If you're a NON PREMIUM user, price will be 0€</p>
                                <Form.Control placeholder="Price" name="price" className="FormInput" type="number" min="0" step="0.01"
                                value={this.state.price} onChange={this.changePriceHandler} />
                                {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Categories</Form.Label>
                            <Col sm="10">
                            <Select
                            isMulti
                            options={this.categories}
                            value={this.state.selectedOption}
                            onChange={this.changeCategoriesHandler}
                            className="basic-multi-select"
                            closeMenuOnSelect={false}
                        />
                          {this.state.selectedOptionError ? (<div className="ValidatorMessage">{this.state.selectedOptionError}</div>) : null}

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Pegi</Form.Label>
                            <Col sm="10">
                                {/* <Form.Control placeholder="Pegi" name="pegi" className="FormInput" type="number"
                                value={this.state.pegi} onChange={this.changePegiHandler}/> */}
                                <Select  options={this.state.pegiOptions} value={this.state.pegiSelected} onChange={this.changePegiHandler2} className="basic-multi-select" closeMenuOnSelect={true} />
                                {this.state.pegiError ? (<div className="ValidatorMessage">{this.state.pegiError}</div>) : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                        {this.state.base64TextString !== "" ?
                            <React.Fragment>
                                <Form.Label column sm="1">Actual image: </Form.Label>
                                < br />
                                <Image src={"data:image/png;base64,"+this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '150px' }}/>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Form.Label column sm="1">Image: </Form.Label>
                            </React.Fragment>
                        }
                        <Col sm="10">
                            <Form.File placeholder="Image" type="file" name="image" className="FormInput" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler}  />
                            {this.state.imagenError ? (<div className="ValidatorMessage">{this.state.imagenError}</div>) : null}
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Optional Video (YouTube URL):</Form.Label>
                            <Col sm="9">
                                <Form.Control placeholder="YouTube URL" type="url" name="videoURL" className="FormInput" value={this.state.urlVideo} onChange={this.urlChangeHandler}/>
                                {this.state.urlVideoError ? (<div className="ValidatorMessage">{this.state.urlVideoError}</div>) : null}
                            </Col>
                        </Form.Group>
                         <div className="form-group">
                            {this.state.galleryImageIndex !== "" ?
                                <React.Fragment>
                                    <label>Actual images on gallery: </label>
                                    < br />
                                    {this.state.gallery.length == 1 ?
                                        <React.Fragment>
                                            <img src={"data:image/png;base64," + this.state.gallery[0]} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                        </React.Fragment>
                                        :
                                        this.state.gallery.length == 2 ?
                                            <React.Fragment>
                                                <img src={"data:image/png;base64," + this.state.gallery[0]} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                                <img src={"data:image/png;base64," + this.state.gallery[1]} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                            </React.Fragment>
                                            :
                                            null
                                    }
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <label>Gallery:</label>
                                </React.Fragment>
                            }
                            < br />
                            {this.state.gallery.length != 2 ?
                                <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.galleryImage} onChange={this.changeGalleryHandler} />
                                :
                                <p>You cannot upload more than 2 images on the gallery!</p>
                            }
                            {this.state.galleryError ? (<div className="ValidatorMessage">{this.state.galleryError}</div>) : null}
                            <Button variant="outline-primary" onClick={(e) => this.eraseGallery(e)} style={{ marginLeft: "10px" }}>Erase gallery</Button>
                        </div>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Game(.zip format):</Form.Label>
                            <Col sm="9">
                            <Form.File name="GameFile" type="file" className="FormInput" multiple accept=".zip, .rar, .7z" onChange={(e) => this.changeGameHandler(e)} />
                            {this.state.progress != 0 ? (
                                <p><ProgressBar striped animated variant="success" now={this.state.progress} label={`${this.state.progress}%`} /></p>
                            ) : null}

                            {this.state.idCloudError ? (<div className="ValidatorMessage">{this.state.idCloudError}</div>) : null}
                            </Col>
                        </Form.Group>
                        <div style={{justifyContent:"center",display:"flex"}}>
                        <Button variant="outline-success" onClick={this.saveGame}>Add game</Button>
                        {this.state.submitError ? (<div className="ValidatorMessage">
                            {this.state.submitError}
                        </div>) : null}
                        <Button variant="outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</Button>
                        {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}
                        </div>
                        <p className="text-danger">* you won't see your game published until admins check it</p>
                    </form>
                    </Form>
                </div>
             </div>
            
        );
    }
}

export default CreateGameComponent;