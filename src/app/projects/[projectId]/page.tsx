import axios from "@/api/axios";

interface ProjectDetailPageProps {
    params: {
        projectId: string
    }
}

export default async function ProjectDetailPage(props: ProjectDetailPageProps) {
    const project = await axios.get(`/projects/${props.params.projectId}`);

    return (
        <div>Project Overview {project.data.id}</div>
    )
}