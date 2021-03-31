import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../SearchBar';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	search: {
		minWidth: '200px'
	}
	// title: {
	// 	flexGrow: 1,
	// }
}));

const Navigation = () => {
	const classes = useStyles();
	return (
		// <AppBar position="fixed" color="transparent">
		<AppBar position="sticky" color="transparent">
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					News
				</Typography>
				{/* <div className={classes.search}>
					<SearchBar suggestSearches />
				</div> */}
				<Button>Login</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;
