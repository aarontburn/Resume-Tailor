
interface PageProps {
    params: Promise<{ data: string }>;
}


export default async function Page(pageProps: PageProps ) {
    const data: string = (await pageProps.params).data;
    if (data.includes("new")) {
        const type = data.split("_")[1];

        if (type === "latex") {

        } else if (type === "html") {

        } else {
            // error
        }
    }



    return <>
    </>

}