import {useEffect, useState} from "react";
import axios from 'axios';
import {JWT_token} from "../components/Connection";


const initialState = {data:undefined, loading: true};

/**
 * Use axios.get, return if loading or not and data when available.
 * End point given in param.
 *
 * @param url
 * @returns {{data: undefined, loading: boolean}}
 */
export const useGet = (url) => {
    const [state, setState] = useState(initialState);

    console.log('USE GET WITH URL : '+url);

    useEffect(async() => {
        setState(initialState);

        axios.get(url)
            .then( response => {
                //console.log(result);
                setState( {data: response.data, loading: false} );
            })

    }, [url]);

    return state;
}