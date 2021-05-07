import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { SubscriptionService } from '../../Services/SubscriptionService';
import { DeveloperService } from '../../Services/DeveloperService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Col, FormText, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';

class UserDetailsComponent extends Component {

    constructor(props) {
        super(props)
        this.profile = AuthService.getUserData();
        this.state = {
            isPremium: false,
            endSubs: "",
            followers: [],
            following: [],
            followersNumber: 0,
            followingNumber: 0
        }
        this.modifyUserDetails = this.modifyUserDetails.bind(this);
        this.buySuscription = this.buySuscription.bind(this);
        this.showFollowers = this.showFollowers.bind(this);
        this.showFollowing = this.showFollowing.bind(this);
        this.goToDashboard=this.goToDashboard.bind(this);
        this.goToAdminDashboard=this.goToAdminDashboard.bind(this);
        SubscriptionService.checkHasSubscription().then((res)=>{
            this.setState({isPremium:res})
        })
        SubscriptionService.getSubscription(this.profile.id).then((res) => {
            this.setState({ endSubs: res.endDate })
        })
    }

    componentDidMount() {
        DeveloperService.getMyFollowed().then(data => this.setState({
            following: data,
            followingNumber: data.length,
        }))
        DeveloperService.getMyFollowers().then(data => this.setState({
            followers: data,
            followersNumber: data.length,
        }))
    }

    modifyUserDetails() {
        this.props.history.push({
            pathname: `/developers/edit/` + this.profile.id,
            state: { profile: this.profile }
        })

    }
    buySuscription() {
        this.props.history.push("/buySubscription");
    }
    goToDashboard(){
        this.props.history.push("/developer-dashboard")
    }

    goToAdminDashboard(){
        this.props.history.push("/admin-dashboard")
    }

    showFollowers() {
        this.props.history.push({
            pathname: `/followersList`,
            state: { followers: this.state.followers}
        })
    }
    showFollowing() {
        this.props.history.push({
            pathname: `/followersList`,
            state: { following: this.state.following}
        })
    }

    getDetails = () => {
        return (
            <React.Fragment>
                <br/>
                <br/>
                <br/>
                {/* <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}} >
                <h2>User details</h2>
                <div className='container' style={{ padding: '10px' }}>
                    <h3 style={{ paddingLeft: '1%' }}> {this.profile.username} </h3>
                    <div className='row'>
                        <div className='col'>
                            <Card.Img src={"data:image/png;base64," + this.profile.userImage} class="rounded float-start" alt="ProfileImage" style={{ maxWidth: '400px', maxHeight: '400px', marginBottom: '20px' }} />
                            {this.state.isPremium ? (
                                <React.Fragment>
                                    <p style={{ marginTop: "5%", fontSize: "large", color: "#75010f" }}>⭐ You are premium! ⭐</p>
                                    <p>Your subscription ends in: {this.state.endSubs}</p>
                                </React.Fragment>
                            ) : null
                            }
                        </div>
                        <div className='col-6'>
                            <h5>Description: </h5>
                            <p>{this.profile.description}</p>
                            <h5>Email: </h5>
                            <p>{this.profile.email}</p>
                            <h5>Technologies: </h5>
                            <p>{this.profile.technologies}</p>
                            <h5>Game List: </h5>
                            {this.profile.gameList == null ?
                                <p>You don't have any game on your list</p>
                                :
                                this.profile.gameList.length === 0 ?
                                    <p>You don't have any game on your list</p>
                                    :
                                    this.profile.gameList.map((item) => { return (item + ", ") })
                            }
                            <div class="container">
                                <div class="row">
                                    <h5 className="p-2">Followers: </h5> <button className="Button" onClick={this.showFollowers}>{this.state.followersNumber}</button>
                                    <h5 className="p-2">Following: </h5> <button className="Button" onClick={this.showFollowing}>{this.state.followingNumber}</button>
                                </div>
                            </div>


                        </div>

                    </div>
                    <button className="Button" onClick={this.modifyUserDetails} style={{ marginRight: "10px" }}>Edit</button>
                    <button className="Button" onClick={this.buySuscription}>Buy subscription</button>
                    {AuthService.isAuthenticated() ?
                        AuthService.getUserData().roles.includes("ADMIN") ?
                            <button className="AdminButton" onClick={this.goToAdminDashboard} style={{marginLeft:"10px"}}>Admin Dashboard</button>
                            :
                            <button className="Button" onClick={this.goToDashboard} style={{marginLeft:"10px"}}>Dashboard</button>
                        : null
                    }
                </div>
                <br/>
                <br/>
                <br/>
                </Card> */}
                <Card style={{backgroundColor:"#222933",border: "3px solid rgb(93, 92, 102)"}}>
                    <Card.Header><h2>User details</h2> </Card.Header>
                    
                    <Card.Body style={{backgroundColor:"#222933"}}>
                    <Row>
                    <Col xs="6">
                    <Card.Title><h2>{this.profile.username} </h2> </Card.Title>
                    <Card.Img width="40%" height="40%" src={"data:image/png;base64," + this.profile.userImage}  alt="ProfileImage" style={{ maxWidth: '400px', maxHeight: '1000px', marginBottom: '20px' }} />
                    {this.state.isPremium ? (
                                <React.Fragment>
                                    <p style={{  fontSize: "large", color: "#75510f" }}>⭐ You are premium! ⭐</p>
                                    <p>Your subscription ends in: {this.state.endSubs}</p>
                                </React.Fragment>
                            ) : null
                            }
                    <Row>
                    <Button variant="outline-primary" onClick={this.modifyUserDetails} style={{ marginRight: "10px" }}>Edit</Button>
                    <Button variant="outline-primary" onClick={this.buySuscription}>Buy subscription</Button>
                    {AuthService.isAuthenticated() ?
                        AuthService.getUserData().roles.includes("ADMIN") ?
                            <Button variant="outline-warning" onClick={this.goToAdminDashboard} style={{marginLeft:"10px"}}>Admin Dashboard</Button>
                            :
                            <Button variant="outline-primary" onClick={this.goToDashboard} style={{marginLeft:"10px"}}>Dashboard</Button>
                        : null
                    }
                    </Row>
                    </Col>
                    <Col xs="6">
                    <br/>
                               <Row>
                                    <h5>Followers: </h5> <Button variant="outline-primary" onClick={this.showFollowers}>{this.state.followersNumber}</Button>
                                    <h5>Following: </h5> <Button variant="outline-primary" onClick={this.showFollowing}>{this.state.followingNumber}</Button>
                                </Row>
                                
                            <h5>Description: </h5>
                            <p>{this.profile.description}</p>
                            <h5>Email: </h5>
                            <p>{this.profile.email}</p>
                            <h5>Technologies: </h5>
                            <p>{this.profile.technologies}</p>
                            <h5>Game List: </h5>
                            {this.profile.gameList == null ?
                                <p>You don't have any game on your list</p>
                                :
                                this.profile.gameList.length === 0 ?
                                    <p>You don't have any game on your list</p>
                                    :
                                    this.profile.gameList.map((item) => { return (item + ", ") })
                            }
                    </Col>
                    </Row>
                    </Card.Body>
                    
                </Card>
            </React.Fragment>
            
        );
    }

    render() {
        return (
            <React.Fragment>
                {AuthService.isAuthenticated() ?
                    this.getDetails()
                    :
                    this.props.history.push('/login')
                }
            </React.Fragment>
        );
    }

}

export default UserDetailsComponent;