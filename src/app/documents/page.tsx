"use client";

import "./style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { ResponseResult } from "../../common/Response";
import { createNewDocument, retrieveDocumentIDs } from "../../controller/database/DatabaseGateway";
import { DocumentTypes } from "../../common/constants";
import { UUID } from "@/common/constants";
import HTTPStatusCode from "../../common/HTTPStatusCode";
import { useRouter } from "next/navigation";
import { AppRouterInstance, NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

function handleNewDocument(documentType: DocumentTypes, router: AppRouterInstance) {
    (async () => {
        const newDocumentIDResponse: ResponseResult<UUID, HTTPStatusCode> = await createNewDocument(documentType);

        if (newDocumentIDResponse.type === "success") {
            router.push(`/documents/${newDocumentIDResponse.data}`);
        } else {
            router.push("Error creating new document with error code: " + newDocumentIDResponse.data);
        }
    })();



}

export default function Documents() {
    const router: AppRouterInstance = useRouter()


    // undefined means "still loading", null means error
    const [documentIDList, setDocumentIDList] = useState<string[] | undefined | null>(undefined);

    useEffect(() => {
        (async () => {
            const docResponse: ResponseResult<string[], HTTPStatusCode> = await retrieveDocumentIDs();
            if (docResponse.type === "success") {
                setDocumentIDList(docResponse.data);
            } else {
                if (docResponse.data === HTTPStatusCode.UNAUTHORIZED) {
                    router.push("/auth");
                    // redirect("/auth");
                }

                setDocumentIDList(null);
            }

        })();


    }, []);



    return <div className="container">
        <DropdownButton id="dropdown-basic-button" title="New Document">
            <Dropdown.Item onClick={() => handleNewDocument("html", router)}>HTML Document</Dropdown.Item>
            <Dropdown.Item onClick={() => handleNewDocument("latex", router)}>LaTeX Document</Dropdown.Item>
        </DropdownButton>

        <br />
        <div style={{ border: "1px solid black" }}>
            {(() => {
                if (documentIDList) {
                    return documentIDList.length === 0
                        ? <p>No documents found. Create a new one?</p>
                        : documentIDList.map((id: string, index: number) => <p onClick={() => router.push(`/documents/${id}`)} key={index}>{id}</p>)
                }
                if (documentIDList === undefined) {
                    return <p>Loading documents...</p>
                }
                return <p>Something went wrong...</p>
            })()}
        </div>
    </div>
}
