"use server";

import { cookies } from "next/headers";

export async function logout() {
    if (cookies().get('access')) {
        cookies().delete('access');
    }
    return { success: true, redirectTo: '/auth/login' };
}