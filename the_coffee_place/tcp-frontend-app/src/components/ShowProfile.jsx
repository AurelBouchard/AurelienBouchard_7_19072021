import React from 'react';
import Navbar from "./TCP_navbar";
import Input from "./TCP_input";
import {Button} from "@material-tailwind/react";

export default function ShowProfile({first, last, username, large, email}) {
    return (
        <div className="">
            <Navbar />
            <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center
            md:flex-row flex-wrap md:justify-center md:max-w-2xl">
                <img
                    className="rounded-2xl bg-white md:m-8 md:self-start "
                    src={large}
                    alt="Profile picture"
                    max-width={200} max-height={200}    // md: 200 -> 300
                />

                <div className="names flex flex-col m-4 md:m-8">
                    <p className="mb-8">{username}</p>
                    <p className="mb-8">{first}</p>
                    <p className="mb-8">{last}</p>
                    <p className="mb-8">{email}</p>
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
        </div>
    )
};