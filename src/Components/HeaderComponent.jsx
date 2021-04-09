import React, { Component } from 'react';
import logo from '../assets/InDvelopersLogo.png'
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import { AuthService } from '../Services/AuthService';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  showElements() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }

  }
  render() {
    return (

      <div className="topnav" id="myTopnav">
        <a href="/"><img src={logo} className="inDvelopers-logo" width="140" height="26" /></a>
        <a href="/publication-List" >Publicaciones</a>
        <a href="#">Novedades</a>
        <a href="/games">Juegos</a>
        <a href="#">FAQ</a>
        <a href="#">Sobre nosotros</a>
        {AuthService.isAuthenticated() ?
          <React.Fragment>
            <a href="/logout" style={{ float: "right", backgroundColor: "red" }}>Logout</a>
            <a href="/me" style={{ float: "right", backgroundColor: "green" }}>{AuthService.getUserData()['username']}</a>

            {AuthService.getUserData()['roles'].indexOf('ADMIN') != -1 ?
              <React.Fragment>
                <a href="/listUsers" className="AdminButton" style={{color:"black"}}>List users</a>
              </React.Fragment>
              :
              <React.Fragment>

              </React.Fragment>
            }

          </React.Fragment>
          :
          <React.Fragment>
            <a href="/sign-up" style={{ float: "right", backgroundColor: "green" }}>Sign-up</a>
            <a href="/login" style={{ float: "right", backgroundColor: "green" }}>Login</a>
          </React.Fragment>
        }
        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
      </div>
    );
  }
}

export default HeaderComponent;