import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './main.css';

import Routes from './routes';

injectTapEventPlugin();

const App = () => (
	<MuiThemeProvider>
		<Routes />
	</MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
