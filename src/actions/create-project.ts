"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProject(formData: object) {
    try {
        const access = cookies().get("access");
        const response = await axios.post(
            `/api/v1/projects/`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`
                }
            }
        );
        return { success: true, redirectTo: `/projects/${response.data.id}`};
    }
    catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error("No server response");
        }
    }
}