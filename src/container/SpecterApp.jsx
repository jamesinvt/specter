import React, { useEffect,useState } from 'react';
import Movie from '../component/Movie';
import Panel from '../component/Panel';
import HelloWorld from '../component/HelloWorld';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container }  from '@material-ui/core/';

const SpecterApp = () => {
    const fetchTest = async () => {
        const response = await fetch('/movie');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body.data.title);
        return body;
    }
    
    const [data, setData] = useState({});

    useEffect(async () => {
        // const response = await fetchTest(); 
        // console.log(response.data)
        // setData(response.data)
        
    },[]);
    const testImg = "/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
    return (
        <Router>
            <Container width={1}>
                <h3>Specter says hello</h3>
                <Panel panel="popular" group="streaming" />
                <Panel panel="trending" group="day" />
            </Container>
        </Router>
    );
};

export default SpecterApp;