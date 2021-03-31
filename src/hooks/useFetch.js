import { useEffect, useRef, useState } from 'react';

const useFetch = (fetchUrl) => {
	const abortController = useRef();
  	const abortControllerOptions = useRef();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] =  useState(true);
	const makeFetch = (method) => {
		const doFetch = async (requestOptions) => {
			try {
				if (!fetchUrl) {
					return;
				}

				const options = { method }
				if(method === 'POST') {
					options.headers = { 
						'Content-Type': 'application/json',
					}
				}
				
				if(requestOptions && requestOptions.query) {
					// graphql
					options.body = JSON.stringify({
						query: requestOptions.query,
						variables: requestOptions.variables || {}
					});
				}

				abortController.current = new AbortController();
				abortControllerOptions.current = { signal: abortController.current.signal };
				setIsLoading(true)
								console.log({fetchUrl})

				const response = await fetch(fetchUrl, options);
				const json = await response.json();
				console.log({json})
				if (response.status !== 200) {
					throw Error(json.message);
				}
				setData(json)
				setIsLoading(false)
				return json;
			} catch (e) {
				if (e.name == 'AbortError') {
					console.log('request was cancelled');
				}
				setError(e);
			}
		}
		return doFetch;
	}

	const post = makeFetch('POST');

	const request = {
		get: makeFetch('GET'),
		post,
		query: (query, variables) => post({ query, variables}),
		abort: () => controller.current && controller.current.abort(),
	  };

	useEffect(() => {
		if(abortController && abortController.current) {
			return () => abortController.current.abort();
		}
	},[])

	return { ...request, isLoading, error, data };
};

export default useFetch;
