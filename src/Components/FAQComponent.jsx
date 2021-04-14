import React, {Component} from "react";

class FAQComponent extends Component{

	render(){

		return(
			<div>
				<br></br>
				<br></br>
					<h1 className="text-center">FAQ</h1>

					<br></br>
					<br></br>
					
					<div className="text-center">
						
						<h2>Preguntas generales</h2>
						<br></br>

							<ul>
								<h5>¿Qué es inDvelopers?</h5>
								<div class="answer">“inDvelopers” es un portal dedicado para un grupo de desarrolladores, en concreto los
								desarrolladores indie o indie developers. Este tipo de desarrolladores se dedican principalmente
								al desarrollo de videojuegos de forma amateur, sin ninguna formación profesional previa. Tan
								solo se guían por su creatividad y su curiosidad por aprender sobre el mundo de los videojuegos
								y el trabajo y conocimiento que ello requiere.</div>
							</ul>
						<br></br>
						<br></br>

						<h2>Suscripciones</h2>
						<br></br>
							<ul>
								<h5>¿Para que sirven las suscripciones?</h5>
								<div class="answer">En inDvelopers tenemos dos modelos de suscripción, por 7,99€ podrás subir hasta 5 juegos 
								y recibir reembolso por ellos y por 11,99€ podrás colgar 10 juegos. Todo el dinero que ganes por tus juegos es para ti,
								nosotros solo nos llevamos la suscripción.</div>
							</ul>
						<br></br>
						<br></br>
						<h2>Juegos</h2>
						<br></br>
							<ul>
								<h5>¿Como puedo subir juegos?</h5>
								<div class="answer">Para subir juegos a inDvelopers tendraś que crearte una cuenta, subir el juego y esperar a que 
								un administrador lo verifique. Si quieres recibir beneficios por tus juegos, por solo 7,99€ podrás subir hasta 5 juegos 
								y recibir todo lo que ganes.</div>
							</ul>
						<br></br>
							<ul>
								<h5>¿Cómo van a encontrar otras personas mi juego?</h5>
								<div class="answer">Para que todos los juegos tengan la oportunidad de ser descubiertos por la comunidad contamos con 
								una página de novedades con un ranking de los juegos mejores puntuados y otro con los últimos juegos que se han subido y
								verificado en la plataforma</div>
							</ul>
						<br></br>
							<ul>
								<h5>¿Son seguros los juegos que voy a descargar?</h5>
								<div class="answer">Por supuesto! En inDvelopers seguimos un exhaustivo control de todos los juegos que se suben para
								asegurar que todos los usuarios de la página puedan descargar los juegos que quieran sin ningún problema</div>
							</ul>

							

					</div>
			</div>
		);
	}

}
export default FAQComponent;