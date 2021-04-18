import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { DeveloperService } from '../../Services/DeveloperService';
import {SubscriptionService} from '../../Services/SubscriptionService';

class UserDetailsForAdminComponent extends Component {

    constructor(props){
        super(props)
        this.profile = this.props.history.location.state.profile
        this.state={
            isPremium:false,
            endSubs:""
        }
        this.modifyUserDetails=this.modifyUserDetails.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        
        SubscriptionService.checkHasSubscriptionById(this.profile.id).then((res)=>{
            this.setState({isPremium:res})
        })
        SubscriptionService.getSubscription(this.profile.id).then((res)=>{
            this.setState({endSubs:res.endDate})
        })
        console.log("isPREMIUM==>"+JSON.stringify(this.state.isPremium))
        console.log("DATE==>"+JSON.stringify(this.state.endSubs))
    }

    modifyUserDetails() {
        this.props.history.push({
            pathname:`/developers/edit/` + this.profile.id,
            state: { profile: this.profile }
        })

    }
    
    deleteUser(){
        DeveloperService.deleteDeveloper(this.profile.id).then((res)=>{
            alert(res);
            this.props.history.push("/listUsers");
        })
    }

    getDetails = () => {
        return(
            <React.Fragment>
            <h2>Detalles de usuario</h2>
            <div className='container' style={{padding: '10px'}}>
                <h3 style={{paddingLeft: '1%'}}> { this.profile.username } </h3>
            <div className='row'>
                <div className='col'>
                    <img src={"data:image/png;base64,"+ this.profile.userImage } className="rounded float-start" alt="ProfileImage" width="400" height="300" /> 
                    {this.state.isPremium?(
                    <React.Fragment>
                    <p style={{marginTop:"5%", fontSize: "large", color:"#75010f"}}>⭐ {this.profile.username} is premium! ⭐</p>
                    <p>La subscripción caduca en: {this.state.endSubs}</p>
                    </React.Fragment>
                    ):null
                    }  
                </div>
                <div className='col-6'>
                    <h5>Description: </h5>
                    <p>{ this.profile.description }</p>   
                    <h5>Email: </h5>
                    <p>{ this.profile.email }</p>   
                    <h5>Technologies: </h5>
                    <p>{ this.profile.technologies }</p>
                    <h5>Game List: </h5>
                    {this.profile.gameList == null?
                        <p>You don't have any game on your list</p>   
                    :
                    this.profile.gameList.length === 0?
                        <p>You don't have any game on your list</p>
                    :
                    this.profile.gameList.map((item) =>{ return(item + ", ") })
                    }
                
                </div>
                
            </div>
            {AuthService.getUserData().username === this.profile.username?
            <button className="Button" onClick={this.modifyUserDetails} style={{marginRight:"10px"}}>Edit</button>
            :null
            }
            {AuthService.getUserData().username != this.profile.username & AuthService.getUserData().roles.includes("ADMIN")?
                <button className="AdminButton" onClick={this.deleteUser} >Borrar desarrollador</button>
            :null
            }
            
            </div>
            </React.Fragment>
        );
    }

    render() {
        return(
            <React.Fragment>
                    {AuthService.isAuthenticated()?
                     this.getDetails()   
                     :
                     this.props.history.push('/login')
                    }           
            </React.Fragment>
        );
    }

}

export default UserDetailsForAdminComponent;