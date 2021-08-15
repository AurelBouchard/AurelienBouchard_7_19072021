import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import NavLink from "@material-tailwind/react/NavLink";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import Icon from "@material-tailwind/react/Icon";

export default function TCP_navbar({disconnect}) {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar color="amber"  className="absolute fixed w-full z-30 top-0">
            <NavbarContainer>
                <NavbarWrapper >
                    <NavbarBrand className=""
                    >The Coffee Place</NavbarBrand>

                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <input
                        className="hover:bg-white"
                        type="text"
                        placeholder="Search here"
                    />
                    <Nav>
                        <Link to="/myprofile">
                            <p
                                className="hover:bg-white">
                                <i className="far fa-user text-lg"></i>
                                Mon profile
                            </p>
                        </Link>

                        <Link to="/members">
                            <p
                                className="hover:bg-white">
                                <i className="fas fa-users text-lg"></i>
                                Membres
                            </p>
                        </Link>

                        <Link to="/settings">
                            <p
                            >
                                <i className="fas fa-cog text-lg"></i>
                                Paramètres
                            </p>
                        </Link>

                        <NavLink
                            ripple="light"
                            onClick={() => disconnect()}>
                            <i className="fas fa-sign-out-alt text-lg"></i>
                            Deconnexion
                        </NavLink>

                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}