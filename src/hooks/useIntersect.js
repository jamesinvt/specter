import { useEffect, useRef, useState } from 'react';

export default (target, options) => {
	const { once, ...opts } = options;
	const optsRef = useRef(opts);
	const intersectedRef = useRef(false);

	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		optsRef.current = opts;
	});

	useEffect(() => {
		if (target == null) {
			return;
		}
		const element = target.current;

		if (once && intersectedRef.current) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
				if (entry.isIntersecting) {
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
			if (once) {
				return;
			}
			if (element) {
				currentObserver.unobserve(element);
			}
		};
	}, [target, options]);

	return isIntersecting;
};
