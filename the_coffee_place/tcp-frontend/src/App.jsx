import React, { useState, useEffect } from 'react';
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

    const [haveNewPost, setHaveNewPost] = useState(true);

    function handleNewPost() {
        setHaveNewPost(false);
    }

    useEffect(() => {
        if (haveNewPost === false) {setHaveNewPost(true)}
    }, [haveNewPost]);


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
                                    {haveNewPost ? <Wall currentUser={currentUser} handleNewPost={handleNewPost}/> : null }
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
