import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core/';
import Home from '../pages/Home';

const SpecterApp = () => {
	return (
		<Router>
			<Container disableGutters={true} width={1}>
				<h3>Specter says hello</h3>
				<Home />
			</Container>
		</Router>
	);
};

export default SpecterApp;
