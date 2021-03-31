const SEARCH_MOVIES = `
	query searchMovies($query: String!) {
		search: searchMovies(searchParams: {query: $query}) {
			results {
				id
				title,
			}
		}
	}
`; 
