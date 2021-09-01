import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link, useHistory} from 'react-router-dom';


import Button from './TCP_button'


export default function Settings({ JWT_token, currentUser, isAdmin}) {

    const history = useHistory();

    useEffect(() => { document.title = "Paramètres"; });


    return (
        <div className="text-coffee-dark">
            { (isAdmin) ? (
                    <div className="text-coffee-dark">
                        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
                            <p>Vous êtes administrateur !</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-coffee-dark">
                        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
                            <Formik     // change password case
                                initialValues={{magicWord: ''}}

                                validate={values => {
                                    const errors = {};
                                    if (!values.magicWord) { errors.magicWord = "Essayez !"; }
                                    return errors;
                                }}

                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {

                                        console.log("try to become admin ...");

                                        const payload = {magicWord: values.magicWord}

                                        axios.put(`http://localhost:4000/api/user/setadmin/${currentUser}`, payload,
                                            {headers: { Authorization: 'Bearer '+JWT_token } })
                                            .then(function (response) {
                                                console.log("response status " + response.status);
                                            })
                                            .then(() => {
                                                alert("Votre statut a été mis à jour");
                                                console.log("status successfully updated")
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            });
                                        setSubmitting(false);
                                    }, 400);

                                    // reload
                                    history.goBack();
                                }}
                            >

                                {({isSubmitting}) => (

                                    <Form>
                                        <div className="flex flex-col pt-4 md:p-8 mx-auto items-center font-EXO
                    md:flex-row flex-wrap md:justify-center md:max-w-2xl">

                                            <p>Entrez le mot magique pour devenir administrateur :</p>

                                            <div className="flex flex-col m-4 md:m-8">
                                                <Field type="text" id="magicWord" name="magicWord" autocomplete='off'
                                                       className='handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam'/>
                                                <ErrorMessage name="magicWord" component="div"
                                                              className='-mt-4 mb-1 text-red-500'/>
                                            </div>


                                            <div className="admin flex flex-col m-4 mx-16 md:mx-4 md:w-full">
                                                <div className="md:flex md:flex-row md:justify-around">
                                                    <Button type='reset' text="Annuler" onClick={() => {
                                                        history.goBack()
                                                    }}>
                                                    </Button>
                                                    <Button type='submit' text="Envoyer">
                                                    </Button>
                                                </div>
                                            </div>

                                            <p>( cette possibilité est créée uniquement à titre démonstratif )</p>

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
            )}
        </div>
    )
}
