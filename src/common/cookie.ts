"use server";

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers'
import { log } from './log';



export async function getCookie(cookieName: string): Promise<string | undefined> {
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const cookie: RequestCookie | undefined = cookieStore.get(cookieName);

    if (cookie === undefined) {
        log("WARN: Attempted to access undefined cookie: " + cookieName);
    }
    return cookie?.value;
}

export async function setCookie(key: string, value: string): Promise<void> {
    const cookieStore: ReadonlyRequestCookies = await cookies();
    await cookieStore.set(key, value);
    log(`Setting cookie '${key}' to '${value}'`);
    log(`All cookies: ${cookieStore.getAll().map(c => `${c.name}: ${c.value}`)}`);
}

export async function getAllCookies(): Promise<{ [cookieName: string]: string }> {
    const cookieStore: ReadonlyRequestCookies = await cookies();

    const cookieMap: { [cookieName: string]: string } = {};
    for (const cookie of cookieStore.getAll()) {
        cookieMap[cookie.name] = cookie.value;
    }

    return cookieMap;
}