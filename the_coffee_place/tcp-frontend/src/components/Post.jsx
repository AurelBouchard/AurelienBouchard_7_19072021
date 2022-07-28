import React, {useState, useEffect} from 'react';
import axios from "axios";


import Commentor from "./Commentor";

/**
 * Display a card of a post with all props as data
 *
 * @param date
 * @param clock
 * @param liked
 * @param text
 * @param author
 * @param nOfComm
 * @param nOfLike
 * @param postId
 * @param currentUser
 * @param onNewComm
 * @param onLikeChange
 * @param isAdmin
 * @param setModerate
 * @param setTarget
 * @returns {JSX.Element}
 * @constructor
 */
export default function Post({date, clock, liked, text, author, nOfComm, nOfLike, postId,
                                 currentUser, onNewComm, onLikeChange, isAdmin, setModerate, setTarget}) {
    const [showComm, setShowComm] = useState(false);
    let clicable = true;


    return (
        <>
            <div className="mt-4 p-3 flex flex-col rounded-3xl bg-white text-coffee-dark relative">
                <div className="bg-ter-light rounded-2xl px-1 cursor-pointer"
                     /* onClick={() => {    */
                     /*       will handle large view with router.redirect and router.parameters     */
                    /*alert('show full')}} */
                    >

                    <p className="pl-1 handWritten text-2xl
                    overflow-ellipsis overflow-hidden whitespace-pre-line">{text}</p>
                </div>

                <div className="footer flex flex-col md:flex-row justify-between md:items-end">
                    <div className="flex flex-row">
                        <p className="mt-2 mr-4 font-EXO">{clock}</p>

                        <div className=" flex flex-row justify-end flex-1">
                            <p className="handWritten text-2xl  min-w-0 max-h-8
                            overflow-hidden overflow-ellipsis whitespace-pre-line pr-2 -mr-1">{author}</p>

                            {(!clicable) ? null :

                                <div className="block"
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         console.log("click sur like / not like, etat de isLiked :");
                                         console.log(liked);

                                         const payload = {
                                             liked:     !liked,
                                             pseudo:    currentUser
                                         }

                                         // send new state to backend
                                         axios.put(`http://localhost:4000/api/posts/${postId}/like`, payload)
                                             .then(function (response) {
                                                 console.log("response status "+response.status);
                                             })
                                             .then(() => {
                                                 console.log("like/notlike ok");
                                                 // anyway need reload wall (post's parent)
                                                 onLikeChange();
                                             })
                                             .catch(err => {
                                                 console.log(err);
                                                 // anyway need reload wall (post's parent)
                                                 onLikeChange();
                                             });

                                         clicable = true;

                                     }}>
                                    {liked ? <span className="liked ml-1 h-8 text-sec-med text-xl"><i className="fas fa-thumbs-up "></i></span>
                                        : <span className="notliked pt-1 ml-1 h-8 text-ter-light"><i className="fas fa-thumbs-up mt-2 "></i></span> }
                                </div>

                            }
                        </div>
                    </div>

                    <div className="comments cursor-pointer h-6 flex flex-row"
                         onClick={() => {setShowComm(!showComm);} }>
                        <span className="overflow-ellipsis overflow-hidden h-6 mr-2 min-w-0 flex-shrink">
                            Commentaires
                        </span>
                        <span className="-ml-1 mr-1">
                            ({nOfComm})
                        </span>
                        {(!showComm) ? <span className="h-6 inline-bloc flex-shrink-0"><i className="fas fa-chevron-down"></i></span>
                            : <span className="h-6 bloc flex-shrink-0"><i className="fas fa-chevron-up"></i></span> }
                    </div>

                </div>

                {(!showComm) ? null : <Commentor postId={postId}
                                                 currentUser={currentUser}
                                                 onNewComm={onNewComm}
                                                 isAdmin={isAdmin}
                                                 setModerate={setModerate}
                                                 setTarget={setTarget}/> }

                {(!isAdmin) ? null : <div className="absolute bottom-4 -right-6 text-red-500 hover:cursor-pointer"
                                          onClick={() => {
                                              setTarget({type: 'post', id: postId});
                                              setModerate(true);
                                          }
                                          }><i className="far fa-trash-alt">
                </i></div> }

            </div>


{/*
            {date ? <div className="border-b border-coffee-dark md:-mt-4 w-full flex flex-row justify-center md:justify-start
            font-EXO text-coffee-dark cursor-pointer"
                         onClick={() => {
                alert("roll posts with that date")
            }}>
                <span className=""><i className="fas fa-chevron-up"></i> {date}</span>
                </div> : null}
            */}
        </>

    )
};




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