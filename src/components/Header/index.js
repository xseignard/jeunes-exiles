import React from 'react';

import Liseret from '../Liseret';

import './style.css';
import logo from './logo.png';

const Header = () => {
	return (
		<div>
			<div className="header">
				<img className="logo" src={logo} alt="logo" />
			</div>
			<Liseret />
		</div>
	);
};

export default Header;
