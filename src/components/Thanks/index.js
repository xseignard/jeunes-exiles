import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';

const Thanks = props => {
	return (
		<div className="layer">
			<Header />
			<div className="content p20">
				<h2 className="title">REMERCIEMENTS</h2>
				<p>Ils ont participé à ce numéro augmenté :</p>
				<p>
					<strong>Seïtinta</strong>, <strong>Lepitt</strong>, <strong>Lamte</strong> et
					tous les jeunes exilés qui ont accepté de nous raconter leur parcours et leur
					quotidien à Nantes, lors d'un atelier cartographique.
				</p>
				<p>
					<strong>Étrange Miroir</strong> pour le partage des diaporamas sonores réalisés
					dans le cadre du projet Autre Regard, co-produits avec la Médiathèque Jacques
					Demy.
				</p>
				<p>
					Le <strong>Lycée Guist'hau</strong>, les élèves et professeurs de la classe
					cinéma.
				</p>
				<p>
					<strong>Dessins Sans Papiers</strong>, pour le partage des oeuvres réalisées par
					les jeunes exilés lors de ses ateliers.
				</p>
				<p>
					<strong>Xavier Seignard</strong>, développeur créatif qui expérimente à nos
					côtés les liens entre papier et contenu multimédia.
				</p>
			</div>
			<div>
				<div className="p20">
					<Button label="Retour" link="/" history={props.history} />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Thanks;
