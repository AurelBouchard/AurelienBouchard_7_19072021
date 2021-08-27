import React, {useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from './TCP_button'

const Redactor = ({author}) => {
    const [isOpen, toggleOpen] =useState(false);

    return (
        <div className="flex flex-col align-center mt-4">
            <Button
                text="Rédiger un article"
                onClick={() => {toggleOpen(!isOpen)}}
            >
            </Button>
            {(isOpen) && (
                <>
                    <Formik
                    initialValues={{post: ''}}

                    validate={values => {
                        const errors = {};
                        if (!values.post) { errors.post = "Vous n'avez rien écrit"; }
                        else if (false) {
                            //contrôle préalable des grossiertés :
                            // passer le texte en minuscules
                            // comparer à la liste des gros mots
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log("try to send post")

                            const payload = {
                                author:     author,
                                text:       values.post,
                                datetime:   Date.now(),
                            }

                            console.log(payload)

                            axios.post(`http://localhost:4000/api/posts/`, payload)
                                .then(function (response) {
                                    //console.log(response.data);
                                    console.log(response.status);
                                    //console.log(response.statusText);
                                    console.log(response.headers);
                                    console.log(response.config);
                                    //setState( {data: response, loading: false} );

                                })
                                .then(() => {
                                    console.log("Profil modifié avec succes")
                                })
                                .catch(err => {
                                    console.log(err)
                                });










                            setSubmitting(false);
                            // reset values

                            // close redactor

                            // reload wall

                        }, 400);
                    }}


                    >
                        {props => (
                            <Form >
                                <div className="mt-4 p-3 flex flex-col rounded-3xl bg-white md:ml-28 text-coffee-dark">
                                    <div className="bg-blue-gray-100 rounded-2xl px-1 cursor-pointer">
                                        <input className="handWritten text-2xl bg-transparent w-full
                            overflow-ellipsis overflow-hidden whitespace-pre-line"
                                        type='undefined'
                                        onChange={props.handleChange}
                                        value={props.values.post}
                                        name='post'
                                        />
                                    </div>
                                    {props.errors.post && <div id="feedback">{props.errors.post}</div>}

                                    <div className="btns flex flex-row w-full justify-evenly mt-3 -mb-2">
                                        <Button text="Effacer" type='reset' onClick={props.handleReset} >
                                        </Button>
                                        {props.isSubmitting ? null :
                                            <Button text="Envoyer" type='submit'>
                                            </Button>
                                        }
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </>
                )}
        </div>

    );
;}

export default Redactor;