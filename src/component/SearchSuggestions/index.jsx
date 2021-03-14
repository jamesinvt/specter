
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import useStyles from './styles';

const SearchSuggestions = ({ data: results }) => {
	const classes = useStyles();
	return (
		<Fragment>
			{results &&  
				<ul className={classes.suggestionBox} color='secondary'>
					{results.slice(0,6).map((item)=> <li key={item.id}>{item.title || item.name}</li>) }
				</ul>
			}
		</Fragment>
	);
};

export default SearchSuggestions;
