"use client";

import { useState } from "react";
import { DocumentTypes } from "../../../common/constants";
import { redirect } from "../../../common/helper";
import { log } from "../../../common/log";
import { ResponseResult } from "../../../common/Response";
import { createNewDocument } from "../../../controller/database/DatabaseGateway";
import { UUID } from "../../../controller/types/DocTypes";
import "./style.css";

interface PageProps {
    params: Promise<{ data: string }>;
}


export default function Page(pageProps: PageProps) {

    const [documentID, setDocumentID] = useState<string | undefined>(undefined);

    (async () => {
        const documentID: string = (await pageProps.params).data;
        setDocumentID(documentID);
    })();


    return <div className="container">
        {documentID ?? "Failed to get documentID"}




    </div>

}