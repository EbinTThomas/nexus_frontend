import Link from "next/link";

interface ProjectLayoutProps {
    children: React.ReactNode,
    params: {
        projectId: string
    }
}

export default function ProjectLayout(props: ProjectLayoutProps) {
    return (
        <div className="project-layout">
            <div className="project-header">
                <Link href={`/projects/${props.params.projectId}/scans`}>Scans</Link>
            </div>
            {props.children}
        </div>
    )
}