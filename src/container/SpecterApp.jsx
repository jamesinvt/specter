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
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
const SpecterApp = () => {
	return (
		<Router>
			<SpecterTheme>
				<Container disableGutters>
					<NavBar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route
							path="/movie/:id"
							render={(props) => (
								<MovieFullView />
							)}
						/>
						<Route exact path="/search">
							<Search />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Container>
			</SpecterTheme>
		</Router>
	);
};

export default SpecterApp;
