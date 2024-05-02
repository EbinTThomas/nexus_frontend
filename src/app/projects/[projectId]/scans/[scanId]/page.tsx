import { DataTableScans } from "@/components/common/data-table-scans";
import Link from "next/link";
import * as actions from "@/actions/index";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/common/data-table-demo";
import StartScanButton from "@/components/start-scan-button";

interface ScanDetailProps {
    params: {
        projectId: string,
        scanId: string
    }
}

export default async function ScanDetail(props: ScanDetailProps) {
    const scanDetail = await actions.getScanDetail(props.params.scanId);
    let scanResult = {};

    if (scanDetail[0].state === "completed") {
        scanResult = await actions.getScanResult(props.params.scanId);
        console.log(scanResult);
    }

    return (
        <div>
            <DataTableDemo data={scanDetail} />
            {
                scanDetail[0].state === "pending" &&
                <StartScanButton scanId={props.params.scanId} btnValue={"Start Scan"} />
            }
            {
                scanDetail[0].state === "failed" &&
                <>failed</>
            }
            {
                scanDetail[0].state === "initiated" &&
                <>Scanning processing...</>
            }
            {
                scanDetail[0].state === "completed" &&
                <>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Scan Result
                    </h3>
                    <StartScanButton scanId={props.params.scanId} btnValue={"Rescan"} />
                    <Link href={`/projects/${props.params.projectId}/scans/${props.params.scanId}/inspect`}>Inspect</Link>
                    <DataTableScans data={scanDetail} />
                </>
            }
        </div>
    );
}
