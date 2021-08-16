import React, { useState } from "react";

import Redactor from "./Redactor";
import Post from "./Post";


const fakePosts = [
    {username:"toto", post:"C'est l'histoire d'une sardine qui rentre dans un bar"},
    {username:"KeuV'1", post:"Hier je mais acheter une Mégane RS, en bonne étas ! Ces tros de la bombe cet baniol"},
    {username:"JP (de la compta)", post:"Quelqu'un sait où se trouve mon bureau ? je veux dire, à part moi."},
    {username:".", post:".."},
    {username:"JEAN-JEAN", post:"APERO ?\n"+"APERO ! APERO ! APERO !\n"+"APEROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO\n"+"et glou"},
    {username:"WikiBot", post:"En géométrie euclidienne, un cercle est une courbe plane fermée constituée des points situés à égale distance d'un point nommé centre. La valeur de cette distance est appelée rayon du cercle.\n" +
            "\n" +
            "Dans le plan euclidien, il s'agit du « rond » qui est associé en français au terme de cercle. Dans un plan non euclidien ou dans le cas de la définition d'une distance non euclidienne, la forme peut être plus complexe. Dans un espace de dimension quelconque, l'ensemble des points placés à une distance constante d'un centre est appelé sphère.\n" +
            "\n" +
            "D'autres formes peuvent être qualifiées de « rondes » : les surfaces et solides dont certaines sections planes sont des cercles (cylindres, cônes, tore, anneau, etc.)"}
]

export default function Flow() {
    return (
        <div className="mx-auto pb-8 w-5/6">
            <Redactor />
            <>
                { fakePosts.map(({username, post}) =>{
                    return (
                        <Post fakeUsername={username} fakeText={post}/>
                    )
                })

                }
            </>

        </div> );
}