import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		flexGrow: 1,
		height: '100vh',
		alignItems: 'flex-end',
		position: 'relative',
	},
}));

export default useStyles;
