import * as actions from "@/actions/index";
import { DataTableScans } from "@/components/common/data-table-scans";
import Header from "@/components/common/header";

interface ScansInterface {
    params: {
        projectId: string
    }
}

export default async function Scans(props: ScansInterface) {
    const scans = await actions.getScans(props.params.projectId);
    return (
        <>
            <Header title="Scans" description="Here's the list of scans" />
            <DataTableScans data={scans} />
        </>
    )
}