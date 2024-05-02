"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function getScanDetail(scanId: string) {
    const access = cookies().get("access");
    const response = await axios.get(
        `/api/v1/scans/${scanId}/`,
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    return response.data;
}