import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';

//import './style/App.css';
import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";


import Connexion from './components/Connection';
import CreateAccount from "./components/CreateAccount";
import Wall from "./components/Wall";
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
    let history = useHistory();


    function handleConnect() {     // console.log("handle connect");
        if (filledName && filledPass) {
            setConnected(true);
            setAskForSubscription(false);
            //alert("vous etes connecté !!");
            //history.push('/wall');
        } else {
            !isConnected ? alert("remplissez tout les champs svp") : setConnected(false);
        }
    };


    const [filledName, setFilledName] = useState(false);
    const [filledPass, setFilledPass] = useState(false);
    const handleConnectChange = (e) =>{   console.log("handle connect change");
        if (e.target.id === 'pseudo') {
            e.target.value.length === 0 ? setFilledName(false) : setFilledName(true)}
        if (e.target.id === 'password') {
            e.target.value.length === 0 ? setFilledPass(false) : setFilledPass(true)}
    };

    function handleAskForSubscription(bool) {
        setAskForSubscription(bool);
    };


    return (
            <div className="App bg-blue-100 pt-16 lg:pt-32l">
                <Router>
                    {!isConnected ?
                        <>
                            <Switch>
                                <Route exact path='/signin'>
                                    {askForSubscription ?
                                        <CreateAccount
                                            setAskForSubscription={handleAskForSubscription}
                                        />
                                        : <Redirect to='/login'></Redirect>
                                    }
                                </Route>

                                <Route exact path='/login'>
                                    {!askForSubscription ?
                                        <Connexion
                                            handleConnect={handleConnect}
                                            onChange={handleConnectChange}
                                            setAskForSubscription={handleAskForSubscription}
                                        />
                                        : <Redirect to='/signin'></Redirect>
                                    }
                                </Route>

                                <Route path=''>
                                    <Redirect to='/login'></Redirect>
                                </Route>
                            </Switch>
                        </>
                        :
                        <>
                            <Navbar disconnect={setConnected}/>
                            <Switch>
                                <Route path='/login'>
                                    <Redirect to='/wall'></Redirect>
                                </Route>
                                <Route exact path='/wall'>
                                    <Wall />
                                </Route>
                                <Route exact path='/members'>
                                    <Members />
                                </Route>
                                <Route exact path='/myprofile'>
                                    <ProfileEditor />
                                </Route>

{/*                            <Route exact path='/settings'>
<ProfileEditor />
                            </Route>*/}

{/*                            ROUTES WITH PARAMS :                    */}
                                <Route path='/member/:pseudo'>
                                    <ShowProfile pseudo={"toto"}/>
                                </Route>

{/*                            <Route path='/post/:id'>
                            <Post />
                        </Route>*/}



{/*                            404 ERROR :                    */}
                                <Route path='/'>
                                    <NotFound />
                                </Route>

                            </Switch>
                        </>

                    }

                </Router>
            </div>
    )
};

export default App;
