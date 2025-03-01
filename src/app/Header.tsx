"use client";

import Link from "next/link"
import "./Header.css"
import { useEffect, useState } from "react";
import { getCookie } from "../common/cookies/cookie_handler";
import { COOKIE_USER_ID } from "../common/cookies/cookie_keys";
import { ResponseResult } from "../common/Response";

const Space = ({ space = "auto" }: { space?: string | number }) =>
    <div style={{ marginRight: `${space}` }}></div>

export default function Header() {
    const [userID, setUserID] = useState('');
    useEffect(() => {
        (async () => {
            const response: ResponseResult<string, undefined> = await getCookie(COOKIE_USER_ID);
            if (response.type === "success") {
                setUserID(response.body);
            }
        })();
    }, [userID]);

    return <div className="header">
        <Link href="/"><h1>Resume Tailor</h1></Link>

        <Space space={"2em"} />

        <Link href="/documents"><p>Documents</p></Link>

        <Space />

        {userID === ''
            ? <Link href="/auth"><p>Login/Register</p></Link>
            : <>
                <p onClick={() => {}}>Sign Out</p>
                <Space space={"1em"}/>
                <Link href="/profile"><p>Profile</p></Link>
            </>
        }


    </div>
}