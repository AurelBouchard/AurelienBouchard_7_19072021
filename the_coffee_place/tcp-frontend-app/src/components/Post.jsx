import React from 'react';
import {Link} from 'react-router-dom';


export default function Post({date, clock, liked, fakeText, fakeUsername}) {

    return (
        <>
            {date ? <div className="bg-gray-500 w-full mx-auto">{date}</div> : null}
            <div
                className="my-4 p-3 flex flex-col rounded-3xl bg-white"
                onClick={
                    /*        will handle large view with router.redirect and router.parameters     */
                    null}
            >
                <div className="bg-blue-gray-100 rounded-2xl px-1">
                    <p
                        className="handWritten text-2xl
                            overflow-ellipsis overflow-hidden whitespace-pre-line">{fakeText}</p>
                </div>
                <div className="footer flex flex-row justify-between items-end">
                    <p className="mono mt-2">{clock}</p>
                    <div className="mt-2 flex flex-row ">
                        <span className="handWritten text-2xl">{fakeUsername}</span>
                        {liked ? <span className="liked ml-2 h-8 text-yellow-700 text-xl"><i className="fas fa-thumbs-up"></i></span>
                            : <span className="notliked ml-2 pt-1 h-8 text-gray-300"><i className="fas fa-thumbs-up"></i></span> }
                    </div>
                </div>
            </div>
        </>

    )
}


/*
* time formating :
*     const time = new Date;
* time.toLocaleString('fr-FR')).split(',')[0]
* */


const badWords = [
    "con",
    "cons",
    "conne",
    "connes",
    "connard",
    "connards",
    "connasse",
    "connasses",
    "salop",
    "salops",
    "salope",
    "salopes",
    "pute",
    "putes",
    "pd",
    "pédé",
    "pédés",
    "enculé",
    "enculée",
    "enculés",
    "enculées",
    "putain",
    "putains",
    "bite",
    "bites",
    "couilles",
    "couille",
    "branleur",
    "branleurs",
    "saloperie",
    "saloperies",
    "foutre",
    "foutres",
    "crétin",
    "crétins",
    "crétine",
    "crétines",
    "couillon",
    "couillons",
    "couillone",
    "couillones"
]