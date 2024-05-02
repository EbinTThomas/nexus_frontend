"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProject(formData: object) {
    const access = cookies().get("access");
    console.log(formData)
    const response = await axios.post(
        `/api/v1/projects/`,
        formData,
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    redirect(`/projects/${response.data.id}`);
}