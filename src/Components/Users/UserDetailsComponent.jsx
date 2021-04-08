import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';

class UserDetailsComponent extends Component {

    constructor(props){
        super(props)
        this.profile = AuthService.getUserData()
        this.state={
        }
        this.modifyUserDetails=this.modifyUserDetails.bind(this);
        this.buySuscription=this.buySuscription.bind(this);
    }

    modifyUserDetails() {
        this.props.history.push({
            pathname:`/developers/edit/` + this.profile.id,
            state: { profile: this.profile }
        })

    } 
    buySuscription(){
        this.props.history.push("/buySubscription");
    }

    getDetails = () => {
        return(
            <React.Fragment>
            <h2>Detalles de usuario</h2>
            <div className='container' style={{padding: '10px'}}>
                <h3 style={{paddingLeft: '1%'}}> { this.profile.username } </h3>
            <div className='row'>
                <div className='col'>
                    <img src={ this.profile.email } class="rounded float-start" alt="ProfileImage" /> 
                    {this.profile.isPremium?
                    <p style={{marginTop:"5%", fontSize: "large", color:"#75010f"}}>⭐ You are premium! ⭐</p>
                    :null
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
            <button className="Button" onClick={this.modifyUserDetails} style={{marginRight:"10px"}}>Edit</button> 
            <button className="Button" onClick={this.buySuscription}>Comprar subscripción</button>
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

export default UserDetailsComponent;