import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import AccessToWall from "./AccessToWall";

/**
 * error 404 page with shortcut to Wall
 *
 * @returns {JSX.Element}
 */
export default function notFound() {
    return (
            <div className="flex flex-col flex-wrap p-16 items-center justify-center w-full md:flex-row md:justify-evenly">

                <div className="w-1/2 mx-auto mt-16">
                    <p className="handWritten text-9xl">
                        404
                    </p>
                </div>
                <div className="w-1/2 mx-auto mt-16">
                    <p className="handWritten text-4xl">
                        Page inexistante !
                    </p>
                </div>

                <AccessToWall className={"fixed bottom-32"}/>
            </div>
    )
};