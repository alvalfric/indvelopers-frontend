import React, { Component } from 'react';
import logo from '../assets/InDvelopersLogo.png'
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import { AuthService } from '../Services/AuthService';

class HeaderComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            
        }
    }

    showElements(){
      var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }

    }
    render() {
        return (
          
            
//             <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: '#9AD263'}}>
//   <a className="navbar-brand" href="#"><img src={logo} /></a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavDropdown">
//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"15px"}} href="#">Publicaciones <span class="sr-only">(current)</span></a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"15px"}} href="#">Novedades</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"15px"}} href="#">Juegos</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"15px"}} href="#">FAQ</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"15px"}} href="#">Sobre nosotros</a>
//       </li>
//       <li className="v-divider ">
//         <a className="nav-link" style={{fontSize:"120%",marginLeft:"70px"}} href="#">|</a>
//       </li>
//       <li className="nav-item" >
//       <button class="btn btn-outline-success my-2 my-sm-0"  type="submit">Login</button>
//       </li>
      
//     </ul>
//   </div>
// </nav>
    
    //  <nav>
    //      <ul className="lista">
    //        <li className="elemento"><a  href="#" ><img src={logo} width="260" height="50" /></a></li>
    //          <li className="elemento"><a className="linkElemento" href="#">Publicaciones</a></li>
    //          <li className="elemento"><a className="linkElemento" href="#">Novedades</a></li>
    //          <li className="elemento"><a className="linkElemento" href="#">Juegos</a></li>
    //          <li className="elemento"><a className="linkElemento" href="#">FAQ</a></li>
    //          <li className="elemento"><a className="linkElemento" href="#">Sobre nosotros</a></li>
    //          <li className="login"><a className="linkElemento" href="#">Login</a></li>
    //      </ul>
    //  </nav>

    <div className="topnav" id="myTopnav">
      <img src={logo} className="inDvelopers-logo" width="260" height="50" />
  <a href="/publication-List" >Publicaciones</a>
  <a href="#">Novedades</a>
  <a href="/games">Juegos</a>
  <a href="#">FAQ</a>
  <a href="#">Sobre nosotros</a>
  {AuthService.isAuthenticated()?
    <a href="/me" style={{float:"right", backgroundColor:"green"}}>User Details</a>
  :
    <React.Fragment>
      <a href="/sign-up" style={{float:"right", backgroundColor:"green"}}>Sign-up</a>
      <a href="/login" style={{float:"right", backgroundColor:"green"}}>Login</a>
    </React.Fragment>
  }
  <a href="#!" className="icon" onclick={this.showElements}>&#9776;</a>
</div>
// <nav className="Navbar">
 // <div className="Nav-container">

//   </div>
//   <ul className="Nav-menu">
//   <li className="Nav-item">
//       <a href="# "className="Nav-logo">
//       <img src={logo} className="inDvelopers-logo" width="260" height="50" />
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="# "className="Nav-links">
//         Publicaciones
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="#" className="Nav-links">
//         Novedades
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="#" className="Nav-links">
//         Juegos
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="#" className="Nav-links">
//         FAQ
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="#" className="Nav-links">
//         Sobre nosotros
//       </a>
//     </li>
//     <li className="Nav-item">
//       <a href="#" className="Nav-links">
//         Login
//       </a>
//     </li>
//   </ul>

// </nav> 
        );
    }
}

export default HeaderComponent;