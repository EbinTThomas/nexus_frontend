"use server";

import axios from "@/api/axios";
import { cookies } from "next/headers";

export async function getProjects() {
    const access = cookies().get("access");
    const response = await axios.get("/api/v1/projects/",
        {
            headers: {
                "Authorization": `Bearer ${access?.value}`
            }
        }
    );
    return response.data;
}