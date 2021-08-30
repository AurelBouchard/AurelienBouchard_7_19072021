import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import {useGet} from '../utils/useGet';
import {useGetLikedPost} from '../utils/useGetLikedPost';

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";



export default function Wall({currentUser, handleNewPost}) {

    const {data, loading} = useGet('http://localhost:4000/api/posts');
    const {listOfLikedPost, finding} = useGetLikedPost(`http://localhost:4000/api/auth/${currentUser}/likedposts`);
    // listOfLikedPost format : [ [1], [3], ... ]

    useEffect(() => {
        document.title = "Discussion";
    });

    return (
        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
                <>
                    <Redactor author={currentUser} newPost={handleNewPost}/>
                {(loading || finding) ? "loading ..." : (
                    data.slice(0).reverse().map(({date, clock, text, author, nOfLike, nOfComment, UserId, postId }) => {
                        let key = uuidv4();
                        console.log("list of liked posts :")
                        console.log(listOfLikedPost);
                        const isLiked = listOfLikedPost.includes(postId);
                        return (
                            <Post
                                key={key}
                                date={date}
                                clock={clock}
                                liked={isLiked}
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
