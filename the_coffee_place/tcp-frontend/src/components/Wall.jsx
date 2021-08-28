import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import {useFetch} from "../utils/useFetch";

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";
import {loadCaptchaEnginge} from "react-simple-captcha";



export default function Wall({currentUser, handleNewPost}) {

    const {data, loading} = useFetch('http://localhost:4000/api/posts');

    useEffect(() => {
        document.title = "Discussion";
    });

    return (
        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
                <>
                    <Redactor author={currentUser} newPost={handleNewPost}/>
                {loading ? "loading ..." : (
                    data.slice(0).reverse().map(({date, clock, text, author, nOfLike, nOfComment, UserId, postId }) => {
                        let key = uuidv4();
                        return (
                            <Post
                                key={key}
                                date={date}
                                clock={clock}
                                liked={true}
                                author={author}
                                text={text}
                                nOfComm={nOfComment}
                                nOfLike={nOfLike}
                                UserId={UserId}
                                postId={postId}
                                currentUser={currentUser}
                                newComm={handleNewPost}
                            />
                        )
                    })
                )}
            </>

        </div>
    );
}
