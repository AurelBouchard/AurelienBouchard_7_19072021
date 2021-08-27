import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {useFetch} from "../utils/useFetch";

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";



export default function Wall({currentUser}) {

    const {data, loading} = useFetch('http://localhost:4000/api/posts');

    return (
        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
            <Redactor author={currentUser}/>
            <>
                {loading ? "loading ..." : (
                    data.map(({datetime, text, author   }) => {
                        let key = uuidv4();
                        return (
                            <Post
                                key={key}
                                date={datetime}
                                clock={datetime}
                                liked={true}
                                username={author}
                                text={text}/>
                        )
                    })
                )}
            </>
        </div>
    );
}
