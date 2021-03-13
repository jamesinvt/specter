import React from 'react';
import { Container, Box } from '@material-ui/core/';
import SearchBar from '../../component/SearchBar';

const NotFound = () => {
	return (
		<Container width={1/4} height="100%">
			<Box display='inline-block' alignItems='center' justifyContent='center' height="100%">
				<h3>404 Page Not Found</h3>
			</Box>
		</Container>
	);
};

export default NotFound;
