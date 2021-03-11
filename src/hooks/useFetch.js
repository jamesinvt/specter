import { useEffect, useState } from 'react';

const useFetch = (fetchUrl) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async (url) => {
			if (!url) {
				return;
			}
			try {
				setIsLoading(true);
				const response = await fetch(url);
				const json = await response.json();
				if (response.status !== 200) {
					throw Error(json.message);
				}
				setData(json.data);
				setIsLoading(false);
			} catch (e) {
				setError(e);
			}
		};
		fetchData(fetchUrl);
	}, [fetchUrl]);
	return { data, error, isLoading };
};

export default useFetch;
