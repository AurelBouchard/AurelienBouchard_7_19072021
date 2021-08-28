import {useEffect, useState} from "react";
import axios from 'axios';


const initialState = {data:undefined, loading: true};


export const useGet = (url) => {
    const [state, setState] = useState(initialState);



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