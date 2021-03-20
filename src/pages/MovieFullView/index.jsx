import React, {useState, useEffect} from 'react';
import { Container, Grid, makeStyles, SpeedDial, SpeedDialIcon } from '@material-ui/core/';
import Backdrop from '../../component/Backdrop';
import useFetch from '../../hooks/useFetch';
import ActorPanel from '../../component/ActorPanel';
import FloatingActions from '../../component/FloatingActions'

const useStyles = makeStyles((theme) => ({
	image: {
		maxWidth: '120px',
	},
}));

const MovieFullView = (props) => {
	// const id = props.match.params.id;
	const classes = useStyles();
	const id = '';
	const [movie, setMovie] = useState(0)
	const { get, error, isLoading } = useFetch();
	const getMovieDetails = async () => {
		const results = await get(`/remote/movie/${id}`)
		console.log({results: results.results})
		setMovie(results);
	}
	useEffect(() => {
		getMovieDetails();
	}, [])

	return (
		<Container className={classes.root}>
			{movie && (
				<Grid container spacing={3}>
					<Grid item xs={12} style={{ marginTop: '63px' }}>
						<h2>{movie.title}</h2>
					</Grid>
					<Grid item xs={4}>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className={classes.image}
						/>
					</Grid>
					<Grid item container xs={8}>
						<Grid item>
							{`${movie.release_date} - ${movie.runtime}min`}
						</Grid>
						<Grid item xs={12}>
							{movie.overview}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<ActorPanel imgWidth={115} data={movie.credits} />
					</Grid>
					<Backdrop
						image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					/>
					<FloatingActions />
				</Grid>
			)}
		</Container>
	);
};

export default MovieFullView;
