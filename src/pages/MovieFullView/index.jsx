import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core/';
import Backdrop from '../../component/Backdrop';
import useFetch from '../../hooks/useFetch';
import ActorPanel from '../../component/ActorPanel';

const useStyles = makeStyles((theme) => ({
	image: {
		maxWidth: '120px',
	},
}));

const MovieFullView = (props) => {
	// const id = props.match.params.id;
	const classes = useStyles();
	const id = '';
	const { data, error, isLoading } = useFetch(`/remote/test/movie/${id}`);
	console.log(data)
	return (
		<Container className={classes.root}>
			{data && (
				<Grid container spacing={3}>
					<Grid item xs={12} style={{ marginTop: '63px' }}>
						<h2>{data && data.title}</h2>
					</Grid>
					<Grid item xs={4}>
						<img
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							alt={data.title}
							className={classes.image}
						/>
					</Grid>
					<Grid item container xs={8}>
						<Grid item>
							{`${data.release_date} - ${data.runtime}min`}
						</Grid>
						<Grid item xs={12}>
							{data.overview}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<ActorPanel imgWidth={115} data={data.credits} />
					</Grid>
					<Backdrop
						image={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
					/>
				</Grid>
			)}
		</Container>
	);
};

export default MovieFullView;
