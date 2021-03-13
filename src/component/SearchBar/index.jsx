import React, { useEffect, useState, useCallback, Fragment } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import useStyles from './styles';

const SearchBar = () => {
	const classes = useStyles();
	const [ searchQuery, setSearchQuery ] = useState('');
	const queryUrl = searchQuery && `/remote/search/all?searchTerm=${searchQuery}`;
	const  { data, error, isLoading  } = useFetch(queryUrl);
	const handleInputChange = useDebounce((e) => {
		if(e.target.value != searchQuery) {
			setSearchQuery(e.target.value);
		}
	}, 300);

	return (
		<Fragment>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search…"
					name='search'
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
					onChange={handleInputChange}
				/>
				
			</div>
			<div>
				{data && data.results.map((item)=> <div key={item.id}>{item.title}</div>) }
			</div>
		</Fragment>
	);
};

export default SearchBar;
