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
    const [documentIDFromURL, setDocumentIDFromURL] = useState<string | undefined>(undefined);

    (async () => {
        const documentID: string = (await pageProps.params).data;
        setDocumentIDFromURL(documentID);
    })();

    const [documeb]


    return <div className="outer-container">
        <div className="inner-container">
            <div id="component-container">


                
            </div>

            <div id="editor-container">

            </div>


            <div id="preview-container">

            </div>
        </div>
    </div>

}