import { useEffect, useRef } from 'react';

const useDebounce = (callback, wait) => {
	const argsRef = useRef();
	const timer = useRef();
	const cleanUpTimeout = () => {
		if(timer.current) {
			clearTimeout(timer.current);
		}
	}

	const setUpTimeout = () => {
		timer.current = setTimeout(() => {
			if(argsRef.current) {
				callback(...argsRef.current)
			}
		  }, wait);
	}

	useEffect(() => cleanUpTimeout, []);
	
	return function debouncedCallback(...args) {
		argsRef.current = args;
		cleanUpTimeout();
		setUpTimeout();
	};
};

export default useDebounce;
