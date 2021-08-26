// https://randomuser.me/api/?nat=fr&inc=gender,name,email,login,phone,picture&noinfo

import {useEffect, useState} from "react";

const initialState = {data:null, loading: true};

export const useFetch = (url) => {
    const [state, setState] = useState(initialState);

    useEffect(async() => {
        setState(initialState);

        fetch(url).then(res => res.json()).then( result => {
            //console.log(result);
            setState( {data: result, loading: false} );
        } )
    }, [url]);

    console.log(Date.now());
    return state;
}

/* EXAMPLE :
* {
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Raphaël",
        "last": "Dumont"
      },
      "email": "raphael.dumont@example.com",
      "login": {
        "uuid": "c3ae0f5e-ff00-4a8b-bfa2-a9c5b477b5bd",
        "username": "purpledog666",
        "password": "wicked",
        "salt": "70dcPGTD",
        "md5": "5e36c760d61e6247a7ada0909952f853",
        "sha1": "28c74f5f3fe129ec2e9146781e942a2830b04554",
        "sha256": "6c7898303b0a0a18ca84577e2ab00059239fc7546ee20fbc78c610b2e82fa700"
      },
      "phone": "04-34-46-37-85",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/34.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/34.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/34.jpg"
      }
    }
  ]
}
* */