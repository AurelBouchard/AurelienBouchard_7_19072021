import {useEffect, useState} from "react";
import axios from 'axios';
import {JWT_token} from "../components/Connection";


const initialState = {data:undefined, loading: true};


export const usePosts = (mutations) => {
    const [state, setState] = useState(initialState);

    useEffect(async() => {
        setState(initialState);

        axios.get('http://localhost:4000/api/posts')
            .then( response => {
                //console.log(result);
                setState( {data: response.data, loading: false} );
            })

    }, [mutations]);

    return state;
}