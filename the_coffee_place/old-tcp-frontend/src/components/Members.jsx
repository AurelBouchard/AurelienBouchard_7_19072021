import React from 'react';
import {Link} from 'react-router-dom';

import AccessToWall from './AccessToWall'



export default function Members({data, loading}) {
    return (
        <div className="relative">
            {loading ? "loading ..." : (
                <div className="mx-auto md:max-w-sm max-w-min pb-8">
                    {data.results.map((fakeUser) => {
                        return (
                            <Link to={'/member/'+data.info.seed}
                                  className="m-2 p-3 flex flex-col md:flex-row rounded-3xl bg-white font-EXO
                                  active:translate-y-1 transform transition
                                  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam
                                  text-coffee-dark"
                                  key={fakeUser.login.uuid}
                                  title={"Voir le profil de "+fakeUser.name.first}>
                                <img
                                    className="rounded-2xl"
                                    src={fakeUser.picture.large}
                                    alt="Profile picture"
                                    max-width={400} max-height={400}
                                />

                               <div className="m-4 flex flex-col">
                                   <p className="text-2xl">{fakeUser.name.first}</p>
                                   <p>{fakeUser.name.last}</p>
                                   <div className="mt-4">
                                       <span className="">Alias </span>
                                       <span className="handWritten text-2xl">{fakeUser.login.username.slice(0,-3)}</span>
                                   </div>
                               </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <AccessToWall className={"fixed bottom-10 right-10 md:right-32 lg:right-60"}/>

        </div>
    )
}