import React from 'react';
import { Link } from 'react-router-dom';

import Liseret from '../Liseret';

import './style.css';

const Footer = () => {
	return (
		<div className="footer">
			<Liseret />
			<div id="footer-links">
				<a
					href="https://www.facebook.com/lemapnantes/"
					target="_blank"
					className="footer-link"
				>
					<img
						className="footer-img"
						src="https://lesautrespossibles.fr/wp-content/themes/html5blank-stable/img/facebook-c.png"
						alt="icone facebook"
					/>
				</a>
				<a
					href="https://twitter.com/AutresPossibles"
					target="_blank"
					className="footer-link"
				>
					<img
						className="footer-img"
						src="https://lesautrespossibles.fr/wp-content/themes/html5blank-stable/img/twitter-c.png"
						alt="icone twitter"
					/>
				</a>
				<a
					href="https://www.instagram.com/lesautrespossibles/"
					target="_blank"
					className="footer-link"
				>
					<img
						className="footer-img"
						src="https://lesautrespossibles.fr/wp-content/themes/html5blank-stable/img/instagram-c.png"
						alt="icone instagram"
					/>
				</a>
				<Link className="footer-link" to="/thanks">
					<img className="footer-img" src="assets/img/thanks.png" alt="icone thanks" />
				</Link>
			</div>
		</div>
	);
};

export default Footer;
