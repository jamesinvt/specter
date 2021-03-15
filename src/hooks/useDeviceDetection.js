import { useEffect, useState } from 'react';

const useDeviceDetection = (callback, wait) => {
	const [ hasTouchScreen, setHasTouchScreen ] = useState(false);
	const [ screenSize, setScreenSize ] = useState('');

	const isUserAgentMobile = () => {
		var UA = navigator.userAgent;
		if(
			/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) 
			|| /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
		) {
			return true;
		} else {
			return true;
		}
	}

	const isTouchScreen = () => {
		if("maxTouchPoints" in navigator) {
			return (navigator.maxTouchPoints > 0);
		} else if ("msMaxTouchPoints" in navigator) {
			return (navigator.msMaxTouchPoints > 0);
		} else {
			var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
			if (mQ && mQ.media === "(pointer:coarse)") {
				return !!mQ.matches;
			} else if ('orientation' in window) {
				return true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				return isUserAgentMobile();
			}
		}
	}

	const getScreenSize = () => {
		if(window.innerWidth < 768){
			// Extra Small Device
			return 'xs';
		} else if(window.innerWidth < 991){
			// Small Device
			return 'sm';
		} else if(window.innerWidth < 1199){
			// Medium Device
			return 'md';
		} else {
			// Large Device
			return 'lg'
		}
	}

	useEffect(() => {
		setHasTouchScreen(isTouchScreen());
		setScreenSize(getScreenSize());
	},[]);
	
	return { screenSize, hasTouchScreen, }
};

export default useDeviceDetection;


