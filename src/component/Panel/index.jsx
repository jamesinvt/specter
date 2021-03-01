import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
}));

const Panel = ({ panel, group }) => {
	const classes = useStyles();
	const [items, setItems] = useState([]);
	async function fetchData(url) { 
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	}
	useEffect(() => {
		
		fetchData(`/remote/test/panel?panel=${panel}&group=${group}`).then(
			(fetchedData) => {
				setItems(fetchedData.data.results);
			}
		);
	}, [panel, group]);
	return (
		<div className={classes.root}>
			<GridList spacing={10} cols={2.5} rows={1} className={classes.gridList}>
				{items.map((item) => (
					<Movie key={item.id} item={item} />
				))}
			</GridList>
		</div>
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
