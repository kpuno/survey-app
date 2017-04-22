import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LandingPage extends Component {
	render() {
		return (
			<div>
				<header className="bg-image">
					<div className="containers">
						<h1>Survey Krafter</h1>
						<h2>Search active surveys and complete them all!</h2>
						<Link to="/searchsurvey" className="btn btn-transparent btn-primary">Search Survey Now!</Link>
					</div>
				</header>

				<section className="">
					<div className="containers">
						<div className="col-3 text--center">
							<img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t34.0-12/18073242_10159016072850725_2103574016_n.png?oh=c0364076aa73a1e6e75ca4bdbf98e2ba&oe=58FDAAE9" alt="" className="details-img--ball" />
						</div>
						<div className="col-7 details">
							<h3>Product is so awesome.</h3>
							<p>This product is so awesome, creating a survey has never been so easy. This product is so awesome, doing surveys has never been so easy. This product is so awesome, searching surveys has never been so easy!</p>
						</div>
					</div>
				</section>

				<section className="section--primary">
					<div className="containers">
						<div className="col-3 features">
							<i className="fa fa-bolt"></i>
							<p>
								Product so awesome. Makes you awesome - go sign up!
      </p>
						</div>
						<div className="col-3 features">
							<i className="fa fa-bank"></i>
							<p>
								Product so great. Makes you even greater - go sign up now. Super free deal!
      </p>
						</div>
						<div className="col-3 features">
							<i className="fa fa-heart"></i>
							<p>
								Feel lonely? Go do a survey  and have a friend complete it!
      </p>
						</div>
					</div>
				</section>

				<section className="section--primary--alt">
					<div className="containers">
						<h3>Take Product with you everywhere you go.</h3>
						<p>Product is all you need. Anywhere - ever. No more survey monkey or other websites, just use this one!</p>
					</div>
				</section>

				<section className="section--primary--light">
					<div className="containers">
						<blockquote className="testimonial">
							<p>Love product. So nice! So good! Could not live without!</p>
							<cite>
								Satisfied Customer
      </cite>
						</blockquote>
					</div>
				</section>


				<section className="section--primary--alt bg-image bg-image-2">
					<div className="containers text--center">
						<h3>Reasons to buy this product:</h3>
						<div className="col-5 text--left">
							<ul>
								<li>Its the best</li>
								<li>Its awesome</li>
								<li>It makes you happy</li>
								<li>It brings world peace</li>
								<li>Its free!</li>
							</ul>
						</div>
						<div className="col-5 text--left">
							<ul>
								<li>Its the best</li>
								<li>Its awesome</li>
								<li>It makes you happy</li>
								<li>It brings world peace</li>
								<li>Its free!</li>
							</ul>
						</div>
					</div>
				</section>

				<section className="text--center">
					<div className="containers">
						<h3>Why you still reading?</h3>
						<Link to="/signin" className="btn btn-transparent btn-primary">Create a Survey Now!</Link>
					</div>
				</section>

				<footer>
					<div className="containers">
						<ul>
							<li><a href="#">Impressum</a></li>
							<li><a href="#">Contact</a></li>
							<li><a href="#">Mainpage</a></li>
						</ul>
						<p>&copy; 2014 dat Company. All rights reserved.</p>
					</div>
				</footer>
			</div>
		)
	}
}