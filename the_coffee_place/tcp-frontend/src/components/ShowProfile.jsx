import React from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import Button from './TCP_button'
import {useGet} from "../utils/useGet";

export default function ShowProfile() {
    let {pseudo} = useParams();
    const history = useHistory();

    const {data, loading} = useGet(`http://localhost:4000/api/members/${pseudo}`);

    return (
        <div className="pt-16">
            {loading ? "loading ..." : (
                <div className="editor flex flex-col pt-4 md:p-8 mx-auto items-center  bg-opacity-50 backdrop-filter backdrop-blur-lg
                md:flex-row flex-wrap md:justify-center md:max-w-4xl">
                    <div className="rounded-2xl bg-white p-3 md:m-8 md:self-start w-52 h-52 md:w-96 md:h-96 flex">
                        <img
                            className="m-auto w-full h-full object-cover"
                            src='/src/assets/icon-above-font.png'
                            alt="Profile picture"
                        />

                    </div>

                    <div className="names flex flex-col m-4 md:m-8">
                        <p className="mb-8 handWritten text-4xl md:text-5xl">{data.pseudo}</p>
                        <p className="text-xl">Nom :</p>
                        <p className="mb-8 text-2xl">{data.firstName} {data.lastName}</p>
                        <p className="text-xl">Pour me contacter :</p>
                        <p className="mb-8 text-xl">{data.email}</p>
                    </div>

                    <div className="intro flex flex-col m-4 md:w-full ">
                        <p className="handWritten text-2xl mx-auto">{data.about}</p>
                    </div>

                    <div className="btns flex flex-row w-full justify-evenly my-8">

                        <Button text="Retour" type='reset'
                                onClick={() => { history.goBack(); }}>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}