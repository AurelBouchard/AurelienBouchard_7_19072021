import React, { useState } from 'react';
//import './style/App.css';
import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";


import Connexion from './components/Connexion';
import CreateAccount from "./components/CreateAccount";
import Flow from "./components/Flow";
import {useFetch} from "./components/useFetch";
import Members from "./components/Members";
import ProfileEditor from "./components/ProfileEditor";

function App() {
    const [isConnected, setConnected] = useState(false);
    const [askForSubscription, setAsk] = useState(false);
    const pages = ['connect', 'subscribe', 'coffeePlace', 'profile'];
    const [currentPage, changeCurrentPage] = useState(0);

    // ################################################################################################################
    const {data, loading} = useFetch('https://randomuser.me/api/?results=23&nat=fr&inc=gender,name,email,login,phone,picture&noinfo');


    const handleConnect = () => {      console.log("handle connect");
        if (filledName && filledPass) {
            setConnected(true);
            setAsk(false);
            //alert("vous etes connecté !!");
        } else {
            alert("remplissez tout les champs svp")
        }
    };


    const [filledName, setFilledName] = useState(false);
    const [filledPass, setFilledPass] = useState(false);
    const handleConnectChange = (e) =>{   //console.log("handle connect change");
        if (e.target.id === 'pseudo') {
            e.target.value.length === 0 ? setFilledName(false) : setFilledName(true)}
        if (e.target.id === 'password') {
            e.target.value.length === 0 ? setFilledPass(false) : setFilledPass(true)}
    };

    const handleAsk = () => {
        setAsk(true)
    }


    return (
        <div className="App bg-blue-100">
            {askForSubscription ? <CreateAccount /> : null}
            {(!isConnected && !askForSubscription) ?
                <Connexion
                      handleConnect={handleConnect}
                      onChange={handleConnectChange}
                      setAsk={handleAsk}
                /> : null}
            { isConnected ?
                <>
                    {/*<Flow />*/}
                    <Members data={data} loading={loading} />
                    {/*<ProfileEditor />*/}
                </> : null}
        </div>
    )
}

export default App;
