import React, { Component } from "react";

class FAQComponent extends Component {

	render() {

		return (
			<div>
				<br></br>
				<br></br>
				<h1 className="text-center">FAQ</h1>

				<br></br>
				<br></br>

				<div className="text-center">

					<h2 className="SubTitleRes">Terms and Conditions and Privacy Policy</h2>
					<br></br>

					<ul>
						<h5 className="TextRes">After signing up, where can I read the terms and conditions and the Privacy Policy of the website again?</h5>
						<div className="TextRes">We hope everything stays clear after reading the Terms and Conditions and the Privacy Policy
						of the website, but if you want to read them again here are the links:
								<ul>
								<li className="TextRes"><a href="/termsAndConditions">Terms and Conditions according to the GDPR legislation</a></li>
								<li className="TextRes"><a href="/privacyPolicy">Privacy Policy</a></li>
							</ul>
						</div>
					</ul>
					<br></br>
					<br></br>

					<h2 className="SubTitleRes">Frequently asked questions</h2>
					<br></br>

					<ul>
						<h5 className="TextRes">What is inDvelopers?</h5>
						<div className="TextRes">"InDvelopers" is a dedicated portal for a group of developers, specifically the
						indie developers or indie developers. This type of developers are mainly dedicated
						to the development of video games in an amateur way, without any previous professional training. So
						They are only guided by their creativity and their curiosity to learn about the world of video games
                                and the work and knowledge that it requires.</div>
					</ul>
					<br></br>
					<br></br>

					<h2 className="SubTitleRes">Suscriptions</h2>
					<br></br>
					<ul>
						<h5 className="TextRes">What are subscriptions for?</h5>
						<div className="TextRes">In inDvelopers we have two subscription models, for € 7.99 you can upload up to 5 games
						and receive a refund for them and for € 11.99 you can hang 10 games. All the money you earn for your games is for you,
                                we only get the subscription.</div>
					</ul>
					<br></br>
					<br></br>
					<h2 className="SubTitleRes">Games</h2>
					<br></br>
					<ul>
						<h5 className="TextRes">How can i upload games?</h5>
						<div className="TextRes">To upload games to inDvelopers you will have to create an account, upload the game and wait for
						an administrator verifies it. If you want to receive benefits for your games, for only € 7.99 you can upload up to 5 games
                                and receive everything you earn.</div>
					</ul>
					<br></br>
					<ul>
						<h5>How other people will find my game?</h5>
						<div className="TextRes">In order to all games have the opportunity to be discovered by the community we have
						a news page with a ranking of the highest rated games and another with the latest games that have been uploaded and
                                verified on the platform</div>
					</ul>
					<br></br>
					<ul>
						<h5 className="TextRes">Are safe the games I'm going to download?</h5>
						<div className="TextRes">Of course! In inDvelopers we follow an exhaustive control of all the games that are uploaded to
                                 ensure that all users of the page can download the games they want without any problem</div>
					</ul>
				</div>
			</div>
		);
	}
	
}
export default FAQComponent;