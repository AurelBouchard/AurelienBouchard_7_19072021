import React from 'react';
import {Link} from 'react-router-dom';
import Input from "./TCP_input";
import Button from './TCP_button'

export default function ProfileEditor() {
    return (
        <div className="text-coffee-dark">
            <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center
            md:flex-row flex-wrap md:justify-center md:max-w-2xl">
                <img
                    className="rounded-2xl bg-white md:m-8 md:self-start "
                    src="src/assets/coffee-cup-192.png"
                    alt="Profile picture"
                    max-width={200} max-height={200}    // md: 200 -> 300
                    onClick={ () => { alert("Choisissez une photo")}
                    }
                />

                <div className="names flex flex-col m-4 md:m-8">
                    <Input type={"text"} label={"Pseudo"} placeholder={"Cadup'"}/>
                    <Input type={"text"} label={"Prénom"} placeholder={"Camille"}/>
                    <Input type={"text"} label={"Nom"} placeholder={"Dupont"}/>
                    <Input type={"email"} label={"Email"} placeholder={"camille.dupont@groupomania.com"}/>
                </div>

                <div className="intro flex flex-col m-4 md:w-full ">
                    <Input type={"textarea"} label={"Présentation"} placeholder={"Quelques mots sur vous ..."}/>
                </div>

                <div className="admin flex flex-col m-4 mx-16 md:mx-4 md:w-full">
                    <p>Gestion du compte :</p>
                    <div className="md:flex md:flex-row md:justify-around">
                        <Button text="Changer le mot de passe"></Button>
                        <Button text="Supprimer le compte"></Button>
                    </div>
                </div>

                <div className="btns flex flex-row w-full justify-evenly my-8">
                    <Button text="Annuler"></Button>
                    <Button text="Valider"></Button>
                </div>
            </div>
        </div>
    )
};