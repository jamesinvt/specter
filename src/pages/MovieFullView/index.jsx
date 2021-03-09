import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core/';
import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles(theme => ({
	root: {
	},
	image: {
		maxWidth: '120px'
	},
	background: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'auto',
		backgroundPosition: 'center top',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '-2',
		marginTop: '-63px',
		left:0,
	},
	gradient: {
		background:
			`linear-gradient(360deg, ${theme.palette.background.default} 45%, rgba(255,255,255,0) 100%);`,
		alignItems: 'flex-end',
		display: 'flex',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '-1',
		left:0,
	},
}))

const MovieFullView = (props) => {
	// const id = props.match.params.id;
	const classes = useStyles();
	const id = '';
	const { data, error, isLoading } = useFetch(`/remote/test/movie/${id}`);

	return (
		<Container className={classes.root}>
			{data && 
				<Grid container spacing={3}>
					<Grid item xs={12} style={{marginTop: '63px'}}>
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
					<div className={classes.gradient} />
					<div
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w780${data.backdrop_path})`,
						}}
						className={classes.background}
					/>
				</Grid>
			}
			
		</Container>
	);
};

export default MovieFullView;
