import React, { useEffect, useState, useRef, Children } from 'react';
import useStyles from './styles';

const Carousel = (props) => {
	const classes = useStyles(props);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [movement, setMovement] = useState(0);
	const [lastTouch, setLastTouch] = useState(0);

	const handleMovement = (delta) => {
		const length = Children.count(props.children) - 1;
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

	const renderChildren = () => {
		return Children.map(props.children, (item, index) => {
			return (
				<li
					className={`${
						currentIndex === index
							? classes.selectedImage
							: classes.nonSelectedImages
					}
						${classes.items}`}
				>
					{item}
				</li>
			);
		});
	};

	return (
		<div className={classes.root}>
			<ul
				className={classes.gridList}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{
					transform: `translateX(${
						movement * -1 +
						props.movementWidth -
						currentIndex * props.gap
					}px)`,
				}}
			>
				{renderChildren()}
			</ul>
		</div>
	);
};

export default Carousel;
