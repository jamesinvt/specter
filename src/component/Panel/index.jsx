import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Grid, Slide, ImageList } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Backdrop from '../Backdrop';
import Carousel from '../Carousel';
import useIntersect from '../../hooks/useIntersect';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		flexGrow: 1,
		height: '100vh',
		alignItems: 'flex-end',
		position: 'relative',
	},
}));

const Panel = ({ panel, group }) => {

	const handleCurrentIndexChange = (index) => {
		setCurrentIndex(
			index
		);
	};

	const handleActive = (item) => {
		setActiveItem(
			item
		);
	};

	const handleClick = (item, index) => {
		handleActive(item);
		console.log(`clicked index ${index}`)
		transitionTo(index);
	};
	const classes = useStyles();
	const ITEM_HEIGHT = 250;
	const ITEM_WIDTH = 150;
	const ITEM_SELECTED_HEIGHT = 300;
	const ITEM_SELECTED_WIDTH = 200;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [movement, setMovement] = useState(0);
	const [activeItem, setActiveItem] = useState(null);

	const [lastTouch, setLastTouch] = useState(0);
	const target = useRef(null);
	const inView = useIntersect(target, {once: true, threshold: 0.7});
	const [items, setItems ] = useState({});
	const { data, error, isLoading } = useFetch(`/remote/test/panel?panel=${panel}&group=${group}`);

	return (
		<Slide in mountOnEnter>
			<div className={classes.root} ref={target} data-test={panel} >
				<Carousel gap={12} handleActiveItem={handleCurrentIndexChange} itemWidth={ITEM_WIDTH} selectedItemWidth={ITEM_SELECTED_WIDTH}>
					{ data && data.results.map((item, index) => (
						<Link key={item.id} to={`/movie/${item.id}`}>
							<Movie
								key={item.id}
								item={item}
								isActive={index == currentIndex}
								handleActive={handleActive}
								index={index}
								className={classes.test}
								handleClick={handleClick}
							/>
						</Link>
					))}
				</Carousel>
				{activeItem && <Hidden smUp>
					<Backdrop image={`https://image.tmdb.org/t/p/w780${activeItem.backdrop_path}`} />
				</Hidden> }
			</div>
		</Slide>		
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
