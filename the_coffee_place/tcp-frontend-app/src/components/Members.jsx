import React from 'react';

import Navbar from './TCP_navbar.jsx';
import TCP_Access from './TCP_Access'



export default function Members({data, loading}) {
    return (
        <div className="relative">
            <Navbar />
            {loading ? "loading ..." : (
                <div className="mx-auto md:max-w-sm max-w-min pb-8">
                    {data.results.map((fakeUser) => {
                        return (
                            <a className="m-2 p-3 flex flex-col md:flex-row rounded-3xl bg-white"
                               key={fakeUser.login.uuid}
                               href="#"
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
                            </a>
                        );
                    })}
                </div>
            )}

            <TCP_Access />

        </div>
    )
}