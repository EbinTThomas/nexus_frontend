import axios from "@/api/axios";
import Link from "next/link";

export default async function Projects() {
    const projects = await axios.get("/projects");
    
    const renderedProjects = projects.data.map((project) => {
        return (
            <Link href={`/projects/${project.id}`} key={project.id}>
                {project.name}
            </Link>
        )
    });

    return (
        <div>
            { renderedProjects }
        </div>
    )
}