"use server";

import axios from "@/api/axios";

export async function getCurrentProject(projectId: string) {
    const response = await axios.get(`/projects/${projectId}`);
    return response.data;
}