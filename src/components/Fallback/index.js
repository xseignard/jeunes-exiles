import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';

import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';

const Home = props => {
	return (
		<div className="layer">
			<Header />
			<div className="content p20">
				<p>Continuez la lecture de ce numéro en parcourant ces contenus :</p>
				<List>
					<ListItem
						primaryText="- Son // Seïtinta, trois ans pour arriver jusqu’ici"
						style={{ fontFamily: 'archer-book, serif' }}
						onClick={e =>
							(window.location =
								'https://lesautrespossibles.fr/jeunes-exiles-seitinta/#fallback')}
					/>
					<ListItem
						primaryText="- Son // Le récit de Lamte de la Guinée à Nantes"
						style={{ fontFamily: 'archer-book, serif' }}
						onClick={e =>
							(window.location =
								'https://lesautrespossibles.fr/jeunes-exiles-lamte/#fallback')}
					/>
					<ListItem
						primaryText="- Diaporama sonore // Regards sur la ville"
						style={{ fontFamily: 'archer-book, serif' }}
						onClick={e =>
							(window.location =
								'https://lesautrespossibles.fr/jeunes-exiles-etrange-miroir/#fallback')}
					/>
					<ListItem
						primaryText="- En musique // Tammam rappe l’exil de la Syrie à Saint-Nazaire"
						style={{ fontFamily: 'archer-book, serif' }}
						onClick={e =>
							(window.location =
								'https://lesautrespossibles.fr/jeunes-exiles-tammam/#fallback')}
					/>
					<ListItem
						primaryText="- En vidéo // Un micro-documentaire lycéen sur la scolarisation des exilés"
						style={{ fontFamily: 'archer-book, serif' }}
						onClick={e =>
							(window.location =
								'https://lesautrespossibles.fr/jeunes-exiles-lucie/#fallback')}
					/>
				</List>
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

export default Home;
