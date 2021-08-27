import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';

//import './style/App.css';
import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";


import Connection from './components/Connection';
import CreateAccount from "./components/CreateAccount";
import Wall from "./components/Wall";
import Members from "./components/Members";
import ShowProfile from "./components/ShowProfile";
import ProfileEditor from "./components/ProfileEditor";
import NotFound from "./components/NotFound";

import Navbar from './components/TCP_navbar'

//import {} from 'dotenv/config';
//import path from 'path'
//import { config } from 'dotenv';
//config();


function App() {
    const [isConnected, setConnected] = useState(false);
    const [askForSubscription, setAskForSubscription] = useState(false);
    const lastUser = localStorage.getItem('tcp_user');
    const [currentUser, setCurrentUser] = useState(lastUser);
    let history = useHistory();


/*    function handleSubmit() {     // console.log("handle connect");
            //setConnected(true);
            //setAskForSubscription(false);
            //alert("vous etes connecté !!");
            //history.push('/wall');

    };*/


/*    const [filledName, setFilledName] = useState(false);
    const [filledPass, setFilledPass] = useState(false);
    const handleConnectChange = (e) =>{   console.log("handle connect change");
        if (e.target.id === 'pseudo') {
            e.target.value.length === 0 ? setFilledName(false) : setFilledName(true)}
        if (e.target.id === 'password') {
            e.target.value.length === 0 ? setFilledPass(false) : setFilledPass(true)}
    };*/

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
                                        <Connection
                                            setConnected={setConnected}
                                            setAskForSubscription={handleAskForSubscription}
                                            setCurrentUser={setCurrentUser}
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
                                    <ProfileEditor currentUser={currentUser} />
                                </Route>

{/*                            <Route exact path='/settings'>
<ProfileEditor />
                            </Route>*/}

{/*                            ROUTES WITH PARAMS :                    */}
                                <Route path='/member/:pseudo'>
                                    <ShowProfile />
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
