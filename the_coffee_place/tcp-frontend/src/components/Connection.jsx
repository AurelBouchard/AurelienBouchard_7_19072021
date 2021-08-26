import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//import {useAxiosPost} from '../utils/useAxiosPost';
import axios from 'axios';

import Button from './TCP_button';
import Input from './TCP_input';

import {H1, H2, H3} from "./Headings";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";



const Connection = ({setConnected, setAskForSubscription}) => (
    // no return here ??????????
    <div>
        <Formik
            initialValues={{ pseudo: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.pseudo) { errors.pseudo = 'Champ requis'; }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    console.log("try to connect ...");

                    const payload = {
                        pseudo:values.pseudo,
                        password:values.password
                    }

                    axios.post('http://localhost:4000/api/auth/login', payload)
                        .then(function (response) {
                            //console.log(response.data);
                            console.log(response.status);
                            //console.log(response.statusText);
                            console.log(response.headers);
                            console.log(response.config);
                            //setState( {data: response, loading: false} );

                            setConnected(true);
                            setAskForSubscription(false);
                        }).then().catch(err => {
                            console.log(err)
                    });


                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="mb-8 md:hidden">
                        <H2>The Coffee Place ...</H2>
                        <H3>... la salle de pause de Groupomania</H3>
                    </div>
                    <div className="h-0 md:mb-16 md:h-auto md:block overflow-hidden">
                        <H1>The Coffee Place ...</H1>
                        <H2>... la salle de pause de Groupomania</H2>
                    </div>
                    <div  className="mx-8 max-w-sm">
                        <Card>
                            <CardHeader color="yellow" size="lg">
                                <H2 color="white">Connexion</H2>
                            </CardHeader>

                            <CardBody>
                                <div className="mt-4 mb-8 px-4">
                                    <Field name="pseudo" placeholder="pseudo"/>
                                    <ErrorMessage name="pseudo" component="div" />
                                </div>
                                <div className="mb-4 px-4">
                                    <Field type="password" name="password" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center">
                                    <Button
                                        text="Se connecter"
                                        type="submit"
                                        disabled={isSubmitting}
                                        //onSubmit={handleSubmit}
                                    >
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </Form>
            )}
        </Formik>

        <div className="mt-24">
            <Button text="Créez un compte en 30 seconde !"
                onClick={() =>{ setAskForSubscription(true) }}
            >
            </Button>
        </div>
    </div>
);



export default Connection;