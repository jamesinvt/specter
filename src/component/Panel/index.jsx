import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';

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

const Panel = ({ panel, group }) => {
	const classes = useStyles();

	const [items, setItems] = useState([]);
	useEffect(async () => {
		const response = await fetch(
			`/remote/test/panel?panel=${panel}&group=${group}`
		);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		setItems(body.data.results);
	}, []);
	return (
		<Box className={classes.root}>
			<GridList className={classes.gridList} cols={2.5}>
				{items.map((item) => (
					<Movie key={item.id} item={item} />
				))}
			</GridList>
		</Box>
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
