import React, {useState, useEffect, useRef} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import axios from "axios";


import Button from './TCP_button';
import DbError from "./DbError";




const CreateAccount = ({setAskForSubscription}) => {
    const [dbError, setDbError] = useState(null);

    useEffect(() => {
        document.title = "Inscription";
        loadCaptchaEnginge(6);
    });


    return (
        <div className="flex flex-col pb-8 md:pt-16 items-center w-full h-auto min-h-screen  bg-ter-dark">
            <Formik
                initialValues={{
                    pseudo: '',
                    email: '',
                    password: '',
                    passwordConf: '',
                    user_captcha_input: '',
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
                    else if ( !/^(?=.*[A-Z])/i.test(values.password) ) { errors.password = 'Doit contenir au moins 1 majuscule'; }
                    else if ( !/^(?=.*[a-z])/i.test(values.password) ) { errors.password = 'Doit contenir au moins 1 minuscule'; }

                    if (!values.passwordConf)  { errors.passwordConf = 'Champ requis'; }
                    else if ( values.password !== values.passwordConf ) { errors.passwordConf = 'Doit être identique'; }

                    if (!values.user_captcha_input)  { errors.user_captcha_input = 'Recopiez le captcha'; }

                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        console.log("try to create account ...");

                        let user_captcha_value = document.getElementById('user_captcha_input').value;

                        if (validateCaptcha(user_captcha_value)!==true) {
                            console.log("captcha incorrect, êtes-vous un robot ?")
                            setDbError("Le captcha est incorrect")
                            setSubmitting(false);
                        return
                        }

                        const payload = {
                            pseudo:     values.pseudo,
                            password:   values.password,
                            email:      values.email
                        }

                        axios.post('http://localhost:4000/api/user/signup', payload)
                            .then(function (response) {
                                console.log(response.statusText);
                            })
                            .then(() => {
                                setAskForSubscription(false);
                                console.log("Vous êtes inscrit(e)")
                            })
                            .catch(error => {
                                console.log(error.response.data.message);
                                setDbError(error.response.data.message);
                            });


                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div  className="w-11/12 max-w-sm mx-auto">
                            <div className="bg-white rounded-2xl shadow-lg mt-20 flex flex-col">
                                <div className="bg-gradient-to-tl from-prim to-prim-light
                                 rounded-2xl shadow-lg p-8 w-min mx-auto -mt-10" >
                                    <p className="text-white text-2xl">Inscription</p>
                                </div>

                                <div className="px-4">
                                    <div className="mt-4 mb-4 px-4">
                                        <label htmlFor='pseudo' className='block'>Pseudo</label>
                                        <Field id="pseudo" name="pseudo" placeholder="pseudo" />
                                        <ErrorMessage name="pseudo" component="div"
                                                      className='mb-1 text-red-500'/>
                                    </div>

                                    <div className="mb-4 px-4">
                                        <label htmlFor='email' className='block'>Email</label>
                                        <Field type="email" id="email"name="email" placeholder="email" />
                                        <ErrorMessage name="email" component="div"
                                                      className='mb-1 text-red-500'/>
                                    </div>

                                    <div className="mb-4 px-4">
                                        <label htmlFor='password' className='block'>Mot de passe</label>
                                        <Field type="password" name="password" placeholder="mot_de_passe" />
                                        <ErrorMessage name="password" component="div"
                                                      className='mb-1 text-red-500'/>
                                    </div>

                                    <div className="mb-4 px-4">
                                        <label htmlFor='passwordConf' className='block'>Mot de passe</label>
                                        <Field type="password" name="passwordConf" placeholder="Confirmez le mot de passe" />
                                        <ErrorMessage name="passwordConf" component="div"
                                                      className='mb-1 text-red-500'/>
                                    </div>

                                    <div className="mb-4 px-4">
                                        <div className="py-4 mx-auto">
                                            <LoadCanvasTemplateNoReload className="text-center"/>
                                        </div>
                                        <label htmlFor='user_captcha_input' className='block'>Captcha</label>
                                        <Field autoComplete="off" id="user_captcha_input" name="user_captcha_input" placeholder="Copiez le captcha" />
                                        <ErrorMessage name="user_captcha_input" component="div"
                                                      className='mb-1 text-red-500'/>
                                    </div>
                                </div>
                                <div className="p-4">
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
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            {(!dbError) ? null : <DbError dbError={dbError} setDbError={setDbError}/>}

        </div>
    )   // end of return
};

export default CreateAccount;