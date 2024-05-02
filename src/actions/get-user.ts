"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function getUser() {
    const access = cookies().get("access");
    const response = await axios.get(
        "/api/v1/auth/me/",
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    return response.data;
}