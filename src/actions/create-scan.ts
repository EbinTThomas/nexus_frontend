"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateScanProps {
    formData: object
}

export async function createScan(props: CreateScanProps) {
    try {
        const access = cookies().get("access");
        const response = await axios.post(
            `/api/v1/scans/`,
            props.formData,
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`
                }
            }
        );
        return { success: true, redirectTo: `/projects/${props.formData.project_id}/scans/${response.data.id}` };
    }
    catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error("No server response");
        }
    }
}