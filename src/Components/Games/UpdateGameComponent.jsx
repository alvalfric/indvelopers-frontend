import React, { Component } from 'react';
import { GameService } from '../../Services/GameService';
import { AuthService } from '../../Services/AuthService';
import OwnedGameService from '../../Services/OwnedGameService';
import ListReviewComponent from '../Reviews/ListReviewComponent';
import { ReviewService } from '../../Services/ReviewService';
import { CloudService } from '../../Services/CloudService';
import { CategoryService } from '../../Services/CategoryService';
import saveAs from 'jszip';
import { DeveloperService } from '../../Services/DeveloperService';
import PegiAssignation from './PegiAssignation';
import Select from "react-select";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { SpamService } from '../../Services/SpamService';
import { SubscriptionService } from '../../Services/SubscriptionService';
import validator from 'validator';
import { YoutubePlayer } from 'reactjs-media';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, FormText, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel'

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
            pegi: "",
            pegiError: "",
            categorias: [],
            idCloud: "",
            isNotMalware: false,
            creator: "",
            imagen: "",
            base64TextString: "",
            isBought: false,
            isAdmin: false,
            isFollowed:false,
            selectedOption:null,
            allCategories:"",
            progress:0,
            discount:0.0,
            discountError:"",
            spamError:"",
            isPremium: false,
            urlVideo:"",
            urlVideoError:"",
            galleryImage: "",
            galleryImageIndex: "",
            galleryError: "",
            gallery: []
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
        this.urlChangeHandler = this.urlChangeHandler.bind(this);
        this.changeDiscountHandler=this.changeDiscountHandler.bind(this);
        this.follow=this.follow.bind(this);
        this.unFollow=this.unFollow.bind(this);
        this.changeGalleryHandler = this.changeGalleryHandler.bind(this);
        this.eraseGallery = this.eraseGallery.bind(this);
        if (AuthService.isAuthenticated()) {
            SubscriptionService.checkHasSubscription().then((res) => {
                this.setState({ isPremium: res })
            })
        }
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
                base64TextString: game.imagen,
                discount:game.discount,
                urlVideo: game.urlVideo,
                gallery: game.gallery
            });
            if (this.state.gallery != null) {
                this.setState({ galleryImageIndex: game.gallery.length })
            }
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
                var following = AuthService.getUserData()['following']
                if (following.length != 0) {
                    for (var i = 0; i < following.length; i++) {
                        if (following[i]['username'] === this.state.creator.username) {
                            this.setState({ isFollowed: true })
                            break;
                        }
                    }
                }

            }
            //categorias actuales del juego formateadas para el dropdown
            game.categorias.map(category => {
                let categoria2 = {
                    value: category.title, label: category.title, id: category.id
                };
                this.beforeCategories.push(categoria2);
                //Esto es para la vista de NO creador
                if (this.readOnlyCategories === "") {
                    this.readOnlyCategories = category.title
                } else {
                    this.readOnlyCategories = this.readOnlyCategories + ", " + category.title
                }
            })
            this.setState({ selectedOption: this.beforeCategories })

        });
        ReviewService.getbyGame(this.state.id).then(data => {
            data.forEach(review => {
                if (AuthService.isAuthenticated() && AuthService.getUserData()['username'] === review.developer.username) {
                    this.setState({
                        createReviewCheck: true
                    })
                }
            })
        })
        //Trae todas las categorias y las formatea para dropdown
        if (AuthService.isAuthenticated()) {
            CategoryService.findAll().then(data => {
                data.map(category => {
                    let categoria = {
                        value: category.title, label: category.title, id: category.id
                    };
                    this.categories.push(categoria)
                })
            });
        }
    }
    follow = (username, e) => {
        e.preventDefault()
        DeveloperService.followDeveloper(username).then(() => {

            AuthService.loadUserData().then(() => {
                window.location.reload()
                this.props.history.push(`/game-View/${this.state.id}`);
            })


        })

    }
    unFollow = (username, e) => {
        e.preventDefault()
        DeveloperService.unfollowDeveloper(username).then(() => {

            AuthService.loadUserData().then(() => {
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
        let file = e.target.files[0];
        if (file) {
            CloudService.deleteFile(this.state.idCloud).then(res => {
                const zip = require('jszip')();
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
            })
        }

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
        if (this.state.isPremium !== true) {
            this.state.price = 0.0;
        }
        const isValid = this.validate();
        if (isValid) {
            this.state.selectedOption.map(category => {
                let reformatedCategory = { id: category.id, title: category.label }
                this.reformatedCategories.push(reformatedCategory);
            })
            let game = {
                title: this.state.title.trim(), description: this.state.description.trim(), requirements: this.state.requirements.trim(), price: this.state.price, pegi: this.state.pegi,
                categorias: this.reformatedCategories, idCloud: this.state.idCloud, isNotMalware: this.state.isNotMalware, creator: this.state.creator, imagen: this.state.base64TextString,
                discount: this.state.discount, gallery: this.state.gallery,urlVideo: this.state.urlVideo
            };
            SpamService.checkGame(game).then((data) => {
                if (data === false) {
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
                } else {
                    this.setState({ spamError: "This form contains spam words! 😠" })
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
        let discountError="";
        let urlVideoError="";

        if (this.state.title.trim().length === 0) {
            titleError = "The game needs a title";
        }
        if (this.state.description.trim().length === 0) {
            descriptionError = "The game needs a description"
        }
        if (this.state.requirements.trim().length === 0) {
            requirementsError = "The game needs a specification of the minimum requirements"
        }
        if (this.state.isPremium === true) {
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
        if (this.state.discount < 0.) {
            discountError = "Discount cannot be negative"
        } else if (this.state.discount > 1.) {
            discountError = "Discount cannot be greater than 1"
        }
        if(this.state.urlVideo === null || this.state.urlVideo.length === 0) {
            urlVideoError = null
        } else if(!validator.isURL(this.state.urlVideo)) {
            urlVideoError = "Must enter a valid URL"
        }

        this.setState({ titleError });
        this.setState({ descriptionError });
        this.setState({ requirementsError });
        this.setState({ priceError });
        this.setState({ pegiError });
        this.setState({discountError});
        this.setState({urlVideoError});

        if (titleError || descriptionError || requirementsError || priceError || discountError || pegiError || urlVideoError) {

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
        this.setState({ selectedOption })
        this.setState({ categorias: selectedOption.map(item => item.value) });

    }

    changeConfirmHandler = (event) => {
        this.setState({ isNotMalware: event.target.checked })
    }
    changeDiscountHandler = (e) => {
        this.setState({ discount: e.target.value })
    }

    urlChangeHandler = (event) => {
        this.setState({ urlVideo: event.target.value })
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

                    <br></br>
                    <form>
                    <Form className="FormStyle">
                    {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (<h2 className="text-center">Edit Game</h2>) : null}
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                // <React.Fragment>
                                //     <label>Title</label>
                                //     <input placeholder="Title" name="title" className="form-control"
                                //         value={this.state.title} onChange={this.changeTitleHandler}></input>
                                //     {this.state.base64TextString !== "" ?
                                //         <React.Fragment>
                                //             <label>Imágen actual: </label>
                                //             < br />
                                //             <img src={"data:image/png;base64," + this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                //         </React.Fragment>
                                //         :
                                //         <React.Fragment>
                                //             <label>Imágen: </label>
                                //         </React.Fragment>
                                //     }
                                //     < br />
                                //     <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler} />
                                //     <br />
                                //     <br />
                                //     <label>Game:</label>
                                //     <input name="GameFile" type="file" className="ButtonFileLoad" multiple accept=".zip, .rar, .7z" onChange={(e) => this.changeGameHandler(e)} />
                                //     {this.state.progress != 0 ? (
                                //         <p><ProgressBar striped animated variant="success" now={this.state.progress} label={`${this.state.progress}%`} /></p>
                                //     ) : null}

                                 <React.Fragment>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="1">Title</Form.Label> 
                                    <Col sm="10">
                                    <Form.Control placeholder="Title" name="title" className="FormInput"
                                         value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                {this.state.base64TextString !== null && this.state.base64TextString !== "" ?
                                        <React.Fragment>
                                            <Form.Label column sm="3">Actual image: </Form.Label>
                                            < br />
                                            <Image src={"data:image/png;base64," + this.state.base64TextString} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Form.Label column sm="3">Image: </Form.Label>
                                        </React.Fragment>
                                    }
                                    <Col sm="10">
                                        <Form.File placeholder="Image" type="file" name="image" className="FormInput" accept=".jpeg, .png, .jpg" value={this.state.imagen} onChange={this.changeImagenHandler}  />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}> 
                                <Form.Label column sm="1">Game(Zip):</Form.Label>
                                <Col sm="10">
                                <Form.File  name="GameFile" type="file" className="FormInput" multiple accept=".zip, .rar, .7z" onChange={(e) => this.changeGameHandler(e)}/>
                                {this.state.progress != 0 ? (
                                        <p><ProgressBar striped animated variant="success" now={this.state.progress} label={`${this.state.progress}%`} /></p>
                                    ) : null}
                                </Col>
                                </Form.Group>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    {/* <div className="w3-display-container w3-text-white">
                                        <Image height="70%" width="70%" src={"data:image/png;base64," + this.state.base64TextString} style={{ marginLeft: "auto", marginRight: "auto", display: "block", maxWidth: '800px', maxHeight: '400px', }} />
                                        <div className="text-center" ><h1>{this.state.title}</h1></div>
                                    </div> */}
                                    <Card >
                                        <Card.Img height="70%" width="70%" src={"data:image/png;base64," + this.state.base64TextString} style={{ marginLeft: "auto", marginRight: "auto", display: "block", maxWidth: '1000px', maxHeight: '500px', }}/>
                                        <Card.ImgOverlay>
                                            <Card.Title>{this.state.title}</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                </React.Fragment>

                            }
                            {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}
                        </div>
                        <div>
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
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
                                    {this.state.gallery == null || this.state.gallery.length != 2 ?
                                        <input placeholder="Image" type="file" name="image" className="ButtonFileLoad" accept=".jpeg, .png, .jpg" value={this.state.galleryImage} onChange={this.changeGalleryHandler} />
                                        :
                                        <p>You cannot upload more than 2 images on the gallery!</p>
                                    }
                                    {this.state.galleryError ? (<div className="ValidatorMessage">{this.state.galleryError}</div>) : null}
                                    <Button variant="outline-info" onClick={(e) => this.eraseGallery(e)} style={{ marginLeft: "10px" }}>Erase gallery</Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {/* <div className="w3-card-2" >
                                        <header className="w3-container ">
                                            <img />
                                            <h5>Gallery</h5>
                                        </header>
                                        <div className="w3-container">
                                            {this.state.gallery == null ?
                                                null :
                                                this.state.gallery[0] != null ?
                                                    <img src={"data:image/png;base64," + this.state.gallery[0]} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                                    : null}
                                            {this.state.gallery == null ?
                                                null :
                                                this.state.gallery[1] != null ?
                                                    <img src={"data:image/png;base64," + this.state.gallery[1]} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                                    : null
                                            }
                                        </div>
                                    </div> */}
                                    <Carousel >
                                    {this.state.gallery == null ?
                                                null :
                                                this.state.gallery[0] != null ?
                                                    <Carousel.Item>
                                                        <div style={{justifyContent:"center",display:"flex"}}>
                                                        <Image height="50%" width="50%" style={{justifyContent:"center",display:"flex"}} src={"data:image/png;base64," + this.state.gallery[0]} style={{ maxWidth: '500px', maxHeight: '450px' }} />
                                                        </div>
                                                        </Carousel.Item>
                                                    : null}
                                            {this.state.gallery == null ?
                                                null :
                                                this.state.gallery[1] != null ?
                                                <Carousel.Item> 
                                                    <div style={{justifyContent:"center",display:"flex"}}>
                                                    <Image height="50%" width="50%" style={{justifyContent:"center",display:"flex"}} src={"data:image/png;base64," + this.state.gallery[1]} style={{ maxWidth: '500px', maxHeight: '450px' }} />
                                                    </div>
                                                    </Carousel.Item>
                                                    : null
                                            }
                                    </Carousel>
                                </React.Fragment>
                            )}
                        </div>

                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    {/* <label>Description</label>
                                    <input placeholder="Description" name="description" className="form-control"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}></input> */}
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="1">Description</Form.Label>
                                        <Col sm="10">
                                            <Form.Control placeholder="Description" name="description" className="FormInput"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </Col>
                                    </Form.Group>
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
                        <div className="w3-card-4">

                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] != this.state.creator.username && !this.state.isFollowed) ? (
                                <React.Fragment>
                                    <header className="w3-container ">
                                        <img />
                                        <h5>Creator</h5>
                                    </header>
                                    <div className="w3-container ">
                                        <p>{this.state.creator.username}</p>
                                    </div>
                                    <Button variant="outline-info" onClick={(e) => this.follow(this.state.creator.username, e)}>Follow this user</Button>
                                </React.Fragment>
                            ) : (AuthService.isAuthenticated() && AuthService.getUserData()['username'] != this.state.creator.username && this.state.isFollowed) ? (
                                <React.Fragment>
                                    <header className="w3-container ">
                                        <img />
                                        <h5>Creator</h5>
                                    </header>
                                    <div className="w3-container ">
                                        <p>{this.state.creator.username}</p>
                                    </div>
                                    <p>You are following this creator. You can unfollow the creator</p>
                                    <Button variant="outline-danger" onClick={(e) => this.unFollow(this.state.creator.username, e)}>Unfollow</Button>
                                </React.Fragment>
                            ) : null}
                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    {/* <label>System requirements</label>
                                    <input placeholder="Requirements" name="requirements" className="form-control"
                                        value={this.state.requirements} onChange={this.changeRequirementsHandler}></input> */}
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="1">System requirements</Form.Label>
                                            <Col sm="10">
                                                <Form.Control placeholder="Requirements" name="requirements" className="FormInput"
                                        value={this.state.requirements} onChange={this.changeRequirementsHandler}/>
                                            </Col>
                                        </Form.Group>
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
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ?
                                (
                                    <React.Fragment>
                                        {/* <label>Price</label>
                                        <input placeholder="Price" name="price" className="form-control" type="number" min="0" step="0.01"
                                            value={this.state.price} onChange={this.changePriceHandler}></input> */}
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="1">Price</Form.Label>
                                                <Col sm="10">
                                                    <Form.Control placeholder="Price" name="price" className="FormInput" type="number" min="0" step="0.01"
                                            value={this.state.price} onChange={this.changePriceHandler}/>
                                                </Col>
                                            </Form.Group>
                                    </React.Fragment>
                                ) : this.state.discount != 0. ? (
                                    <React.Fragment>
                                        <div>
                                            <br />
                                            <div className="w3-card-2" >
                                                <header className="w3-container ">
                                                    <img />
                                                    <h5>Price: <strike>{this.state.price}</strike>€</h5>
                                                    <h4>       {(this.state.price - this.state.price * this.state.discount).toFixed(2)}€</h4>
                                                </header>
                                            </div>
                                        </div>
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
                                    </React.Fragment>}
                            {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                        </div>
                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    {/* <label>Categories</label>
                                    <Select
                                        isMulti
                                        options={this.categories}
                                        value={this.state.selectedOption}
                                        onChange={this.changeCategoriesHandler}
                                        className="basic-multi-select"
                                        closeMenuOnSelect={false}
                                    /> */}
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
                                        </Col>
                                    </Form.Group>
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
                                    {/* <label>Pegi</label>
                                    <input placeholder="Pegi" name="pegi" className="form-control" type="number"
                                        value={this.state.pegi} onChange={this.changePegiHandler}></input> */}
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="1">Pegi</Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="Pegi" name="pegi" className="FormInput" type="number"
                                        value={this.state.pegi} onChange={this.changePegiHandler}/>
                                    </Col>
                                    </Form.Group>
                                </React.Fragment>
                            ) :
                                <React.Fragment>
                                    <div>
                                        <br />
                                        <header className="w3-container ">
                                            <img />
                                            <PegiAssignation pegi={this.state.pegi} />
                                        </header>
                                    </div>
                                </React.Fragment>
                            }
                            {this.state.pegiError ? (<div className="ValidatorMessage">{this.state.pegiError}</div>) : null}
                        </div>

                        <div className="form-group">
                            {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                                <React.Fragment>
                                    {/* <label>Optional Video (YouTube URL):</label>
                                    <input placeholder="YouTube URL" type="url" name="urlVideo" className="form-control"
                                        value={this.state.urlVideo} onChange={this.urlChangeHandler}></input> */}
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="2">Optional Video (YouTube URL):</Form.Label>
                                            <Col sm="9">
                                                <Form.Control placeholder="YouTube URL" type="url" name="urlVideo" className="FormInput"
                                        value={this.state.urlVideo} onChange={this.urlChangeHandler}/>
                                            </Col>
                                        </Form.Group>
                                </React.Fragment>
                            ) : this.state.urlVideo == null ?
                                (<React.Fragment>
                                    <div>
                                    </div>
                                </React.Fragment>)
                                :
                                (<React.Fragment>
                                    <div>
                                        <br />
                                            <Form.Group as={Row}>
                                                <Col sm="10">
                                                <YoutubePlayer 
                                                    src={this.state.urlVideo}
                                                    width="70%"
                                                    height={400}
                                                    allowFullScreen="True"
                                                />
                                                </Col>
                                            </Form.Group>
                                            
                                    </div>
                                </React.Fragment>)
                            }
                            {this.state.urlVideoError ? (<div className="ValidatorMessage">{this.state.urlVideoError}</div>) : null}
                        </div>
                
                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username']===this.state.creator.username)?
                        <React.Fragment>
                            {/* <label>Discount</label>
                            <input placeholder="Discount" name="Discount" className="form-control" type="number" min="0" step="0.1"
                                        value={this.state.discount} onChange={this.changeDiscountHandler}></input> */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="1">Discount</Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Discount" name="Discount" className="FormInput" type="number" min="0" step="0.1"
                                        value={this.state.discount} onChange={this.changeDiscountHandler}/>
                                </Col>
                            </Form.Group>
                        </React.Fragment>
                    :this.state.discount!=0.?(
                        <React.Fragment>
                            <div>

                                        <br />
                                        <div className="w3-card-2" >
                                            <header className="w3-container ">
                                                <img />
                                                <h5>Discount: {this.state.discount * 100}%</h5>
                                            </header>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : null}
                        {this.state.discountError ? (<div className="ValidatorMessage">{this.state.discountError}</div>) : null}
                        {this.state.isAdmin ? (
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" onClick={this.changeConfirmHandler} checked={this.state.isNotMalware} value={this.state.isNotMalware} />
                                <label style={{ color: "#838383" }}>¿This software is reliable for the community?</label>
                            </div>)
                            : null}

                        <div>
                            <br />
                            <h3>Reviews</h3>
                            <ListReviewComponent gameId={this.state.id} history={this.props.history} />
                        </div>
                        <div>
                            <br />
                            {AuthService.isAuthenticated() ?
                                (this.state.createReviewCheck ?
                                    <h5>You've already reviewed this game</h5>
                                    :
                                    <Button variant="outline-primary" onClick={() => this.createReview(this.state.id)}>Create review</Button>)
                                :
                                null}
                            <br />
                            <br />
                        </div>

                        {(AuthService.isAuthenticated() && AuthService.getUserData()['username'] === this.state.creator.username) ? (
                            <React.Fragment>
                                <Button variant="outline-success" onClick={this.updateGame}>Modify game</Button>
                                <Button variant="outline-danger" style={{ marginLeft: "10px" }} onClick={this.deleteGame}>Delete game</Button>
                            </React.Fragment>
                        ) : this.state.isAdmin ? (<React.Fragment>
                            <Button variant="outline-warning" style={{ marginLeft: "10px" }} onClick={(e) => this.downloadGame(e)} >Download</Button>
                            <Button variant="outline-warning" style={{ marginLeft: "10px" }} onClick={this.updateGame} >Modify game</Button>
                            <Button variant="outline-danger" style={{ marginLeft: "10px" }} onClick={this.deleteGame} >Delete game</Button>
                        </React.Fragment>) : this.state.isBought ? (<p>You already have it in your game library</p>) :
                            AuthService.isAuthenticated() ?
                                <Button variant="outline-primary" onClick={() => this.buyGame(this.props.match.params.id)}>Buy</Button>
                                : null}
                        <Button variant="outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Back</Button>
                        {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}
                        </Form>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateGameComponent;