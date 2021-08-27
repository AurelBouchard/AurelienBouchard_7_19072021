import React, { useState } from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link, useHistory} from 'react-router-dom';

import Input from "./TCP_input";
import Button from './TCP_button'
import {useAxiosGet} from "../utils/useAxiosGet";


export default function ProfileEditor({currentUser}) {
    //const [userData, setUserData] = useState();

    const history = useHistory();

    const {data, loading} = useAxiosGet(`http://localhost:4000/api/auth/user/${currentUser}`);
    //const {id, pseudo, password, firstName, lastName, email, about, createdAt, updatedAt} = data.user;
    // il manque la photo !!


    return (
        <div className="text-coffee-dark">
            {loading ? "loading ..." : (

                <Formik
                    initialValues={{
                        //imgUrl:     data.user.imgUrl,
                        pseudo:     data.user.pseudo,
                        password:   data.user.password,
                        firstName:  data.user.firstName,
                        lastName:   data.user.lastName,
                        email:      data.user.email,
                        about:      data.user.about || "Quelques mot sur vous",
                    }}

                    validate={values => {
                        const errors = {};
                        if (!values.pseudo) { errors.pseudo = 'Champ requis'; }
                        if (!values.firstName) { errors.firstName = 'Champ requis'; }
                        if (!values.lastName) { errors.lastName = 'Champ requis'; }
                        if (!values.email) { errors.email = 'Champ requis'; }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {

                            console.log("try to modify profile ...");

                            const payload = {
                                //imgUrl:     data.user.imgUrl,
                                pseudo:     values.pseudo,
                                firstName:  values.firstName,
                                lastName:   values.lastName,
                                email:      values.email,
                                about:      values.about
                            }

                            axios.put(`http://localhost:4000/api/auth/update/${data.user.id}`, payload)
                                .then(function (response) {
                                    console.log("response status "+response.status);
                                    alert("Votre profil a été mis à jour");
                                })
                                .then(() => {
                                    console.log("profile successfully updated")
                                })
                                .catch(err => {
                                    console.log(err)
                                });
                            setSubmitting(false);
                        }, 400);
                    }}
                >

                    {({ isSubmitting }) => (

                        <Form>
                            <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center font-EXO
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
                                    <label htmlFor='pseudo' className='block mb-1'>Pseudo :</label>
                                    <Field type='text' id="pseudo" name="pseudo" className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                    <ErrorMessage name="pseudo" component="div" className='-mt-4 mb-1 text-red-500'/>

                                    <label htmlFor='firstName' className='block mb-1 mt-2'>Prénom :</label>
                                    <Field type='text' id="firstName" name="firstName" className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                    <ErrorMessage name="firstName" component="div" className='-mt-4 mb-1 text-red-500'/>

                                    <label htmlFor='lastName' className='block mb-1 mt-2'>Nom :</label>
                                    <Field type='text' id="lastName" name="lastName" className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                    <ErrorMessage name="lastName" component="div" className='-mt-4 mb-1 text-red-500'/>

                                    <label htmlFor='email' className='block mb-1 mt-2'>Email :</label>
                                    <Field type="email" id="email"name="email" className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                    <ErrorMessage name="email" component="div" className='-mt-4 mb-1 text-red-500'/>
                                </div>

                                <div className="intro flex flex-col m-4 md:w-full ">
                                    <label htmlFor='about' className='block mb-1'>A propos de moi :</label>
                                    <Field type='undefined' autocomplete='off' id="about" name="about" className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                    <ErrorMessage name="about" component="div" className='-mt-4 mb-1 text-red-500'/>
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
                                    <Button text="Retour" type='reset'
                                            onClick={() => { history.goBack(); }}>
                                    </Button>
                                    <Button text="Valider" type='submit'>
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    )}


                </Formik>
            )}
        </div>
    )
};