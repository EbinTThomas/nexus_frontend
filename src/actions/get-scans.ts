"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function getScans(projectId: string) {
    try {
        const access = cookies().get("access");
        const response = await axios.get(
            `/scans`,
            {
                headers: {
                    "Authorization": `Bearer ${access}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}