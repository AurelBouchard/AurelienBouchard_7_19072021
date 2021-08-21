import React, { useState } from "react";

import Redactor from "./Redactor";
import Post from "./Post";
import ScrollToTop from "./ScrollToTop";


const fakePosts = [
    {key:"001", date:"17/08/2021", clock:"12:35:00", liked:true, username:"toto", post:"C'est l'histoire d'une sardine qui rentre dans un bar"},
    {key:"002", date:"", clock:"13:22:00", liked:true, username:"KeuV'1", post:"Hier je mais acheter une Mégane RS, en bonne étas ! Ces tros de la bombe cet baniol"},
    {key:"003", date:"", clock:"07:01:00", liked:false, username:"JP (de la compta)", post:"Quelqu'un sait où se trouve mon bureau ? je veux dire, à part moi."},
    {key:"004", date:"16/08/2021", clock:"04:35:00", liked:false, username:".", post:".."},
    {key:"005", date:"", clock:"17:59:00", liked:true, username:"JEAN-JEAN", post:"APERO ?\n"+"APERO ! APERO ! APERO !\n"+"APEROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO\n"+"et glou"},
    {key:"006", date:"15/08/2021", clock:"16:12:00", liked:false, username:"WikiBot", post:"En géométrie euclidienne, un cercle est une courbe plane fermée constituée des points situés à égale distance d'un point nommé centre. La valeur de cette distance est appelée rayon du cercle.\n" +
            "\n" +
            "Dans le plan euclidien, il s'agit du « rond » qui est associé en français au terme de cercle. Dans un plan non euclidien ou dans le cas de la définition d'une distance non euclidienne, la forme peut être plus complexe. Dans un espace de dimension quelconque, l'ensemble des points placés à une distance constante d'un centre est appelé sphère.\n" +
            "\n" +
            "D'autres formes peuvent être qualifiées de « rondes » : les surfaces et solides dont certaines sections planes sont des cercles (cylindres, cônes, tore, anneau, etc.)"}
]

export default function Flow() {
    return (
        <div className="mx-auto pb-8 w-5/6 max-w-3xl cursor-default">
            <Redactor />
            <>
                { fakePosts.map(({key, date, clock, liked, username, post}) =>{
                    return (
                        <Post
                            key={key}
                            date={date}
                            clock={clock}
                            liked={liked}
                            fakeUsername={username}
                            fakeText={post}/>
                    )
                })

                }
            </>

        </div> );
}