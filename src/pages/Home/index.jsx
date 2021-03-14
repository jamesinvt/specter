import React from 'react';
import { Container, Slide, useScrollTrigger } from '@material-ui/core/';
import Panel from '../../component/Panel';

const Home = () => {
	return (
		<Container disableGutters width={1}>
			<Panel panel="popular" group="streaming" />
			<Panel panel="trending" group="day" />
		</Container>
	);
};

export default Home;
