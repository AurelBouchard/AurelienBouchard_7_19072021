import React, {useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Button from './TCP_button'
import {useGet} from "../utils/useGet";

const Commentor = ({currentUser, postId, newComm}) => {
    //const [isOpen, toggleOpen] =useState(false);

    const {data, loading} = useGet(`http://localhost:4000/api/posts/${postId}/comments`);

    return (
        <div className="flex flex-col align-center">
                <>
                    <Formik
                        initialValues={{currentComm: ''}}

                        validate={values => {
                            const errors = {};
                            if (!values.currentComm) { errors.currentComm = "Vous n'avez rien écrit"; }
                            else if (false) {
                                //contrôle préalable des grossiertés :
                                // passer le texte en minuscules
                                // comparer à la liste des gros mots
                            }
                            return errors;
                        }}

                        onSubmit={(values, actions ) => {   //{ setSubmitting }
                            setTimeout(() => {
                                console.log("try to send comment")

                                const payload = {
                                    author:     currentUser,
                                    comm:       values.currentComm,
                                }

                                axios.put(`http://localhost:4000/api/posts/${postId}/comment`, payload)
                                    .then(function (response) {
                                        console.log("response status "+response.status);
                                    })
                                    .then(() => {
                                        console.log("comment successfully added");

                                        // reset values
                                        actions.resetForm();

                                        // reload wall (commentor's parent)
                                        newComm();

                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                                actions.setSubmitting(false);
                            }, 400);
                        }}

                    >
                        {props => (
                            <Form >
                                <div className="p-3 flex flex-col rounded-3xl bg-white md:ml-28 text-coffee-dark">
                                    {/*affichage des commentaires précédents*/}
                                    {loading ? "loading ..." : (
                                        data.slice(0).reverse().map((oldComm) => {
                                            let key = uuidv4();
                                            return (
                                                <p key={key}>{oldComm.text}</p>
                                            )
                                        })
                                    )}


                                    <div className="bg-blue-gray-100 rounded-2xl px-1 cursor-pointer">
                                        <input className="handWritten text-2xl bg-transparent w-full
                            overflow-ellipsis overflow-hidden whitespace-pre-line"
                                               type='undefined'
                                               onChange={props.handleChange}
                                               value={props.values.currentComm}
                                               name='currentComm'
                                        />
                                    </div>
                                    {props.errors.currentComm && <div id="feedback">{props.errors.currentComm}</div>}

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

        </div>

    );
}

export default Commentor;