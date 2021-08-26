import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import {useFetch} from "./useFetch";

export default function ShowProfile() {
    const {seed} = useParams();
    const {data, loading} = useFetch(`https://randomuser.me/api/?seed=${seed}`);

    return (
        <div className="font-EXO text-coffee-dark">
            {loading ? "loading ..." : (
                <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center
                md:flex-row flex-wrap md:justify-center md:max-w-4xl">
                    <div className="rounded-2xl bg-white p-3 md:m-8 md:self-start w-52 h-52 md:w-96 md:h-96 flex">
                        <img
                            className="m-auto w-full h-full object-cover"
                            /*src="../src/temp/scarlett_273*380.jpg"*/
                            src="../src/temp/berlean_855*570.jpg"
                            alt="Profile picture"
                        />

                    </div>

                    <div className="names flex flex-col m-4 md:m-8">
                        <p className="mb-8 handWritten text-4xl md:text-5xl">{data.results[0].login.username}</p>
                        <p className="text-xl">Nom :</p>
                        <p className="mb-8 text-2xl">{data.results[0].name.first} {data.results[0].name.last}</p>
                        <p className="text-xl">Pour me contacter :</p>
                        <p className="mb-8 text-xl">{data.results[0].email}</p>
                    </div>

                    <div className="intro flex flex-col m-4 md:w-full ">
                        <p className="handWritten text-2xl mx-auto">J'aime l'humour, la preuve, je suis de la compta !</p>
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