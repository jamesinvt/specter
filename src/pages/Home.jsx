import React, { useEffect, useState } from 'react';
import Panel from '../component/Panel';
import { Container } from '@material-ui/core/';

const Home = () => {
	return (
		<Container disableGutters={true} width={1}>
			<Panel panel="popular" group="streaming" />
			{/* <Panel panel="trending" group="day" />  */}
		</Container>
	);
};

export default Home;
