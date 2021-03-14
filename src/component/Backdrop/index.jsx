import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	background: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'auto',
		backgroundPosition: 'center top',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '-1',
		left: 0,
		top: 0,
	},
	gradient: {
		background: `linear-gradient(360deg, ${theme.palette.background.default} 45%, rgba(255,255,255,0) 100%);`,
		alignItems: 'flex-end',
		display: 'flex',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: '0',
	},
}));

const Backdrop = ({ image }) => {
	const classes = useStyles();
	return (
		<div
			style={{ backgroundImage: `url(${image})` }}
			className={classes.background}
		>
			<div className={classes.gradient} />
		</div>
	);
};

export default Backdrop;
