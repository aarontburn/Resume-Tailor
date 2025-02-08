"use client";

import "./style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "../../common/helper";

function createNewDocument(documentType: "html" | "latex") {
    redirect("/documents/new_" + documentType)
}

export default function Documents() {
    return <div className="container">
        <DropdownButton id="dropdown-basic-button" title="New Document">
            <Dropdown.Item onClick={() => createNewDocument("html")}>HTML Document</Dropdown.Item>
            <Dropdown.Item onClick={() => createNewDocument("latex")}>LaTeX Document</Dropdown.Item>
        </DropdownButton>
    </div>
}
