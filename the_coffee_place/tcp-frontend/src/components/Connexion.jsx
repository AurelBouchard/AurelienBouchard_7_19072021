import React, {useState, useEffect} from 'react';

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import {H1,H2,H3,H4,H5,H6} from "./Headings.jsx";



const Connexion = ({handleConnect, onChange, setAskForSubscription}) => {

    return (
        <div className="flex flex-col justify-between items-center w-full h-auto min-h-screen">
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
                            <InputIcon
                                type="text"
                                color="yellow"
                                placeholder="Pseudo"
                                iconName="account_circle"
                                id="pseudo"
                                onChange={ (e) => { onChange(e) } }
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="yellow"
                                placeholder="Mot de passe"
                                iconName="lock"
                                id="password"
                                onChange={(e) =>{ onChange(e)}}
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center">
                            <Button
                                color="yellow"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                onClick={() =>{ handleConnect() }}
                            >
                                Se connecter
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-24">
                <Button
                    color="orange"
                    buttonType="filled"
                    size="4xl"
                    ripple="dark"
                    onClick={() =>{ setAskForSubscription() }}
                >
                    Créez un compte en 30 seconde !
                </Button>
            </div>

        </div>


    )
}

export default Connexion;