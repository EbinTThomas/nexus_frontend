import axios from "@/api/axios"
import Link from "next/link";

interface ScansInterface {
    params: {
        projectId: string
    }
}

export default async function Scans(props: ScansInterface) {
    const scans = await axios.get(`/scans`)
    const renderedScans = scans.data.map((scan) => {
        return (
            <li>
                <Link href={`/projects/${props.params.projectId}/scans/${scan.id}`}>{scan.name}</Link>
            </li>
        )
    })
    return (
        <div>
            <h1>Scans</h1>
            <ul>
                {renderedScans}
            </ul>
        </div>
    )
}