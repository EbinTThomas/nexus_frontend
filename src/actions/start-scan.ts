"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startScan(scanId: string) {
    const access = cookies().get("access");
    try {
        const response = await axios.post(
            `/api/v1/scans/${scanId}/start`,
            {
                "scan_id": parseInt(scanId, 10)
            },
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error("No server response");
        }
    }
}