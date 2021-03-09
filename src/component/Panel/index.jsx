import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Grid, Slide, ImageList } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
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
	gridList: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		zIndex: '10',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
		position: 'relative',
		bottom: '100px',
		overflow: 'visible',
		paddingLeft: '12px'
	},
	selectedImage: {},
	nonSelectedImages: {
		width: '150px',
		height: '225px',
		display: 'none',
	},
	background: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'auto',
		backgroundPosition: 'center top',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '0',
	},
	gradient: {
		background:
			`linear-gradient(360deg, ${theme.palette.background.default} 45%, rgba(255,255,255,0) 100%);`,
		alignItems: 'flex-end',
		display: 'flex',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '1',
	},
	movies: {
		position: 'absolute'
	},
	test: {display:'none'}
}));



const Panel = ({ panel, group }) => {

	const handleMovement = (delta) => {
		console.log('in handle movement');
		const length = items.length - 1;
		let nextMovement = movement + delta;
		if (nextMovement < 0) {
			nextMovement = 0;
		}
		if (nextMovement > length * ITEM_WIDTH) {
			nextMovement = length * ITEM_WIDTH;
		}
		setMovement(nextMovement);
	};
	
	const handleTouchStart = (e) => {
		setLastTouch(e.nativeEvent.touches[0].clientX);
	};
	const handleTouchMove = (e) => {
		const delta = lastTouch - e.nativeEvent.touches[0].clientX;
		setLastTouch(e.nativeEvent.touches[0].clientX);
		handleMovement(delta);
	};
	const handleTouchEnd = () => {
		handleMovementEnd();
		setLastTouch(0);
	};
	const handleWheel = (e) => {
		handleMovement(e.deltaX);
	};
	const transitionTo = (index) => {
		setCurrentIndex(index);
		// console.log('nextMovement: ' + index);
		setMovement(index * ITEM_WIDTH);
	};
	
	const handleMovementEnd = () => {
		const endPosition = movement / ITEM_WIDTH;
		const endPartial = endPosition % 1;
		const endingIndex = endPosition - endPartial;
		const deltaInteger = endingIndex - currentIndex;
		let nextIndex = endingIndex;
	
		if (deltaInteger >= 0) {
			if (endPartial >= 0.3) {
				nextIndex += 1;
			}
		}
		
		transitionTo(nextIndex);
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
		<div className={classes.root} ref={target} data-test={panel} >
			<Slide in mountOnEnter>
				<div  className={classes.root}>
					<ImageList
						gap={12}
						className={classes.gridList}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						style={{
						transform: `translateX(${
							movement * -1 + (ITEM_WIDTH / 2) - (currentIndex * 12)
						}px)`
					}}>
						{ data && data.results.map((item, index) => (
							<Link key={item.id} to={`/movie/${item.id}`}>
								<Movie
									imgWidth={ ITEM_WIDTH }
									key={item.id}
									isActive={currentIndex === index}
									item={item}
									handleActive={handleActive}
									index={index}
									className={classes.test}
									handleClick={handleClick}
								/>
							</Link>
						))}
					</ImageList>				
					{activeItem && <Hidden smUp>
						<div className={classes.gradient} />
						<div
							style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w780${activeItem.backdrop_path})`,
						}}
							className={classes.background}
					/>
					</Hidden> }
				</div>
			</Slide>
		</div>
		
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
