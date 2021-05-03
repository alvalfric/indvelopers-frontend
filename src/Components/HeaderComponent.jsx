import React, { Component } from 'react';
import logo from '../assets/InDvelopersLogo.png'
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import { AuthService } from '../Services/AuthService';
import emailjs from 'emailjs-com';


var userID = "user_cjoUNnSdhjrPLOuDAUP2z"

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

  logout() {
    AuthService.logout().then(() => {
      alert("You have logged out successfully!");
      window.location.reload();
    })
  }

  render() {
    return (
      <div className="topnav" id="myTopnav">
        <a href="/"><img src={logo} className="inDvelopers-logo" width="140" height="26" /></a>
        <a href="/publication-List" >Publications</a>
        <a href="/novedades">News</a>
        <a href="/games">Games</a>
        <a href="/faq">FAQ</a>
        <a href="/about-us">About us</a>
        {AuthService.isAuthenticated() ?
          <React.Fragment>
            <a href="/" style={{ float: "right", backgroundColor: "#cf0000" }} onClick={this.logout}>Logout</a>
            <a href="/me" style={{ float: "right", backgroundColor: "#2f47b4" }}>{AuthService.getUserData()['username']}</a>

            {AuthService.getUserData()['roles'].indexOf('ADMIN') != -1 ?
              <React.Fragment>
                <a href="/listUsers" className="AdminButton" style={{ color: "black" }}>List users</a>
              </React.Fragment>
              :
              <React.Fragment>

              </React.Fragment>
            }

          </React.Fragment>
          :
          <React.Fragment>
            <a href="/sign-up" style={{ float: "right", backgroundColor: "#2f47b4" }}>Sign-up</a>
            <a href="/login" style={{ float: "right", backgroundColor: "#2f47b4" }}>Login</a>
          </React.Fragment>
        }

        <script type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"></script>
        <script type="text/javascript">
          (function(){emailjs.init(userID)})();
              </script>
        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
      </div>
    );
  }
}

export default HeaderComponent;