import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import {useFetch} from "./useFetch";

export default function ShowProfile() {
    const {seed} = useParams();
    const {data, loading} = useFetch(`https://randomuser.me/api/?seed=${seed}`);

    return (
        <div className="">
            {loading ? "loading ..." : (
                <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center
                md:flex-row flex-wrap md:justify-center md:max-w-2xl">
                    <img
                        className="rounded-2xl bg-white md:m-8 md:self-start "
                        src={data.results[0].picture.large}
                        alt="Profile picture"
                        max-width={200} max-height={200}    // md: 200 -> 300
                    />

                    <div className="names flex flex-col m-4 md:m-8">
                        <p className="mb-8">{data.results[0].login.username}</p>
                        <p className="mb-8">{data.results[0].name.first}</p>
                        <p className="mb-8">{data.results[0].name.last}</p>
                        <p className="mb-8">{data.results[0].email}</p>
                    </div>

                    <div className="intro flex flex-col m-4 md:w-full ">
                        <p className="handWritten">J'aime l'humour, la preuve, je suis de la compta !</p>
                    </div>

                    <div className="btns flex flex-row w-full justify-evenly my-8">
                        <Button
                            color="orange"
                            buttonType="filled"
                            size="4xl"
                            ripple="dark">Retour</Button>
                    </div>
                </div>
            )}
        </div>
    )
}