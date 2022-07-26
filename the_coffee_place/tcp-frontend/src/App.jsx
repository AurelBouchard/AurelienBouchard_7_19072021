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




function App() {
    const [askForSubscription, setAskForSubscription] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [JWT_token, setJWT_token] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [haveNewChild, setHaveNewChild] = useState(true);



    function handleNewChild() {
        setHaveNewChild(false);
        console.log("should refresh app")
    }

    useEffect(() => {
        if (haveNewChild === false) {setHaveNewChild(true)}
    }, [haveNewChild]);


    function handleAskForSubscription(bool) {
        setAskForSubscription(bool);
    };


    return (
            <div className="App text-prim font-EXO" >

                    <Router>
                        {!JWT_token ?
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
                                                setJWT_token={setJWT_token}
                                                setAskForSubscription={handleAskForSubscription}
                                                setCurrentUser={setCurrentUser}
                                                setIsAdmin={setIsAdmin}
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
                                <Navbar JWT_token={JWT_token}
                                        setJWT_token={setJWT_token}/>
                                <Switch>
                                    <Route path='/login'>
                                        <Redirect to='/wall'></Redirect>
                                    </Route>

                                    <Route exact path='/wall'>
                                        {haveNewChild ?
                                            <Wall JWT_token={JWT_token}
                                                  currentUser={currentUser}
                                                  handleNewChild={handleNewChild}
                                                  isAdmin={isAdmin} />
                                            : null }
                                    </Route>

                                    <Route exact path='/members'>
                                        <Members JWT_token={JWT_token}
                                                 isAdmin={isAdmin} />
                                    </Route>

                                    <Route exact path='/myprofile'>
                                        <ProfileEditor JWT_token={JWT_token}
                                                       currentUser={currentUser}
                                                       setJWT_token={setJWT_token} />
                                    </Route>

                                    <Route exact path='/settings'>
                                        <Settings JWT_token={JWT_token}
                                                  currentUser={currentUser}
                                                  isAdmin={isAdmin}
                                                  setIsAdmin={setIsAdmin} />
                                    </Route>

                                    <Route path='/member/:pseudo'>
                                        <ShowProfile JWT_token={JWT_token}
                                                     isAdmin={isAdmin} />
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
{/*                )}*/}
            </div>

    )
};

export default App;
