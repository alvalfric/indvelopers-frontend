import React, { Component } from 'react';
import UserLogo from '../../assets/userExample.png';
import PublicationService from '../../Services/PublicationService';

class ListPublicationComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            publications:[]
            
        }
    this.createPublication=this.createPublication.bind(this);
    }
    componentDidMount(){
      PublicationService.ListPublication().then((res)=>{
        this.setState({publications:res.data});
      })
    }
    createPublication(){
        this.props.history.push('/publication-Create')

    }

    render() {
        
        return (
            <div>
                <br></br>
                <br></br>
               <h2 className="text-center">Publicaciones de la comunidad</h2> 
               <div className="row">
                    <button className="Button" onClick={this.createPublication}>Publicar</button>
                </div>
                <br/>
     {/* Generate diferent for each publication */}
     {this.state.publications.map(
       publication=>
       <div>
         <br/>
       <div class="w3-card-4" >
    <header class="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>{publication.username}</h5>
    </header>

    <div class="w3-container">
      <p>{publication.text}</p>
    </div>
  </div>
  </div>
     )}
  {/* <div class="w3-card-4" >
    <header class="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>Usuario1</h5>
    </header>

    <div class="w3-container">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </p>
    </div>
  </div>
  <br/>
  <div class="w3-card-4" >
    <header class="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>Artemis</h5>
    </header>

    <div class="w3-container">
      <p>Si quereis aprender más sobre PlasticSCM, aquí os dejo un enlace: https://www.plasticscm.com/documentation . Es muy interesante y es una buena alternativa</p>
    </div>
  </div>
  <br/>
  <div class="w3-card-4" >
    <header class="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>Guillermo Belmonte</h5>
    </header>

    <div class="w3-container">
      <p>Unreal Engine es un motor gráfico que cada vez está siendo utilizado por muchisimas empresas, desde pequeños estudios indie hasta grandes multinacionales como bandai namco,square-enix o Sony. Pasaos a Unreal si quereis llegar a ser profesionales</p>
    </div>
  </div>
  <br/>
  <div class="w3-card-4" >
    <header class="w3-container ">
        <img/>
        <img src={UserLogo} className="inDvelopers-logo" width="3%" height="3%"  />
      <h5>Apollo13</h5>
    </header>

    <div class="w3-container">
      <p>No os rindais en vuestra lucha por entrar en la industria del videojuego. Las empresas de este mundillo buscan gente con experiencia personal. ¡Y ID LLAMANDO A LAS PUERTAS DE LAS EMPRESAS PREGUNTANDO POR PRÁCTICAS!</p>
    </div>
  </div> */}
     {/* Publications ends here. I should paginate in the future or maybe generate while scrolling as many webpages do */}
                
            </div>
        );
    }
}

export default ListPublicationComponent;