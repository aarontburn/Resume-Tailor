"use client";

import { useEffect } from "react";
import { getAllCookies } from "../common/cookies/cookie_handler";


export default function Home() {
    useEffect(() => {
        (async () => {
            console.log(await getAllCookies())
        })();
    });

    return (
        <p>Home</p>
    );
}
