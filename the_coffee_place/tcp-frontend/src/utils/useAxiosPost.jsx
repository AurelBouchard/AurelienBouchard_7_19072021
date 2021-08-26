// https://randomuser.me/api/?nat=fr&inc=gender,name,email,login,phone,picture&noinfo

import {useEffect, useState} from "react";
import axios from 'axios';

const initialState = {data:null, loading: true};



export const useAxiosPost = ({url, params, payload}) => {
    const [state, setState] = useState(initialState);

    useEffect(async() => {
        setState(initialState);

        axios.post('http://localhost:4000/api/posts', payload)
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                setState( {data: response, loading: false} );
            });

/*
        fetch(url)
            .then(res => res.json())
            .then( result => {
                //console.log(result);
                setState( {data: result, loading: false} );
            })
        */

    }, [url]);

    console.log(Date.now());
    return state;
}
