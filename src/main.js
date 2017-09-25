import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './main.css';

import Routes from './routes';

const App = () => (
	<MuiThemeProvider>
		<Routes />
	</MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
