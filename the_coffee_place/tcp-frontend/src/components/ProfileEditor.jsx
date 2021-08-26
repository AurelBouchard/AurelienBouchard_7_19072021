import React, { useState } from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom';

import Input from "./TCP_input";
import Button from './TCP_button'
import {useAxiosGet} from "../utils/useAxiosGet";


export default function ProfileEditor({currentUser}) {
    const [userData, setUserData] = useState();

    const {data, loading} = useAxiosGet(`http://localhost:4000/api/auth/user/${currentUser}`);
    //const {id, pseudo, password, firstName, lastName, email, about, createdAt, updatedAt} = data.user;
    // il manque la photo !!


    return (
        <div className="text-coffee-dark">
            {loading ? "loading ..." : (

                <Formik
                    initialValues={{
                        pseudo:     data.user.pseudo,
                        password:   data.user.password,
                        firstName:  data.user.firstName,
                        lastName:   data.user.lastName,
                        email:      data.user.email,
                        about:      data.user.about,
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.pseudo) { errors.pseudo = 'Champ requis'; }
                        if (!values.password) { errors.password = 'Champ requis'; }
                        return errors;
                    }}
                >

                    <Form>
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
                                <Input type={"text"} label={"Pseudo"} placeholder={data.user.pseudo} />
                                <Input type={"text"} label={"Prénom"} placeholder={data.user.firstName} />
                                <Input type={"text"} label={"Nom"} placeholder={data.user.lastName} />
                                <Input type={"email"} label={"Email"} placeholder={data.user.email} />
                            </div>

                            <div className="intro flex flex-col m-4 md:w-full ">
                                {data.user.about ?
                                    <Input type={"textarea"} label={"Présentation"} value={data.user.about}/>
                                    :
                                    <Input type={"textarea"} label={"Présentation"} placeholder={"Quelques mots sur vous ..."}/>}

                            </div>

                            <div className="admin flex flex-col m-4 mx-16 md:mx-4 md:w-full">
                                <p>Gestion du compte :</p>
                                <div className="md:flex md:flex-row md:justify-around">
                                    <Button text="Changer le mot de passe">
                                    </Button>
                                    <Button text="Supprimer le compte">
                                    </Button>
                                </div>
                            </div>

                            <div className="btns flex flex-row w-full justify-evenly my-8">
                                <Button text="Retour" type='reset'>
                                </Button>
                                <Button text="Valider" type='submit'>
                                </Button>
                            </div>
                        </div>

                    </Form>


                </Formik>
            )}
        </div>
    )
};