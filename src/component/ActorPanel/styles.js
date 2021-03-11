import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflow: 'hidden',
		position: 'relative',
	},
	avatarImages: props => ({
		height: `${props.imgWidth}px`,
		width: `${props.imgWidth}px`,
	}),
});

export default useStyles;
