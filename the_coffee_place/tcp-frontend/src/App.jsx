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
import Settings from './components/Settings';
import NotFound from "./components/NotFound";

import Navbar from './components/TCP_navbar'
import {useGet} from "./utils/useGet";



function App() {
    const [isConnected, setConnected] = useState(false);
    const [askForSubscription, setAskForSubscription] = useState(false);
    const lastUser = localStorage.getItem('tcp_user');
    const [currentUser, setCurrentUser] = useState(lastUser);
    let history = useHistory();

    const [haveNewChild, setHaveNewChild] = useState(true);

    // need to know early if user is admin :
    const {data, loading} = useGet(`http://localhost:4000/api/user/${currentUser}`);    // data.user.isAdmin

    function handleNewChild() {
        setHaveNewChild(false);
    }

    useEffect(() => {
        if (haveNewChild === false) {setHaveNewChild(true)}
    }, [haveNewChild]);


    function handleAskForSubscription(bool) {
        setAskForSubscription(bool);
    };


    return (
            <div className="App bg-blue-100">

                {loading ? ("loading ...") : (
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
                                        {haveNewChild ?
                                            <Wall currentUser={currentUser}
                                                  handleNewChild={handleNewChild}
                                                  isAdmin={data.user.isAdmin} />
                                            : null }
                                    </Route>

                                    <Route exact path='/members'>
                                        <Members isAdmin={data.user.isAdmin} />
                                    </Route>

                                    <Route exact path='/myprofile'>
                                        <ProfileEditor currentUser={currentUser} setConnected={setConnected} />
                                    </Route>

                                    <Route exact path='/settings'>
                                        <Settings currentUser={currentUser} isAdmin={data.user.isAdmin} />
                                    </Route>

                                    <Route path='/member/:pseudo'>
                                        <ShowProfile isAdmin={data.user.isAdmin} />
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
                )}
            </div>

    )
};

export default App;
