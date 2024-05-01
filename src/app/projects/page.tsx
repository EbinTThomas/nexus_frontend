import axios from "@/api/axios";
import Link from "next/link";
import * as actions from "@/actions/index";

export default async function Projects() {
    const projects = await actions.getProjects();

    const renderedProjects = projects.map((project) => {
        return (
            <Link href={`/projects/${project.id}`} key={project.id}>
                {project.name}
            </Link>
        )
    });

    return (
        <div>
            <Link href="/projects/create">New Project</Link>
            {
                renderedProjects.length > 0
                    ? renderedProjects
                    : <>Nothing to show</>
            }

        </div>
    )
}