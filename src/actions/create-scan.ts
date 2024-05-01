"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateScanProps {
    projectId: string,
    formData: FormData
}

export async function createScan(props: CreateScanProps) {
    const access = cookies().get("access");
    const response = await axios.post(
        `/projects/${props.projectId}/scans/create`,
        props.formData,
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    redirect(`/projects/${props.projectId}/scans/${response.data.id}`);
}