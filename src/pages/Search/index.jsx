import React, {useEffect, useState} from 'react';
import { Container, Grid } from '@material-ui/core/';
import SearchBar from '../../component/SearchBar';
import useFetch from '../../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

const Home = () => {
	const {get, isLoading, error } = useFetch();
	const [searchResults, setSearchResults] = useState([]);
	let query = useQuery();

	const handleSearch = async (query) => {
		const results = await get(`/remote/search?searchTerm=${query}`)
		setSearchResults(results.results);
	}

	useEffect(() => {
		if(query.get('query')) {
			handleSearch(query.get('query'))
		}
	},[]);

	return (
		<Container width={1}>
			<Grid container>
				<Grid item xs={12}>
					<SearchBar suggestSearches />
				</Grid>
				<Grid item container xs={12}>
					<ul>
						{searchResults.map((item) => (
							<li key={item.id}>
								<Link to={`/movie/${item.id}`}> {item.title || item.name}</Link>
							</li>
						))}
					</ul>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
