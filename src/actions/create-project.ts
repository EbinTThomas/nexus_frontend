"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateProjectProps {
    formData: FormData
}

export async function createProject(props: CreateProjectProps) {
    const access = cookies().get("access");
    const response = await axios.post(
        `/api/v1/projects/`,
        props.formData,
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    redirect(`/projects/${response.data.id}`);
}