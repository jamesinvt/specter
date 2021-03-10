import React, { useEffect, useState, useRef, Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Grid, Slide, ImageList } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Backdrop from '../Backdrop';
import useIntersect from '../../hooks/useIntersect';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		
		flexGrow: 1,
		height: '100vh',
		alignItems: 'flex-end',
		position: 'relative',
	},
	gridList: props => ({
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		zIndex: '10',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
		position: 'relative',
		bottom: '100px',
		overflow: 'hidden',
		paddingLeft: `${props.gap}px`,
		gap: `${props.gap}px`
	}),
	selectedImage: props => ({
		width: props.selectedItemWidth,
		maxWidth: props.selectedItemWidth,
	}),
	nonSelectedImages: props => ({
		width: props.itemWidth,
		maxWidth: props.itemWidth,
	}),
	items: {
		listStyle: 'none',
	}
});



const Carousel = (props) => {
	const classes = useStyles(props);
	const handleMovement = (delta) => {
		const length = items.length - 1;
		let nextMovement = movement + delta;
		if (nextMovement < 0) {
			nextMovement = 0;
		}
		if (nextMovement > length * props.itemWidth) {
			nextMovement = length * props.itemWidth;
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
		setMovement(index * props.itemWidth);
		props.handleActiveItem(index);
	};
	
	const handleMovementEnd = () => {
		const endPosition = movement / props.itemWidth;
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

	const renderChildren = () => {
		return Children.map(props.children, (item, index) => {
			return(
				<li className={`${currentIndex === index ? classes.selectedImage : classes.nonSelectedImages} ${classes.items}` }>
					{item}
				</li>
			);
		});
	}
	
	const [currentIndex, setCurrentIndex] = useState(0);
	const [movement, setMovement] = useState(0);
	const [activeItem, setActiveItem] = useState(null);

	const [lastTouch, setLastTouch] = useState(0);
	const target = useRef(null);
	const [items, setItems ] = useState({});

	return(
		<div className={classes.root}>
			<ul className={classes.gridList}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{
				transform: `translateX(${
					movement * -1 + (props.selectedItemWidth / 2) - (currentIndex * props.gap)
				}px)`}}
			>
				{renderChildren()}
			</ul>
		</div>
	)
};



export default Carousel;
