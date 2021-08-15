import React from 'react';
import {Link} from 'react-router-dom';

import TCP_Access from './TCP_Access'



export default function Members({data, loading}) {
    return (
        <div className="relative">
            {loading ? "loading ..." : (
                <div className="mx-auto md:max-w-sm max-w-min pb-8">
                    {data.results.map((fakeUser) => {
                        return (
                            <Link to='/'
                                  className="m-2 p-3 flex flex-col md:flex-row rounded-3xl bg-white"
                                  key={fakeUser.login.uuid}
                                  title={"Voir le profil de "+fakeUser.name.first}>
                                <img
                                    className="rounded-2xl"
                                    src={fakeUser.picture.large}
                                    alt="Profile picture"
                                    width={200} height={200}
                                />

                               <div className="m-4 flex flex-col">
                                   <p className="text-2xl">{fakeUser.name.first}</p>
                                   <p>{fakeUser.name.last}</p>
                                   <p className="mt-4">Alias {fakeUser.login.username}</p>
                               </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <TCP_Access className={"fixed bottom-10 right-10 md:right-32 lg:right-60"}/>

        </div>
    )
}