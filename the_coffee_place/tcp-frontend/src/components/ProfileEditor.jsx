import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link, useHistory} from 'react-router-dom';


import Button from './TCP_button'
import {useGet} from "../utils/useGet";


export default function ProfileEditor({currentUser, setJWT_token}) {
    const [mode, changeModeTo] = useState('normal'); // possible states : 'normal' / 'changePW' / 'rmProfile'

    const history = useHistory();

    useEffect(() => { document.title = "Mon profil"; });

    const {data, loading} = useGet(`http://localhost:4000/api/user/${currentUser}`);
    //const {id, pseudo, password, firstName, lastName, email, about, createdAt, updatedAt} = data.user;
    // il manque la photo !!

    console.log("mode : "+mode);

    if (mode === 'changePW') {
        return (
            <div className="text-coffee-dark">
                {loading ? ("loading ...") : (
                    <Formik     // change password case
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                        }}

                        validate={values => {
                            const errors = {};
                            if (!values.oldPassword)  { errors.oldPassword = 'Champ requis'; }
                            if (!values.newPassword)  { errors.newPassword = 'Champ requis'; }
                            else if ( !/^(?=.{8,})/i.test(values.newPassword) ) { errors.newPassword = 'Doit contenir 8 caractères'; }
                            else if ( !/^(?=.*[?!@#$%^&*=|£²³`"'ø§€])/i.test(values.newPassword) ) { errors.newPassword = 'Doit au moins 1 caractère spécial'; }
                            else if ( !/^(?=.*[0-9])/i.test(values.newPassword) ) { errors.newPassword = 'Doit contenir au moins 1 chiffre'; }
                            else if ( !/^(?=.*[A-Z])/i.test(values.newPassword) ) { errors.newPassword = 'Doit contenir au moins 1 majuscule'; }
                            else if ( !/^(?=.*[a-z])/i.test(values.newPassword) ) { errors.newPassword = 'Doit contenir au moins 1 minuscule'; }
                            return errors;
                        }}

                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {

                                console.log("try to modify password ...");

                                const payload = {
                                    oldPassword: values.oldPassword,
                                    newPassword: values.newPassword
                                }

                                axios.put(`http://localhost:4000/api/user/updatePW/${data.user.id}`, payload)
                                    .then(function (response) {
                                        console.log("response status " + response.status);
                                    })
                                    .then(() => {
                                        alert("Votre mot de pass a été mis à jour");
                                        console.log("password successfully updated")
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                                setSubmitting(false);
                            }, 400);

                            //
                            changeModeTo('normal');
                        }}
                    >

                        {({isSubmitting}) => (

                            <Form>
                                <div className="flex flex-col pt-16 mx-auto items-center
                    md:flex-row flex-wrap md:justify-center md:max-w-2xl">


                                    <div className="flex flex-col m-4 md:m-8">
                                        <label htmlFor='oldPassword' className='block mb-1 mt-2'>Mot de passe actuel :</label>
                                        <Field type="password" id="oldPassword" name="oldPassword" autocomplete='off'
                                               className='handWritten mb-4 pl-1 text-2xl rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="oldPassword" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>
                                    </div>

                                    <div className="flex flex-col m-4 md:m-8">
                                        <label htmlFor='newPassword' className='block mb-1 mt-2'>Nouveau mot de passe :</label>
                                        <Field type="password" id="newPassword" name="newPassword" autocomplete='new-password'
                                               className='handWritten mb-4 pl-1 text-2xl rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="newPassword" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>
                                    </div>


                                    <div className="admin flex flex-col m-4 mx-16 md:mx-4 md:w-full">
                                        <div className="md:flex md:flex-row md:justify-around">
                                            <Button type='reset' text="Annuler" onClick={() => {changeModeTo('normal')}}>
                                            </Button>
                                            <Button type='submit' text="Confirmer le changement">
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                        )}
                    </Formik>   // end of change password case
                )}
            </div>
        )
    }
    else if (mode === 'rmProfile') {
        return (
            <div className="text-coffee-dark">
                {loading ? ("loading ...") : (
                    <Formik     // change password case
                        initialValues={{ }}

                        validate={values => { }}

                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {

                                console.log("try to delete profile ...");

                                axios.delete(`http://localhost:4000/api/user/deluser/${data.user.id}`)
                                    .then(function (response) {
                                        console.log("response status " + response.status);
                                    })
                                    .then(() => {
                                        alert("Le compte a été supprimé");
                                        console.log("profile successfully removed")
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                                setSubmitting(false);
                            }, 400);

                            // disconnect from app
                            setJWT_token(null);
                        }}
                    >

                        {({isSubmitting}) => (

                            <Form>
                                <div className="flex flex-col p-16 mx-auto justify-center items-center
                                max-w-96 md:max-w-2xl">


                                    <p>Êtes-vous sûr de vouloir supprimer votre profil ?</p>
                                    <p>Vos articles et commentaires seront conservés.</p>
                                    <p>Pour les supprimer aussi, veuillez vous adressez à un modérateur.</p>
                                    <p className="text-red-600">Cette action est irréversible.</p>


                                    <div className="admin flex flex-col m-4 mx-16 md:mx-4">
                                        <div className="my-8 mx-auto">
                                            <Button type='reset' text="Annuler" onClick={() => {changeModeTo('normal')}}>
                                            </Button>
                                        </div>
                                            <Button type='submit' text="Confirmer la suppression" className={"warning"}>
                                            </Button>
                                    </div>

                                </div>
                            </Form>
                        )}
                    </Formik>   // end of change password case
                )}
            </div>
        )
    }
    else {  // normal case
        return (
            <div className="pt-16">
                {loading ? ("loading ...") : (
                    <Formik     // normal case
                        initialValues={{
                            //imgUrl:     data.user.imgUrl,
                            pseudo:     data.user.pseudo,
                            password:   data.user.password,
                            firstName:  data.user.firstName,
                            lastName:   data.user.lastName,
                            email:      data.user.email,
                            about:      data.user.about || "Quelques mots sur vous",
                        }}

                        validate={values => {
                            const errors = {};
                            if (!values.pseudo) {
                                errors.pseudo = 'Champ requis';
                            }
                            if (!values.firstName) {
                                errors.firstName = 'Champ requis';
                            }
                            if (!values.lastName) {
                                errors.lastName = 'Champ requis';
                            }
                            if (!values.email) {
                                errors.email = 'Champ requis';
                            }
                            return errors;
                        }}

                        onSubmit={(values, {setSubmitting}) => {
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

                                axios.put(`http://localhost:4000/api/user/update/${data.user.id}`, payload)
                                    .then(function (response) {
                                        console.log("response status " + response.status);
                                    })
                                    .then(() => {
                                        alert("Votre profil a été mis à jour");
                                        console.log("profile successfully updated")
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                                setSubmitting(false);
                            }, 400);
                        }}
                    >

                        {({isSubmitting}) => (

                            <Form>
                                <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center
                    md:flex-row flex-wrap md:justify-center md:max-w-2xl">
                                    <img
                                        className="rounded-2xl bg-white md:m-8 md:self-start "
                                        src="src/assets/coffee-cup-192.png"
                                        alt="Profile picture"
                                        max-width={200} max-height={200}    // md: 200 -> 300
                                        onClick={() => {
                                            alert("Choisissez une photo")
                                        }
                                        }
                                    />

                                    <div className="names flex flex-col m-4 md:m-8">
                                        <label htmlFor='pseudo' className='block mb-1'>Pseudo :</label>
                                        <Field type='text' id="pseudo" name="pseudo" className='handWritten mb-4 pl-1 text-2xl  rounded
                focus:outline-none focus:ring focus:ring-offset-4 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="pseudo" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>

                                        <label htmlFor='firstName' className='block mb-1 mt-2'>Prénom :</label>
                                        <Field type='text' id="firstName" name="firstName" className='handWritten mb-4 pl-1 text-2xl  rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="firstName" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>

                                        <label htmlFor='lastName' className='block mb-1 mt-2'>Nom :</label>
                                        <Field type='text' id="lastName" name="lastName" className='handWritten mb-4 pl-1 text-2xl  rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="lastName" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>

                                        <label htmlFor='email' className='block mb-1 mt-2'>Email :</label>
                                        <Field type="email" id="email" name="email" className='handWritten mb-4 pl-1 text-2xl  rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="email" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>
                                    </div>

                                    <div className="intro flex flex-col m-4 md:w-full ">
                                        <label htmlFor='about' className='block mb-1'>A propos de moi :</label>
                                        <Field type='undefined' autoComplete='off' id="about" name="about"
                                               className='handWritten mb-4 pl-1 text-2xl  rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-prim-light'/>
                                        <ErrorMessage name="about" component="div"
                                                      className='-mt-4 mb-1 text-red-500'/>
                                    </div>

                                    <div className="admin flex flex-col m-4 mx-16 md:mx-4 md:w-full">
                                        <p>Gestion du compte :</p>
                                        <div className="md:flex md:flex-row md:justify-around">
                                            <Button type='button' text="Changer le mot de passe"
                                                    onClick={() => {
                                                        changeModeTo('changePW')
                                                    }}>
                                            </Button>
                                            <Button type='button' text="Supprimer le compte"
                                                    onClick={() => {
                                                        changeModeTo('rmProfile')
                                                    }}>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="btns flex flex-row w-full justify-evenly my-8">
                                        <Button text="Retour" type='reset'
                                                onClick={() => {
                                                    history.goBack();
                                                }}>
                                        </Button>
                                        <Button text="Valider" type='submit'>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>   // end of normal case
                )}
            </div>
        )
    }
}

