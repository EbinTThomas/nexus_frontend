import { DataTableDemo } from "@/components/common/data-table-demo";
import * as actions from "@/actions/index";
import { DataTableScans } from "@/components/common/data-table-scans";

interface ScansInterface {
    params: {
        projectId: string
    }
}

export default async function Scans(props: ScansInterface) {
    const scans = await actions.getScans(props.params.projectId);
    return (
        <DataTableScans data={scans} />
    )
}