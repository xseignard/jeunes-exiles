import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/Home';
import AR from './components/AR';
import Fallback from './components/Fallback';
import Thanks from './components/Thanks';

const history = createBrowserHistory();

const Routes = props => (
	<Router history={history}>
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/AR" component={AR} />
			<Route exact path="/fallback" component={Fallback} />
			<Route exact path="/thanks" component={Thanks} />
		</div>
	</Router>
);

export default Routes;
