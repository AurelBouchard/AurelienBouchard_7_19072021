import React, { useState } from "react";

import Navbar from './TCP_navbar.jsx';
import {useFetch} from './useFetch';
import Redactor from "./Redactor";
import Members from "./Members";


export default function Flow() {
    return ( <>
        <Navbar />
        <Redactor />
    </> );
}