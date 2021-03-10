import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	ImageListItemBar,
	ImageListItem,
	Grid,
	Hidden,
} from '@material-ui/core/';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
	image: {

		// height: '300px',
		borderRadius: '10px',
		overflow: 'hidden',
		height: '100%',
		width: '100%'
	},
	thumbnailText: {
		textAlign: 'center',
		whiteSpace: 'initial'
	},
}));

const Movie = (props) => {
	const { isActive, item, handleActive, index } = props;
	const { handleClick } = props
	const classes = useStyles(props);

	const onClick = () => {
		handleClick(item, index);
	}
	useEffect(() => {
		if (isActive) {
			handleActive(item);
		}
	}, [isActive]);
	return (
		<div onClick={onClick}>
			<div  className={!isActive ? classes.images : classes.activeImage}>
				<div style={{position:'relative'}}>
					<img
						className={classes.image}
						src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
						alt={item.title}
						loading="lazy"
					/>
					{/* <ImageListItemBar
						actionIcon={
							<IconButton>
								<StarBorderIcon />
							</IconButton>
						}
						actionPosition="right"
					/> */}
				</div>
				<div>
					{/* <ImageListItemBar
						title={item.title}
						position="below"
						className={classes.thumbnailText}
					/> */}
				</div>
			</div>
		</div>
	);
};

Movie.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		poster_path: PropTypes.string,
	}).isRequired,
	isActive: PropTypes.bool.isRequired,
};

export default Movie;
