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
	images: props => ({
		width: props.imgWidth,
		height: '200px',
		borderRadius: '10px',
		overflow: 'hidden',
	}),
	activeImage: {
		maxWidth: '200px',
		width: '200px',
		// height: '300px',
		borderRadius: '10px',
		overflow: 'hidden',
	},
	thumbnailText: {
		textAlign: 'center',
		whiteSpace: 'initial'
	},
}));

const Movie = (props) => {
	const { isActive, item, handleActive, index, imgWidth } = props;
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
		<ImageListItem onClick={onClick}>
			<div  className={!isActive ? classes.images : classes.activeImage}>
				<div style={{position:'relative'}}>
					<img
						className={!isActive ? classes.images : classes.activeImage}
						src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
						alt={item.title}
						loading="lazy"
					/>
					<ImageListItemBar
						actionIcon={
							<IconButton>
								<StarBorderIcon />
							</IconButton>
						}
						actionPosition="right"
					/>
				</div>
				<div>
					<ImageListItemBar
						title={item.title}
						position="below"
						className={classes.thumbnailText}
					/>
				</div>
			</div>
		</ImageListItem>
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
