import React from 'react';
import axios from "axios";

import Button from './TCP_button'


const Moderator = ({setModerate, target, moderated}) => {

    return (
        <div className="bg-opacity-20 backdrop-filter backdrop-blur-sm h-full w-full fixed top-0 left-0
                flex flex-col justify-center items-center " onClick={() =>{
            setModerate(false);
        } }>
            <p className="bg-white p-2 rounded-lg border border-red-600">Êtes-vous sûr de vouloir supprimer ce {target.type} ?</p>
{/*            <p>{JSON.stringify(target)}</p>*/}
            <div className="flex justify-evenly w-full mt-4">
                <Button text="Annuler" onClick={() => { setModerate(false);}} >
                </Button>
                <Button text="Confirmer" onClick={() => {
                    if (target.type === 'commentaire') {
                        axios.delete(`http://localhost:4000/api/posts/comment/${target.id}`)
                    }
                    if (target.type === 'post') {
                        axios.delete(`http://localhost:4000/api/posts/${target.id}`)
                    }
                    moderated(true);
                    setModerate(false);
                }} >
                </Button>
            </div>
        </div>
    );
}

export default Moderator;
