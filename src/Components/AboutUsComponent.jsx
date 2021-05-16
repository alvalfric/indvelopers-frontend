import React, {Component} from "react";
import user from '../assets/userExample.png'
import fernando from '../assets/equipo/Fernando_Wals_Rodriguez.png'
import alvaro from '../assets/equipo/Alvaro_Alferez.png'
import david from '../assets/equipo/David_Cáceres_Romero.png'
import elena from '../assets/equipo/Elena_España.png'
import francisco from '../assets/equipo/Francisco_Javier_García.png'
import gonzalo from '../assets/equipo/Gonzalo_Fernández_Jiménez.png'
import guillermo from '../assets/equipo/Guillermo_Pavon.png'
import juan from '../assets/equipo/Juan_Pablo_Portero_Montaño.png'
import luis from '../assets/equipo/Luis_Pardo_López.png'
import marta from '../assets/equipo/Marta_Díaz_Fernández.png'
import moises from '../assets/equipo/Moises_Romero.png'
import alejandro from '../assets/equipo/Alejandro_González_Martín.png'

class AboutUsComponent extends Component{
	
	render(){
		return (
			<div>
				<br></br>
				<br></br>

				<div className="text-center">
				
					<h1>inDvelopers</h1>
					<br></br>
					<p className="TextRes">
					"InDvelopers" is a portal dedicated to indie developers.
                    This type of developers are mainly dedicated
                    to the development of video games in an amateur way, without any previous professional training. So
                    they are only guided by their creativity and their curiosity to learn about the world of video games
                    and the work and knowledge that it requires.
					</p>
				</div>

				<br></br>
				<br></br>
				<div className="text-center">
					<h1 className="SubTitleRes">Our team</h1>
					<div class="row">
						<div class="col"> 
							<br></br>
							<div class="container">
								<img src={fernando} alt="Fernando" width={70}/>
								<h3 className="TextRes"> Fernando Wals</h3>
								<p className="TextRes">Project Manager</p>
								<p className="TextRes">Developer</p>
							</div>

							<div class="container">
								<img src={juan} alt="Juan Pablo" width={90}/>
								<h3 className="TextRes"> Juan Pablo Portero</h3>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>
							<br></br>
							<div class="container">
								<img src={moises} alt="Moises" width={90}/>
								<h3 className="TextRes"> Moisés Romero</h3>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>

							<div class="container">
								<img src={david} alt="David" width={80}/>
								<h3 className="TextRes"> David Cáceres</h3>
								<p className="TextRes">Developer</p>
							</div>
						
						 </div>
						<div class="col"> 
							<br></br>
							<div class="container">
								<img src={alvaro} alt="Alvaro" width={60}/>
								<h3 className="TextRes"> Álvaro Alferez</h3>
								<p className="TextRes">Back End manager</p>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>
							<div class="container">
								<img src={alejandro} alt="Alejandro" width={50}/>
								<h3 className="TextRes"> Alejandro González</h3>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>
							<br></br>
							<div class="container">
								<img src={gonzalo} alt="Gonzalo" width={75}/>
								<h3 className="TextRes"> Gonzalo Fernández</h3>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>

							<div class="container">
								<img src={marta} alt="Marta" width={80}/>
								<h3 className="TextRes"> Marta Diaz</h3>
								<p className="TextRes">Developer</p>
							</div>
						
						</div>
						<div class="col">  
						
							<div class="container">
								<img src={francisco} alt="Francisco Javier" width={60}/>
								<h3 className="TextRes"> Francisco Javier García</h3>
								<p className="TextRes">Data Protection Officer</p>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>
							<br></br>
							<br></br>

							<div class="container">
								<img src={elena} alt="Elena" width={140}/>
								<h3 className="TextRes"> Elena España</h3>
								<p className="TextRes">Marketing director</p>
								<p className="TextRes">Developer</p>
							</div>

							<div class="container">
								<img src={guillermo} alt="Guillermo" width={90}/>
								<h3 className="TextRes"> Guillermo Pavon</h3>
								<p className="TextRes">Developer</p>
							</div>

							<br></br>
							<div class="container">
								<img src={luis} alt="Luis" width={80}/>
								<h3 className="TextRes"> Luis Pardo</h3>
								<p className="TextRes">Developer</p>
							</div>
						
						</div>
					
					</div>
				</div>
			</div>
				
			
		);
	}	
}
export default AboutUsComponent;