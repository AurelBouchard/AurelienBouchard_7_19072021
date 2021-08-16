import React from 'react';
import {Link} from 'react-router-dom';


export default function Post({fakeText, fakeUsername}) {
    const time = new Date;
    return (
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
                        <p className="mono mt-2">{"Le "+(time.toLocaleString()).split(',')[0]}</p>
                        <p className="handWritten mt-2 text-2xl">{fakeUsername}</p>
                    </div>


                </div>
    )
}