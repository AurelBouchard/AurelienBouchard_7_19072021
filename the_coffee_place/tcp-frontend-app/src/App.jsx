import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import './style/App.css';
import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";


import Connexion from './components/Connexion';
import CreateAccount from "./components/CreateAccount";
import Flow from "./components/Flow";
import {useFetch} from "./components/useFetch";
import Members from "./components/Members";
import ProfileEditor from "./components/ProfileEditor";
import NotFound from "./components/NotFound";

import Navbar from './components/TCP_navbar'
import ShowProfile from "./components/ShowProfile";

function App() {
    const [isConnected, setConnected] = useState(false);
    const [askForSubscription, setAskForSubscription] = useState(false);
    const pages = ['connect', 'subscribe', 'coffeePlace', 'profile'];
    const [currentPage, changeCurrentPage] = useState(0);

    // ################################################################################################################
    const {data, loading} = useFetch('https://randomuser.me/api/?results=23&nat=fr&inc=gender,name,email,login,phone,picture');


    const handleConnect = () => {      console.log("handle connect");
        if (filledName && filledPass) {
            setConnected(true);
            setAskForSubscription(false);
            //alert("vous etes connecté !!");
        } else {
            !isConnected ? alert("remplissez tout les champs svp") : setConnected(false);
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

    const handleAskForSubscription = () => {
        setAskForSubscription(true)
    }


    return (
            <div className="App bg-blue-100 pt-16 lg:pt-32">
                {askForSubscription ? <CreateAccount /> : null}
                {(!isConnected && !askForSubscription) ?
                    <Connexion
                        handleConnect={handleConnect}
                        onChange={handleConnectChange}
                        setAskForSubscription={handleAskForSubscription}
                    /> : null}
                { isConnected ?
                    <Router>
                        <Navbar disconnect={setConnected}/>
                        <Switch>
                            <Route exact path='/'>
                                <Flow />
                            </Route>
                            <Route exact path='/members'>
                                <Members data={data} loading={loading} />
                            </Route>
                            <Route exact path='/create'>
                                <CreateAccount />
                            </Route>
                            <Route exact path='/myprofile'>
                                <ProfileEditor />
                            </Route>
{/*                            <Route exact path='/settings'>
                                <ProfileEditor />
                            </Route>*/}

{/*                            ROUTES WITH PARAMS :                    */}
                            <Route path='/member/:id'>
                                <ShowProfile />
                            </Route>

{/*                            <Route path='/post/:id'>
                                <Post />
                            </Route>*/}



{/*                            404 ERROR :                    */}
                            <Route path=''>
                                <NotFound />
                            </Route>

                        </Switch>
                    </Router>
                    : null}
            </div>
    )
};

export default App;
