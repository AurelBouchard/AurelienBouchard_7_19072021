import {useEffect, useState} from "react";
import axios from 'axios';
import {JWT_token} from "../components/Connection";


const initialState = {listOfLikedPost:undefined, finding: true};


export const useGetLikedPost = (url) => {
    const [state, setState] = useState(initialState);

    console.log('USE GET WITH URL : '+url);

    useEffect(async() => {
        setState(initialState);

        axios.get(url)
            .then( response => {
                console.log("useGetLikedPost response :");
                console.log(response);
                setState( {listOfLikedPost: response.data, finding: false} );
            })

    }, [url]);

    return state;
}