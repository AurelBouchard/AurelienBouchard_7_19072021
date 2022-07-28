import React, {useState, useEffect, useCallback} from "react";
import { v4 as uuidv4 } from 'uuid';

import {useGet} from '../utils/useGet';

import {useUsersLikes} from '../utils/useUsersLikes';

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";
import Moderator from "./Moderator";
import {usePosts} from "../utils/usePosts";


/**
 * Page displaying all posts, newest first.
 *
 * @param currentUser
 * @param handleNewChild used to rerender
 * @param isAdmin
 * @returns {JSX.Element}
 * @constructor
 */
export default function Wall({currentUser, handleNewChild, isAdmin}) {
    const [moderate, setModerate] = useState(false);
    const [target, setTarget] = useState({type: '', id: 0}); // targeted by moderator
    const [postMutations, setPostMutations] = useState(0);
    const [likeMutations, setLikeMutations] = useState(0);

    const {data, loading} = usePosts(postMutations);
    const {listOfLikedPost, finding} = useUsersLikes(likeMutations, currentUser);

    useEffect(() => { document.title = "Discussion"; });

    const updatePostMutations = useCallback(() => setPostMutations(m => m + 1), []);
    const updateLikeMutations = useCallback(() => setLikeMutations(m => m + 1), []);
    
    
    
    return (
        <div className="absolute top-12 w-full">
            <div className="mx-auto p-8 md:w-5/6 max-w-3xl cursor-default">
                <>
                    <Redactor author={currentUser}
                              onNewPost={updatePostMutations} />

                    {(loading || finding) ? "loading ..." : (
                        data.slice(0).reverse().map(({date, clock, text, author, nOfLike, nOfComment, postId }) => {
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
                                    postId={postId}
                                    currentUser={currentUser}
                                    onNewComm={updatePostMutations}
                                    onLikeChange={updateLikeMutations}
                                    isAdmin={isAdmin}
                                    setModerate={setModerate}
                                    setTarget={setTarget}
                                />
                            )
                        })
                    )}

                    {(!moderate) ? null : <Moderator setModerate={setModerate}
                                                     target={target}
                                                     onModerate={updatePostMutations} /> }
                </>

            </div>

        </div>
    );
}
