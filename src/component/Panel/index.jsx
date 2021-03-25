import React, { useEffect, useState, useRef } from 'react';
import { Hidden, Grid, Slide, ImageList } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Backdrop from '../Backdrop';
import Carousel from '../Carousel';
import useIntersect from '../../hooks/useIntersect';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Panel = ({ panel, group }) => {
	const classes = useStyles();
	const ITEM_WIDTH = 150;
	const ITEM_SELECTED_WIDTH = 200;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [activeItem, setActiveItem] = useState(null);

	const target = useRef(null);
	const inView = useIntersect(target, { once: true, threshold: 0.7 });
	const [data,setData] = useState([]);
	const request = useFetch('/remote/graphql');

	const handleCurrentIndexChange = (index) => {
		setCurrentIndex(index);
	};

	const handleActive = (item) => {
		setActiveItem(item);
	};

	const getMovies = async () => {
		// const results = await get(`/remote/panel?panel=${panel}&group=${group}`);
		const results = await request.query(`
			query discoverMovies ($sort_by: String) {
				discoverMovies(searchParams: { sort_by: $sort_by}){
					results {
						id
						title
						poster_path
						backdrop_path
					}
				}
			}`, {sort_by: panel});
			
		console.log({results: results});
		setData(results.discoverMovies.results);
	}
	
	useEffect(() => {
		getMovies();
	}, [])

	return (
		<Slide in mountOnEnter>
			<div className={classes.root} ref={target} data-test={panel}>
				<Carousel
					gap={12}
					movementWidth={ITEM_SELECTED_WIDTH / 2}
					handleActiveItem={handleCurrentIndexChange}
					itemWidth={ITEM_WIDTH}
					selectedItemWidth={ITEM_SELECTED_WIDTH}
				>
					{data &&
						data.map((item, index) => (
							<Link to={`/movie/${item.id}`} key={item.id}>
								<Movie
									item={item}
									isActive={index == currentIndex}
									handleActive={handleActive}
									index={index}
									className={classes.test}
								/>
							</Link>
						))}
				</Carousel>
				{activeItem && (
					<Hidden smUp>
						<Backdrop
							image={`https://image.tmdb.org/t/p/w780${activeItem.backdrop_path}`}
						/>
					</Hidden>
				)}
			</div>
		</Slide>
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
