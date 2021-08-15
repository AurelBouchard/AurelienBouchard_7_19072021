import React, {useState, useEffect, useRef} from 'react';

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import {H1,H2,H3,H4,H5,H6} from "./Headings.jsx";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import {Input} from "@material-tailwind/react";


function CreateAccount() {
    const cancelRef = useRef();
    const pseudoRef = useRef();
    const captchaRef = useRef();

    useEffect(() => {
        document.title = "Inscription";
        loadCaptchaEnginge(6);
    });

    return (
        <div className="flex flex-col pt-16 md:pt-32 items-center w-full h-auto min-h-screen">

            <div  className="mx-24 max-w-sm">
                <Card>
                    <CardHeader color="yellow" size="lg">
                        <H2 color="white">Inscription</H2>
                    </CardHeader>

                    <CardBody>
                        <div className="mt-4 mb-8 px-4">
                            <InputIcon
                                type="text"
                                color="yellow"
                                placeholder="Pseudo"
                                iconName="account_circle"
                                ref={pseudoRef}
                            />
                            <Tooltips placement="top" ref={pseudoRef}>
                                <TooltipsContent>Tel que l'on vous appelle</TooltipsContent>
                            </Tooltips>
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="email"
                                color="yellow"
                                placeholder="Email Address"
                                iconName="email"
                            />
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="password"
                                color="yellow"
                                placeholder="Mot de passe"
                                iconName="lock"
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="yellow"
                                placeholder="Confirmez mot de passe"
                                iconName="lock"
                            />
                        </div>
                        <div className="mb-8 px-4">
                            <div className="py-4 mx-auto">
                                <LoadCanvasTemplateNoReload className="text-center"/>
                            </div>
                            <Input
                                id="user_captcha_input"
                                type="text"
                                color="yellow"
                                placeholder="Copiez le captcha"
                                ref={captchaRef}
                            />
                            <Tooltips placement="top" ref={captchaRef}>
                                <TooltipsContent>Anti robot</TooltipsContent>
                            </Tooltips>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-between">
                            <Button
                                color="orange"
                                buttonType="filled"
                                size="4xl"
                                ripple="dark"
                            >
                                Valider
                            </Button>
                            <Button
                                color="orange"
                                buttonType="filled"
                                size="4xl"
                                ripple="dark"
                                ref={cancelRef}
                            >
                                Annuler
                            </Button>
                            <Tooltips placement="top" ref={cancelRef}>
                                <TooltipsContent>Revenir à l'écran de connection</TooltipsContent>
                            </Tooltips>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>


    )
};

export default CreateAccount;