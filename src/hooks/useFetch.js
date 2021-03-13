import { useEffect, useState } from 'react';

const useFetch = (fetchUrl) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		(async () => {
			if (!fetchUrl) {
				return;
			}
			try {
				setIsLoading(true);
				const response = await fetch(fetchUrl);
				const json = await response.json();
				if (response.status !== 200) {
					throw Error(json.message);
				}
				setData(json.data);
				setIsLoading(false);
			} catch (e) {
				setError(e);
			}
		})();
	}, [fetchUrl]);
	return { data, error, isLoading };
};

export default useFetch;
