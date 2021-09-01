import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';


import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";



export default function TCP_navbar({setJWT_token}) {
    const [openNavbar, setOpenNavbar] = useState(false);
    let history = useHistory();

    return (
        <nav className="flex flex-wrap items-center justify-between
        py-2.5 px-3 mb-3 absolute fixed w-full z-30 top-0
         bg-sec text-white">
            <div className="container max-w-7xl px-4 mx-auto flex flex-wrap items-center justify-between">
                <NavbarWrapper >
                    <NavbarBrand>
                        <span className="handWritten text-2xl sm:text-3xl md:text-4xl"
                              onClick={() => {history.push('/wall')}}>
                            The Coffee Place
                        </span>
                    </NavbarBrand>

                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <Link to="/myprofile" onClick={() => setOpenNavbar(!openNavbar)}>
                            <p className="hover:bg-sec-med px-2">
                                <i className="far fa-user text-lg mr-2"></i>Mon profile</p>
                        </Link>

                        <Link to="/members" onClick={() => setOpenNavbar(!openNavbar)}>
                            <p className="hover:bg-sec-med px-2">
                                <i className="fas fa-users text-lg mr-2"></i>Membres</p>
                        </Link>

                        <Link to="/settings" onClick={() => setOpenNavbar(!openNavbar)}>
                            <p className="hover:bg-sec-med px-2">
                                <i className="fas fa-cog text-lg mr-2"></i>Paramètres</p>
                        </Link>

                        <Link to="/settings" onClick={() => setJWT_token(false)}>
                            <p className="hover:bg-sec-med px-2">
                                <i className="fas fa-door-open text-lg mr-2"></i>Déconnection</p>
                        </Link>

                    </Nav>
                </NavbarCollapse>
            </div>
        </nav>
    );
}