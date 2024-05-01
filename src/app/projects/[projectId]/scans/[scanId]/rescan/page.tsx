interface RescanProps {
    projectId: string,
    scanId: string
}

export default async function Rescan(props: RescanProps){
    return (
        <>Rescan {props.projectId} {props.scanId}</>
    )
}