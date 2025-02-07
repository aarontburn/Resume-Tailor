"use client";

import Link from "next/link"
import "./Header.css"
import { useEffect, useState } from "react";
import { getCookie } from "../common/cookie";
import { USER_ID } from "../common/keys";

const Space = ({ space = "auto" }: { space?: string | number }) =>
    <div style={{ marginRight: `${space}` }}></div>

export default function Header() {
    const [userID, setUserID] = useState('');
    useEffect(() => {
        (async () => {
            const uid: string | undefined = await getCookie(USER_ID);
            if (userID === undefined) {
                return;
            }
            setUserID(uid as string);
            console.log(userID)
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