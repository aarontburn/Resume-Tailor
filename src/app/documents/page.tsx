"use client";

import "./style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "../../common/helper";
import { useEffect, useState } from "react";
import { getCookie } from "../../common/cookies/cookie_handler";
import { COOKIE_USER_ID } from "../../common/cookies/cookie_keys";
import { ResponseResult } from "../../common/Response";
import { retrieveDocumentIDsFromUserID } from "../../controller/database/DatabaseGateway";
import { DocumentTypes } from "../../common/constants";

function createNewDocument(documentType: DocumentTypes) {
    redirect("/documents/new_" + documentType)
}

export default function Documents() {
    // undefined means "still loading", null means error
    const [documentIDList, setDocumentIDList] = useState<string[] | undefined | null>(undefined);

    useEffect(() => {
        (async () => {
            const userIDResponse: ResponseResult<string, undefined> = await getCookie(COOKIE_USER_ID)
            if (userIDResponse.type === "success") {
                const docResponse: ResponseResult<string[], undefined> = await retrieveDocumentIDsFromUserID(userIDResponse.body);
                if (docResponse.type === "success") {
                    setDocumentIDList(docResponse.body);
                } else {
                    setDocumentIDList(null);
                }
            } else {
                redirect("/auth");
            }
        })();


    }, []);



    return <div className="container">
        <DropdownButton id="dropdown-basic-button" title="New Document">
            <Dropdown.Item onClick={() => createNewDocument("html")}>HTML Document</Dropdown.Item>
            <Dropdown.Item onClick={() => createNewDocument("latex")}>LaTeX Document</Dropdown.Item>
        </DropdownButton>

        <br />
        <div style={{ border: "1px solid black" }}>
            {(() => {
                if (documentIDList) {
                    return documentIDList.length === 0
                        ? <p>No documents found. Create a new one?</p>
                        : documentIDList.map((id: string, index: number) => <p key={index}>{id}</p>)
                }
                if (documentIDList === undefined) {
                    return <p>Loading documents...</p>
                }
                return <p>Something went wrong...</p>
            })()}
        </div>
    </div>
}
