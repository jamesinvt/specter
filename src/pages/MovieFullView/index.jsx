import React, {useState, useEffect} from 'react';
import { Container, Grid, makeStyles, SpeedDial, SpeedDialIcon } from '@material-ui/core/';
import Backdrop from '../../component/Backdrop';
import useFetch from '../../hooks/useFetch';
import ActorPanel from '../../component/ActorPanel';
import FloatingActions from '../../component/FloatingActions'
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
	image: {
		maxWidth: '120px',
	},
}));

const MovieFullView = (props) => {
	// const id = props.match.params.id;
	const classes = useStyles();
	let { id } = useParams();
	const [movie, setMovie] = useState(0)
	const request = useFetch('/remote/graphql');
	
	const getMovieDetails = async () => {
		const results = await request.query(`
			query getMovieById($movie_id: Int!) {
				movie(movie_id: $movie_id, appendToResponse: "videos,credits") {
					id
					title,
					runtime,
					release_date,
					overview,
					backdrop_path,
					poster_path,
					credits {
						cast {
							id,
							cast_id
							profile_path
							name
						}
					}
				}
			}`, {movie_id: parseInt(id)}
		)
		setMovie(results.movie);
	}
	useEffect(() => {
		console.log('getMovieDetails')
		getMovieDetails();
		console.log(request.data)
	}, [])

	return (
		<Container className={classes.root}>
			{request.data && ( 
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
