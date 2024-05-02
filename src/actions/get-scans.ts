"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function getScans(projectId: string) {
    try {
        const access = cookies().get("access");
        const response = await axios.get(
            `/api/v1/scans/${projectId}`,
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`
                }
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error;
    }
}