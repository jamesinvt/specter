import { useEffect, useRef, useState } from 'react';

export default (target, options) => {
	// MIGHT REMOVE BELOW HERE
	const { once, ...opts } = options;
	const optsRef = useRef(opts);
	const intersectedRef = useRef(false);
	//MIGHT REMOVE ABOVE HERE

	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		optsRef.current = opts;
	});

	useEffect(() => {
		if (target == null) {
			return;
		}
		const element = target.current;

		if(once && intersectedRef.current) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				console.log(`useIntersect ${target.current.dataset.test}`);
				console.log(
					`useIntersect entry.intersectionRatio ${entry.intersectionRatio}`
				);
				setIsIntersecting(entry.isIntersecting);
				console.log(`useIntersect test ${entry.isIntersecting}`);
				if (entry.isIntersecting) {
					console.log('useIntersect IS INTERSECTING');
					intersectedRef.current = true;
				}
				if (entry.isIntersecting && once && element) {
					observer.unobserve(element);
				}
			},
			{
				...optsRef.current,
			}
		);
		if (element) {
			observer.observe(element);
		}
		return () => {
			if(once) {
				return;
			}
			if(element) {
				currentObserver.unobserve(element);
			}
		};
	}, [target, options]);

	return isIntersecting;
};
