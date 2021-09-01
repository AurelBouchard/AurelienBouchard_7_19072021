import React from 'react';
import axios from "axios";

import Button from './TCP_button'


const DbError = ({dbError, setDbError}) => {

    return (
        <div className="bg-opacity-20 backdrop-filter backdrop-blur-sm h-full w-full fixed top-0 left-0
                flex flex-col justify-center items-center " onClick={() =>{
            setDbError(null);
        } }>
            <p className="bg-white p-2 rounded-lg border border-red-600">{gentleError(dbError)}</p>
            {/*<p className="bg-white p-2 rounded-lg border border-red-600">{JSON.stringify(dbError)}</p>*/}
        </div>
    );
}

export default DbError;

function gentleError(errorMessage) {
    let errorType = "";
    const isDuplicate = errorMessage.includes("Duplicate");

    if (isDuplicate) {
        // last word is "'email'" or "'pseudo'"
        errorType = (errorMessage.split(" ")).pop();
    } else {
        // it embed an status error code
        errorType = errorMessage.slice(-3);
    }


    let gentleMessage = "";

    switch (errorType) {
        case "400":
            gentleMessage = "Pseudo inconnu.\nInscrivez-vous !";
            break;
        case "401":
            gentleMessage = "Mot de passe incorrect ...";
            break;
        case "'email'":
            gentleMessage = "Cet email est déjà utilisé.";
            break;
        case "'pseudo'":
            gentleMessage = "Ce pseudo est déjà utilisé.";
            break;


        default:
            gentleMessage = "Erreur :\n"+errorMessage;

    }

    return gentleMessage;
}
