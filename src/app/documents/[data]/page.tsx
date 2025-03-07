"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { RTDocument } from "../../../common/database/RTDocument";
import { retrieveDocumentDetails } from "../../../controller/database/DatabaseGateway";
import HTTPStatusCode from "../../../common/HTTPStatusCode";
import { ResponseResult } from "../../../common/Response";
import { redirect } from "../../../common/helper";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface PageProps {
    params: Promise<{ data: string }>;
}


export default function Page(pageProps: PageProps) {
    const [documentDetails, setDocumentDetails] = useState<RTDocument | undefined>();


    useEffect(() => {
        (async () => {
            const documentID: string = (await pageProps.params).data;

            const docResponse: ResponseResult<RTDocument, HTTPStatusCode> = await retrieveDocumentDetails(documentID);
            if (docResponse.type === "success") {
                setDocumentDetails(docResponse.data);
            } else {
                redirect("/documents");
            }
        })();
    }, []);




    return <div className="outer-container">

        <input type="text"
            id="doc-name-input"
            value={documentDetails?.documentDisplayName ?? "Untitled Document"} />

        <div className="inner-container">
            <div id="component-container">



            </div>

            <div id="editor-container">
            <AceEditor
    mode="java"
    theme="github"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />,
                
                {/* <AceEditor
                    style={{height: "100%", width: "100%"}}
                    mode="latex"
                    theme="github"
                    onChange={(value, event) => console.log(value

                    )}
                    editorProps={{ $blockScrolling: true }}
                /> */}
                {/* <textarea id="editor">

                </textarea> */}

            </div>


            <div id="preview-container">
                
            </div>
        </div>
    </div>

}