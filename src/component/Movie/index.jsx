import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, GridListTileBar, GridListTile } from '@material-ui/core/';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		alignItems: 'flex-end',
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	gridListTile: {
		backgroundColor: 'red',
		bottom: '0',
	},
	title: {
		color: theme.palette.primary.light,
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
}));

const Movie = ({ item }) => {
	const classes = useStyles();

	return (
		<GridListTile spacing={2} className={classes.gridListTile}>
			<img
				src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
				alt={item.title}
				loading="lazy"
			/>
			<GridListTileBar
				title={item.title}
				classes={{
					root: classes.titleBar,
					title: classes.title,
				}}
				actionIcon={
					<IconButton aria-label={`star ${item.title}`}>
						<StarBorderIcon className={classes.title} />
					</IconButton>
				}
			/>
		</GridListTile>
	);
};

Movie.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		poster_path: PropTypes.string,
	}).isRequired,
};

export default Movie;
