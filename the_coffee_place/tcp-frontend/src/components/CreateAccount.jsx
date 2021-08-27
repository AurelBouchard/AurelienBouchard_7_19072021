import React, {useState, useEffect, useRef} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import axios from "axios";

import Input from './TCP_input';
import Button from './TCP_button';



// tailwind material beurk
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
//import Button from "@material-tailwind/react/Button";
import {H1,H2,H3,H4,H5,H6} from "./Headings.jsx";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

//import {Input} from "@material-tailwind/react";


const CreateAccount = ({setAskForSubscription}) => {

    useEffect(() => {
        document.title = "Inscription";
        //loadCaptchaEnginge(6);
    });

    return (
        <div className="flex flex-col pt-16 md:pt-32 items-center w-full h-auto min-h-screen">
            <Formik
                initialValues={{
                    pseudo: '',
                    email: '',
                    password: '',
                    passwordConf: '',
                    //user_captcha_input: '',
                }}

                validate={values => {
                    const errors = {};
                    if (!values.pseudo)  { errors.pseudo = 'Champ requis';}

                    if (!values.email) { errors.email = 'Champ requis'; }
                    else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) { errors.email = 'Email incorrect'; }

                    if (!values.password)  { errors.password = 'Champ requis'; }
                    else if ( !/^(?=.{8,})/i.test(values.password) ) { errors.password = 'Doit contenir 8 caractères'; }
                    else if ( !/^(?=.*[?!@#$%^&*=|£²³`"'ø§€])/i.test(values.password) ) { errors.password = 'Doit au moins 1 caractère spécial'; }
                    else if ( !/^(?=.*[0-9])/i.test(values.password) ) { errors.password = 'Doit contenir au moins 1 chiffre'; }
                    else if ( !/^(?=.*[A-Z])(?=.*[a-z])/i.test(values.password) ) { errors.password = 'Doit contenir des minuscules et majuscules'; }

                    if (!values.passwordConf)  { errors.passwordConf = 'Champ requis'; }
                    else if ( values.password !== values.passwordConf ) { errors.passwordConf = 'Doit être identique'; }

                    //if (!values.user_captcha_input)  { errors.user_captcha_input = 'Recopiez le captcha'; }

                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        console.log("try to create account ...");

                        //let user_captcha_value = document.getElementById('user_captcha_input').value;

/*                        if (validateCaptcha(user_captcha_value)!==true) {
                            console.log("captcha incorrect, êtes-vous un robot ?")
                            setSubmitting(false);
                        return}*/

                        const payload = {
                            pseudo:values.pseudo,
                            password:values.password,
                            email:values.email
                        }

                        axios.post('http://localhost:4000/api/auth/signup', payload)
                            .then(function (response) {
                                //console.log(response.data);
                                console.log(response.status);
                                //console.log(response.statusText);
                                console.log(response.headers);
                                console.log(response.config);
                                //setState( {data: response, loading: false} );

                            })
                            .then(() => {
                                setAskForSubscription(false);
                                console.log("Vous êtes inscrit(e)")
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
                        <div  className="mx-24 max-w-sm">
                            <Card>
                                <CardHeader color="yellow" size="lg">
                                    <H2 color="white">Inscription</H2>
                                </CardHeader>

                                <CardBody>
                                    <div className="mt-4 mb-8 px-4">
                                        <Field id="pseudo" name="pseudo" placeholder="pseudo" />
                                        <ErrorMessage name="pseudo" component="div" />
                                    </div>

                                    <div className="mb-8 px-4">
                                        <Field type="email" id="email"name="email" placeholder="email" />
                                        <ErrorMessage name="email" component="div" />
                                    </div>

                                    <div className="mb-8 px-4">
                                        <Field type="password" name="password" placeholder="mot_de_passe" />
                                        <ErrorMessage name="password" component="div" />
                                    </div>

                                    <div className="mb-4 px-4">
                                        <Field type="password" name="passwordConf" placeholder="Confirmez le mot de passe" />
                                        <ErrorMessage name="passwordConf" component="div" />
                                    </div>

{/*                                    <div className="mb-8 px-4">
                                        <div className="py-4 mx-auto">
                                            <LoadCanvasTemplateNoReload className="text-center"/>
                                        </div>

                                        <input id="user_captcha_input" type='text'
                                        placeholder="Copiez le captcha"/>

                                        <Field id="user_captcha_input" name="user_captcha_input" placeholder="Copiez le captcha" />
                                        <ErrorMessage name="user_captcha_input" component="div" />
                                    </div>*/}
                                </CardBody>
                                <CardFooter>
                                    <div className="flex justify-between">
                                        <Button
                                            text="Annuler"
                                            type='reset'
                                            onClick={() =>{ setAskForSubscription(false); }}
                                        >
                                        </Button>
                                        <Button
                                            text="Valider"
                                            type='submit'
                                            disabled={isSubmitting}
                                        >
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )   // end of return
};

export default CreateAccount;