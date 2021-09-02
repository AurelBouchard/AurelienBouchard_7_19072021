import React, {useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Button from './TCP_button'
import {useGet} from "../utils/useGet";


const Commentor = ({currentUser, postId, onNewComm, isAdmin, setModerate, setTarget}) => {

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
                                        onNewComm();

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
                                <div className="p-3 flex flex-col rounded-3xl text-coffee-dark">
                                    {loading ? "loading ..." : (
                                        data.map((oldComm) => {
                                            let key = uuidv4();
                                            console.log(oldComm)
                                            return (
                                                <div key={key}>
                                                    <span>{oldComm.author} :</span>
                                                    <span className="handWritten text-2xl ml-4">{oldComm.text}</span>
                                                    {(!isAdmin) ? null : <span className="text-red-500 ml-6 hover:cursor-pointer"
                                                                               onClick={(e) => {
                                                                                   e.stopPropagation();
                                                                                   setTarget({type: 'commentaire', id: oldComm.id});
                                                                                   setModerate(true);
                                                                               }
                                                                               } ><i className="far fa-trash-alt"></i></span> }
                                                </div>
                                            )
                                        })
                                    )}

                                    <div className=" flex flex-row">
                                        <p className="mr-2">Vous : </p>
                                        <div className="bg-ter-light rounded-2xl flex-1">
                                            <input className="handWritten text-2xl bg-transparent w-full pl-2
                                        overflow-ellipsis overflow-hidden whitespace-pre-line cursor-pointer"
                                                   type='undefined'
                                                   onChange={props.handleChange}
                                                   value={props.values.currentComm}
                                                   name='currentComm'
                                            />
                                        </div>

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