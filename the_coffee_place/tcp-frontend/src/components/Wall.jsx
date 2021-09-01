import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import {useGet} from '../utils/useGet';
import {useGetLikedPost} from '../utils/useGetLikedPost';

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";
import Moderator from "./Moderator";



export default function Wall({currentUser, handleNewChild, isAdmin}) {
    const [moderate, setModerate] = useState(false);
    const [target, setTarget] = useState({type: '', id: 0}); // targeted by moderator

    const {data, loading} = useGet('http://localhost:4000/api/posts');
    const {listOfLikedPost, finding} = useGetLikedPost(`http://localhost:4000/api/user/${currentUser}/likedposts`);

    useEffect(() => { document.title = "Discussion"; });


    return (
        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
                <>
                    <Redactor author={currentUser}
                              newPost={handleNewChild}/>

                {(loading || finding) ? "loading ..." : (
                    data.slice(0).reverse().map(({date, clock, text, author, nOfLike, nOfComment, UserId, postId }) => {
                        let key = uuidv4();
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
                                newComm={handleNewChild}
                                isAdmin={isAdmin}
                                setModerate={setModerate}
                                setTarget={setTarget}
                            />
                        )
                    })
                )}

                    {(!moderate) ? null : <Moderator setModerate={setModerate}
                                                     target={target}
                                                     moderated={handleNewChild} /> }
            </>

        </div>
    );
}
