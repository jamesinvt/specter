import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core/';
import Home from '../pages/Home';
import NavBar from '../component/Navbar';

const SpecterApp = () => {
	return (
		<Router>
			<Container disableGutters width={1}>
				{/* <NavBar /> */}
				<Home />
			</Container>
		</Router>
	);
};

export default SpecterApp;
