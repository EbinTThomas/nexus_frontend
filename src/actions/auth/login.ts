"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
    try {
        const response = await axios.post('/api/v1/auth/token/', formData);
        const access = response.data.access_token;

        const oneDay = 24 * 60 * 60 * 1000;
        const expiration = Date.now() + 90 * oneDay;

        cookies().set('access', access, { expires: expiration });

        return { success: true, redirectTo: '/projects' };
    } catch (error) {
        if (error.response) {
            throw new Error(`Login failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error("No server response");
        }
    }
}