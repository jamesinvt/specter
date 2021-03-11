import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexWrap: 'wrap',

		flexGrow: 1,
		alignItems: 'flex-end',
		position: 'relative',
	},
	gridList: (props) => ({
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		zIndex: '10',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
		position: 'relative',
		overflow: 'hidden',
		padding: 0,
		gap: `${props.gap}px`,
	}),
	selectedImage: (props) => ({
		width: props.selectedItemWidth || props.itemWidth,
		maxWidth: props.selectedItemWidth || props.itemWidth,
	}),
	nonSelectedImages: (props) => ({
		width: props.itemWidth,
		maxWidth: props.itemWidth,
	}),
	items: {
		listStyle: 'none',
	},
});

export default useStyles;
