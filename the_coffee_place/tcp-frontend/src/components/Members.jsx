import React from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {useFetch} from "./useFetch";

import AccessToWall from './AccessToWall'



export default function Members() {

    const {data, loading} = useFetch('http://localhost:4000/api/members');

    return (
        <div className="relative">
            <div className="mx-auto md:max-w-sm max-w-min pb-8">
                {loading ? "loading ..." : (

                        (data.allMembers).map(({id, pseudo, firstName, lastName}) => {      // ajouter la photo dans la database  !!!!!!!!!!!
                            let key = uuidv4();
                            return (
                                <Link to={'/wall'}          // a changer ------------------
                                      className="m-2 p-3 flex flex-col md:flex-row rounded-3xl bg-white font-EXO
                                      active:translate-y-1 transform transition
                                      focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam
                                      text-coffee-dark"
                                      key={key}
                                      title={"Voir le profil de "+firstName}>
                                    <img
                                        className="rounded-2xl"
                                        src={id}       // a changer --------------
                                        alt="Profile picture"
                                        max-width={400} max-height={400}
                                    />

                                   <div className="m-4 flex flex-col">
                                       <p className="text-2xl">{firstName}</p>
                                       <p>{lastName}</p>
                                       <div className="mt-4">
                                           <span className="">Alias </span>
                                           <span className="handWritten text-2xl">{pseudo}</span>
                                       </div>
                                   </div>
                                </Link>
                            );
                        })

                    )}

            </div>

            <AccessToWall className={"fixed bottom-10 right-10 md:right-32 lg:right-60"}/>

        </div>
    )
}