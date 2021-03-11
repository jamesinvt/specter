import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core/';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
	useTheme,
} from '@material-ui/core/styles';
import SpecterTheme from '../theme';
import Home from '../pages/Home';
import MovieFullView from '../pages/MovieFullView';
import NavBar from '../component/Navbar';
const SpecterApp = () => {
	return (
		<Router>
			<SpecterTheme>
				<Container disableGutters width={1}>
					<NavBar />
					<Switch>
						<Route exact="true" path="/">
							<Home />
						</Route>
						<Route
							path="/movie/:id"
							render={(props) => (
								<MovieFullView
									{...props}
									key={props.match.params.id}
								/>
							)}
						/>
					</Switch>
				</Container>
			</SpecterTheme>
		</Router>
	);
};

export default SpecterApp;
