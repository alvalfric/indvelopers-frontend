import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { SubscriptionService } from '../../Services/SubscriptionService';
import { DeveloperService } from '../../Services/DeveloperService';

class UserDetailsComponent extends Component {

    constructor(props) {
        super(props)
        this.profile = AuthService.getUserData()
        this.state = {
            isPremium: false,
            endSubs: "",
            followers: [],
            following: this.profile.following,
            followersNumber: 0,
            followingNumber: this.profile.following.length
        }
        this.modifyUserDetails = this.modifyUserDetails.bind(this);
        this.buySuscription = this.buySuscription.bind(this);
        this.showFollowers = this.showFollowers.bind(this);
        this.showFollowing = this.showFollowing.bind(this);

        SubscriptionService.checkHasSubscription().then((res) => {
            this.setState({ isPremium: res })
        })
        SubscriptionService.getSubscription(this.profile.id).then((res) => {
            this.setState({ endSubs: res.endDate })
        })
        console.log("isPREMIUM==>" + JSON.stringify(this.state.isPremium))
        console.log("DATE==>" + JSON.stringify(this.state.endSubs))
    }

    componentDidMount() {
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
                <h2>User details</h2>
                <div className='container' style={{ padding: '10px' }}>
                    <h3 style={{ paddingLeft: '1%' }}> {this.profile.username} </h3>
                    <div className='row'>
                        <div className='col'>
                            <img src={"data:image/png;base64," + this.profile.userImage} class="rounded float-start" alt="ProfileImage" style={{ maxWidth: '300px', maxHeight: '400px' }} />
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
                </div>
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