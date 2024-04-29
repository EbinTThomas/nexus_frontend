import Link from "next/link";

interface ScanDetailProps {
    params: {
        projectId: string,
        scanId: string
    }
}

export default function ScanDetail(props: ScanDetailProps) {
    return (
        <div>
            Scan Detail
            <Link href={`/projects/${props.params.projectId}/scans/${props.params.scanId}/inspect`}>Inspect</Link>
        </div>
    )
}