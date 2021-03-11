import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const darkMode = createMuiTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#01030F',
		},
		primary: {
			main: '#dc0004',
		},
		secondary: {
			main: '#401033',
		},
	},
});

const SpecterTheme = (props) => {
	const { children } = props;
	return (
		<ThemeProvider theme={darkMode}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default SpecterTheme;
