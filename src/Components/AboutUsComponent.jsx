import React, {Component} from "react";
import user from '../assets/userExample.png'

class AboutUsComponent extends Component{
	
	render(){
		return (
			<div>
				<br></br>
				<br></br>

				<div className="text-center">
				
					<h1>inDvelopers</h1>
					<br></br>
					<p>
						“inDvelopers” es un portal dedicado a los desarrolladores indie o indie developers. 
						Este tipo de desarrolladores se dedican principalmente
						al desarrollo de videojuegos de forma amateur, sin ninguna formación profesional previa. Tan
						solo se guían por su creatividad y su curiosidad por aprender sobre el mundo de los videojuegos
						y el trabajo y conocimiento que ello requiere.
					</p>
				</div>

				<br></br>
				<br></br>
				<div className="text-center">
					<h1>Nuestro equipo</h1>
					<div class="row">
						<div class="col"> 
						
							<div class="container">
								<img src={user} alt="Fernando" width={50}/>
								<h3> Fernando Wals</h3>
								<p>Project Manager</p>
							</div>

							<div class="container">
								<img src={user} alt="Juan Pablo" width={50}/>
								<h3> Juan Pablo Portero</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Moises" width={50}/>
								<h3> Moises Romero</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="David" width={50}/>
								<h3> Davi Cáceres</h3>
								<p>Desarrollador</p>
							</div>
						
						 </div>
						<div class="col"> 
						
							<div class="container">
								<img src={user} alt="Alvaro" width={50}/>
								<h3> Alvaro Alferez</h3>
								<p>Jefe Back End</p>
							</div>

							<div class="container">
								<img src={user} alt="Alejandro" width={50}/>
								<h3> Alejandro Gonzalez</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Gonzalo" width={50}/>
								<h3> Gonzalo Fernández</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Marta" width={50}/>
								<h3> Marta Diaz</h3>
								<p>Desarrollador</p>
							</div>
						
						</div>
						<div class="col">  
						
							<div class="container">
								<img src={user} alt="Juan Pablo" width={50}/>
								<h3> Juan Pablo</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Elena" width={50}/>
								<h3> Elena España</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Guillermo" width={50}/>
								<h3> Guillermo Pavon</h3>
								<p>Desarrollador</p>
							</div>

							<div class="container">
								<img src={user} alt="Luis" width={50}/>
								<h3> Luis Pardo</h3>
								<p>Desarrollador</p>
							</div>
						
						</div>
					
					</div>
				</div>
			</div>
				
			
		);
	}	
}
export default AboutUsComponent;