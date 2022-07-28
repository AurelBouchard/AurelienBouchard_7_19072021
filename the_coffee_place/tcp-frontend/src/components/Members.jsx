import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {useGet} from "../utils/useGet";

import AccessToWall from './AccessToWall'


/**
 * Page that show all members
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Members() {

    const {data, loading} = useGet('http://localhost:4000/api/members');


    useEffect(() => {
        document.title = "Membres";
    });

    return (
        <div className="top-16 relative w-9/12 mx-auto">
            <div className="w-full max-w-md pb-8 mx-auto">
                {loading ? "loading ..." : (

                        (data.allMembers).map(({id, pseudo, firstName, lastName}) => {      // ajouter la photo dans la database  !!!!!!!!!!!
                            let key = uuidv4();
                            return (
                                <Link to={`/member/${pseudo}`}          // a changer ------------------
                                      className="p-3 my-3 flex flex-col rounded-3xl w-full bg-white
                                      active:translate-y-1 transform transition
                                      focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light"
                                      key={key}
                                      title={"Voir le profil de "+ (firstName ? firstName : pseudo)}>

                                    <img
                                        className="rounded-2xl"
                                        src='/src/assets/icon-above-font.png'       // a changer --------------
                                        alt="Profile picture"
                                        max-width={400} max-height={400}
                                    />

                                   <div className="m-t4 flex flex-col md:flex-row">
                                       <p className="text-2xl">{firstName}</p>
                                       <p>{lastName}</p>
                                       <div className="text-right">
                                           <span className="mt-4">Alias </span>
                                           <span className="handWritten text-2xl">{pseudo}</span>
                                       </div>
                                   </div>
                                </Link>
                            );
                        })

                    )}

            </div>

            <AccessToWall className="fixed bottom-10 right-10 md:right-32 lg:right-60 "/>

        </div>
    )
}