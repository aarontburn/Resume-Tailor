import { DocumentTypes } from "../../../common/constants";

interface PageProps {
    params: Promise<{ data: string }>;
}

function handleNewDocument(type: DocumentTypes) {
    
}


export default async function Page(pageProps: PageProps ) {
    const data: string = (await pageProps.params).data;
    if (data.includes("new")) {
        const type = data.split("_")[1];

        if (type === "latex") {
            handleNewDocument("latex");

        } else if (type === "html") {
            handleNewDocument("html");

        } else {
            // error
        }
    }



    return <>
        page
    </>

}