import React from 'react';
import { Container, Grid } from '@material-ui/core/';
import SearchBar from '../../component/SearchBar';

const Home = () => {
	return (
		<Container width={1}>
			<Grid container>
				<Grid item xs={12}>
					<SearchBar suggestSearches />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
