import React, { useEffect, useState, useRef } from 'react';
import { Hidden, Grid, Slide, ImageList, Avatar } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Backdrop from '../Backdrop';
import Carousel from '../Carousel';
import useIntersect from '../../hooks/useIntersect';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const ActorPanel = (props) => {
	const { data } = props;
	const classes = useStyles(props);
	console.log(data)
	return (
		<div className={classes.root}>
			<Carousel
				gap={12}
				movementWidth={0}
				itemWidth={props.imgWidth}
			>
				{data &&
					data.cast.map((item, index) => (
						<Link to={`/person/${item.id}`} key={item.id} >
							<Avatar 
								alt={item.name} 
								src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
								className={classes.avatarImages} 
							/>
						</Link>
					))}
			</Carousel>
		</div>
	);
};

export default ActorPanel;
