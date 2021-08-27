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
                        //imgUrl:     data.user.imgUrl,
                        pseudo:     data.user.pseudo,
                        password:   data.user.password,
                        firstName:  data.user.firstName,
                        lastName:   data.user.lastName,
                        email:      data.user.email,
                        about:      data.user.about || "Quelques mot sur vous",
                    }}

                /*    validate={values => {
                        const errors = {};
                        if (!values.pseudo) { errors.pseudo = 'Champ requis'; }
                        if (!values.password) { errors.password = 'Champ requis'; }
                        return errors;
                    }}*/

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
                                    //console.log(response.data);
                                    console.log(response.status);
                                    //console.log(response.statusText);
                                    console.log(response.headers);
                                    console.log(response.config);
                                    //setState( {data: response, loading: false} );

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
                                    {/*<Input type={"text"} label={"Pseudo"} placeholder={data.user.pseudo} />*/}
                                    <Field type='text' id="pseudo" name="pseudo" />
                                    <ErrorMessage name="pseudo" component="div" />

                                    {/*<Input type={"text"} label={"Prénom"} placeholder={data.user.firstName} />*/}
                                    <Field type='text' id="firstName" name="firstName" />
                                    <ErrorMessage name="firstName" component="div" />

                                    {/*<Input type={"text"} label={"Nom"} placeholder={data.user.lastName} />*/}
                                    <Field type='text' id="lastName" name="lastName" />
                                    <ErrorMessage name="lastName" component="div" />

                                    {/*<Input type={"email"} label={"Email"} placeholder={data.user.email} />*/}
                                    <Field type="email" id="email"name="email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>

                                <div className="intro flex flex-col m-4 md:w-full ">
                                    {/*<Input type={"textarea"} label={"Présentation"} placeholder={"Quelques mots sur vous ..."}/>*/}
                                    <Field type='undefined' id="about"name="about" />
                                    <ErrorMessage name="about" component="div" />
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
                                            onClick={() => {// use history
                                                 }}>
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