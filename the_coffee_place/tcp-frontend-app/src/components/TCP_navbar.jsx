import React, { useState } from "react";
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

export default function TCP_navbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar color="amber" navbar>
            <NavbarContainer>
                <NavbarWrapper  className="">
                    <NavbarBrand className=""
                    >The Coffee Place</NavbarBrand>

                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <NavbarInput
                        className="hover:bg-white"
                        type="text"
                        placeholder="Search here"
                    />
                    <Nav>
                        <NavLink
                            className="hover:bg-white"
                            href="#navbar"
                            ripple="light">
                            <i className="far fa-user text-lg"></i>
                            Mon profile
                        </NavLink>

                        <NavLink
                            className="hover:bg-white"
                            href="#navbar"
                            ripple="light">
                            <i className="fas fa-users text-lg"></i>
                            Membres
                        </NavLink>

                        <NavLink
                            href="#navbar"
                            ripple="light">
                            <i className="fas fa-cog text-lg"></i>
                            Paramètres
                        </NavLink>

                        <NavLink
                            href="#navbar"
                            ripple="light">
                            <i className="fas fa-sign-out-alt text-lg"></i>
                            Deconnexion
                        </NavLink>

                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}