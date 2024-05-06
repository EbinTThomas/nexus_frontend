"use server";

import axios from "@/api/axios";

export async function signup(formData: FormData) {
    try {
        await axios.post('/api/v1/users/', formData);

        return { success: true, redirectTo: '/auth/login' };
    } catch (error) {
        if (error.response) {
            throw new Error(`Signup failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error("No server response");
        }
    }
}