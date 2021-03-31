import React, { useEffect, useState, useCallback, Fragment } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import useStyles from './styles';
import { Autocomplete, TextField } from '@material-ui/core';
import SearchSuggestions from '../SearchSuggestions';
import { useHistory, useParams } from "react-router-dom";

const SearchBar = (props) => {
	const { suggestSearches } = props;
	const classes = useStyles();
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ searchResults, setSearchResults ] = useState([]);
	const [ searchSuggestions, setSearchSuggestions ] = useState([]);
	let history = useHistory();
	let params = useParams();
	// const  { get, error, isLoading  } = useFetch();
	// const  { data, error, isLoading  } = useFetch(searchQuery ? `/remote/test/search?searchTerm=${searchQuery}` : null);
	const request = useFetch('/remote/graphql');
	const handleInputChange = useDebounce((e) => {
			setSearchQuery(e.target.value);
	}, 300);

	const handleSubmit = (e) => {
		if(e.key == "Enter") {
			if(!searchQuery) {
				return;
			}
			history.push(`/search?query=${searchQuery}`)
		}
	}
	// input SearchParams {
	// 	page: Int
	// 	include_adult: Boolean
	// 	primary_release_year: Int
	// 	year: Int
	// 	query: String
	// 	region: String
	//   }
	const getSearchSuggestions = async (queryUrl) => {
		const movies = await request.query(`
			query searchMovies($query: String!) {
				search: searchMovies(searchParams: {query: $query}) {
					results {
						id
						title,
					}
				}
			}`, {query: searchQuery}
		)
		console.log(movies.search);
		setSearchSuggestions(movies.search.results);
	};
	
	useEffect(() => {
		// const queryUrl = searchQuery && `/remote/search/all?searchTerm=${searchQuery}`;
		if(suggestSearches && searchQuery) {
			// const queryUrl = searchQuery && `/remote/search?searchTerm=${searchQuery}`;
			getSearchSuggestions(searchQuery);
			return () => setSearchSuggestions([]);
		} 
	},[searchQuery])

	return (
		<Fragment>
			{/* <div className={classes.search}>
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
					onKeyUp={handleSubmit}
				/>
			</div> */}
				<Autocomplete 
					id='search'
					includeInputInList
					onKeyDown={handleSubmit}
					options={searchSuggestions.slice(0,5).map((option) => option.title || option.name)}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					freeSolo
					onInputChange={handleInputChange}
					// filterOptions={(x) => x}
					renderInput={(params) => (
						<TextField
						  {...params}
						  label="Search Movies/TV/People/Keywords"
						  margin="normal"
						  InputProps={{
							...params.InputProps,
							type: 'search',
						  }}
						/>
					)}
				/>
			{/* {searchSuggestions && <SearchSuggestions data={searchSuggestions} /> } */}
		</Fragment>
	);
};

export default SearchBar;
