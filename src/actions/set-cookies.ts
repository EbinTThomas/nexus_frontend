"use server";

import { cookies } from "next/headers";

export async function setCookies(accessToken: string) {
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set('access', accessToken, { expires: Date.now() + 90 * oneDay });
    return
};
