import React, { useEffect,useState } from 'react';

const Movie = () => {
    const fetchTest = async () => {
        const response = await fetch('/movie');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body);
        return body;
    }
    
    const [data, setData] = useState({});

    useEffect(async () => {
        const response = await fetchTest();
        // console.log(response.data)
        // setData(response.data)
        
    },[]);
  return (
      <h3>Hello World from Movie component</h3>
  );
};

export default Movie;