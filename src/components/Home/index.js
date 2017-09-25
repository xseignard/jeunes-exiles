import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';

const Home = props => {
	let content = null;
	let link = '';
	let ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	if (navigator.getUserMedia) {
		content = (
			<div>
				<p>
					Pour découvrir les lectures, diaporamas sonores et les vidéos liés au dossier et
					à la carte, c’est simple :
				</p>
				<p>Cliquez sur le bouton démarrer ci-dessous !</p>
				<p>
					La caméra de votre smartphone va s'allumer, parcourez alors le journal papier
					pour découvrir le contenu complémentaire.
				</p>
				<p>Go !</p>
			</div>
		);
		link = '/AR';
	} else if (ios) {
		content = (
			<div>
				<p>Oups...</p>
				<p>
					Il semblerait que vous êtes propriétaire d'un iPhone. Mais vous n'avez pas
					encore opéré la mise à jour de votre iOS.
				</p>
				<p>Pas de panique !</p>
				<p>
					Si votre caméra ne peut pas reconnaître les QR code, cliquez sur "démarrer" pour
					afficher les différents contenus augmentés proposés par notre équipe.
				</p>
			</div>
		);
		link = '/fallback';
	} else {
		content = (
			<div>
				<p>Oups...</p>
				<p>
					Il semblerait que votre smartphone ne permet pas d'utiliser la réalité
					augmentée.
				</p>
				<p>Pas de panique !</p>
				<p>
					Si votre caméra ne peut pas reconnaître les QR code, cliquez sur "démarrer" pour
					afficher les différents contenus augmentés proposés par notre équipe.
				</p>
			</div>
		);
		link = '/fallback';
	}
	return (
		<div className="layer">
			<Header />
			<div className="content p20">
				<h2 className="title">Bienvenue !</h2>
				{content}
			</div>
			<div>
				<div className="p20">
					<Button label="Démarrer" link={link} history={props.history} />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
