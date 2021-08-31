import React, {useState} from 'react';
import axios from "axios";

import Commentor from "./Commentor";


export default function Post({date, clock, liked, text, author, nOfComm, nOfLike, UserId, postId,
                                 currentUser, newComm, isAdmin, setModerate, setTarget}) {
    const [showComm, setShowComm] = useState(false);


    return (
        <>
            <div className="mt-4 p-3 flex flex-col rounded-3xl bg-white text-coffee-dark relative">
                <div className="bg-blue-gray-100 rounded-2xl px-1 cursor-pointer"
                     onClick={() => {
                    /*        will handle large view with router.redirect and router.parameters     */
                    alert('show full')}}>
                    <p className="handWritten text-2xl
                    overflow-ellipsis overflow-hidden whitespace-pre-line">{text}</p>
                </div>

                <div className="footer flex flex-row justify-between items-end">
                    <p className="mt-2 mr-4 font-EXO">{clock}</p>

                    <div className="comments font-EXO cursor-pointer h-6 flex flex-row w-1/3"
                         onClick={() => {setShowComm(!showComm);} }>
                        <span className="overflow-ellipsis overflow-hidden h-6 mr-1 min-w-0 flex-shrink">
                            Commentaires
                        </span>
                        <span className="-ml-1 mr-1">
                            ({nOfComm})
                        </span>
                        {(!showComm) ? <span className="h-6 inline-bloc flex-shrink-0"><i className="fas fa-chevron-down"></i></span>
                            : <span className="h-6 bloc flex-shrink-0"><i className="fas fa-chevron-up"></i></span> }
                    </div>

                    <div className="mt-2 flex flex-row justify-end">
                        <p className="handWritten text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap h-8 pr-2 -mr-1">{author}</p>
                        <div className="h-8 flex flex-col"
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

                                         // reload wall (post's parent)
                                         newComm();
                                     })
                                     .catch(err => { console.log(err) });

                        }}>
                            {liked ? <span className="liked ml-1 h-8 text-coffee text-xl"><i className="fas fa-thumbs-up"></i></span>
                            : <span className="notliked pt-1 ml-1 h-8 text-gray-300"><i className="fas fa-thumbs-up"></i></span> }
                        </div>
                    </div>
                </div>

                {(!showComm) ? null : <Commentor postId={postId} currentUser={currentUser} newComm={newComm}
                                                 isAdmin={isAdmin} setModerate={setModerate} setTarget={setTarget}/> }

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