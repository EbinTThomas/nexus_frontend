"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateScanProps {
    formData: object
}

export async function createScan(props: CreateScanProps) {
    const access = cookies().get("access");
    console.log(props.formData);
    const response = await axios.post(
        `/api/v1/scans/`,
        props.formData,
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    redirect(`/projects/${props.projectId}/scans/${response.data.id}`);
}