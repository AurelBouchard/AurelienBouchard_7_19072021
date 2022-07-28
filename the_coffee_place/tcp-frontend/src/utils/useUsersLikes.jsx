import {useEffect, useState} from "react";
import axios from 'axios';
import {JWT_token} from "../components/Connection";


const initialState = {listOfLikedPost:undefined, finding: true};

/**
 * Use axios.get, return if loading or not and data when available.
 * End point : /api/user/${currentUser}/likedposts
 *
 * @param mutations
 * @param currentUser
 * @returns {{listOfLikedPost: undefined, finding: boolean}}
 */
export const useUsersLikes = (mutations, currentUser) => {
    const [state, setState] = useState(initialState);

    useEffect(async() => {
        //if (currentUser == null) return; // THIS LINE AVOID THE 1st REFRESH OF WALL, SO LIKED POSTS ARE FROM THE PREVIOUS USER

        setState(initialState);

        axios.get(`http://localhost:4000/api/user/${currentUser}/likedposts`)
            .then( response => {
                console.log("useUsersLikes response :");
                console.log(response);
                setState( {listOfLikedPost: response.data, finding: false} );
            })

    }, [mutations, currentUser]);

    return state;
}