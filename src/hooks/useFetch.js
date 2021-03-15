import { useEffect, useRef } from 'react';

const useFetch = (fetchUrl) => {
	const abortController = useRef();
  	const abortControllerOptions = useRef();
	const dataRef = useRef();
	const errorRef = useRef();
	const isLoadingRef =  useRef(true);
	const doFetch = async (url) => {
		try {
			if (!url) {
				return;
			}
			abortController.current = new AbortController();
			abortControllerOptions.current = { signal: abortController.current.signal };
			isLoadingRef.current = true;
			const response = await fetch(url, abortControllerOptions.current);
			const json = await response.json();
			if (response.status !== 200) {
				throw Error(json.message);
			}
			dataRef.current = json.data
			isLoadingRef.current = false;
			return dataRef.current;
		} catch (e) {
			if (e.name == 'AbortError') {
				console.log('request was cancelled');
			}
			errorRef.current = e;
		}
	}

	useEffect(() => {
		if(abortController && abortController.current) {
			return () => abortController.current.abort();
		}
	},[fetchUrl])

	return { data: dataRef.current, error: errorRef.current, isLoading: isLoadingRef.current, get: doFetch };
};

export default useFetch;
