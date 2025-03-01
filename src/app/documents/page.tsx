"use client";

import "./style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "../../common/helper";
import { useEffect } from "react";
import { getAllCookies } from "../../common/cookie";

function createNewDocument(documentType: "html" | "latex") {
    redirect("/documents/new_" + documentType)
}

export default function Documents() {
    useEffect(() => {
        (async () => {
            (await getAllCookies())[]


            console.log()
        })();
    });



    return <div className="container">
        <DropdownButton id="dropdown-basic-button" title="New Document">
            <Dropdown.Item onClick={() => createNewDocument("html")}>HTML Document</Dropdown.Item>
            <Dropdown.Item onClick={() => createNewDocument("latex")}>LaTeX Document</Dropdown.Item>
        </DropdownButton>
    </div>
}
