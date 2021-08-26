import {useEffect, useState} from "react";

const initialState = {data:null, loading: true};



export const useFetch = (url) => {
    const [state, setState] = useState(initialState);

    useEffect(async() => {
        setState(initialState);

        fetch(url)
            .then(res => res.json())
            .then( result => {
                //console.log(result);
                setState( {data: result, loading: false} );
            })


    }, [url]);

    console.log(Date.now());
    return state;
}