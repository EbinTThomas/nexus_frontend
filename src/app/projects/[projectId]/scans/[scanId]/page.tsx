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
    let scanResult = [];

    if (scanDetail.state === "completed") {
        scanResult = await actions.getScanResult(props.params.scanId);
    }

    return (
        <div>
            {scanDetail.name}
            {
                scanDetail.state === "pending" &&
                <StartScanButton scanId={props.params.scanId} btnValue={"Start Scan"} />
            }
            {
                scanDetail.state === "failed" &&
                <>failed</>
            }
            {
                scanDetail.state === "initiated" &&
                <>Scanning processing...</>
            }
            {
                scanDetail.state === "completed" &&
                <>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Scan Result
                    </h3>
                    <StartScanButton scanId={props.params.scanId} btnValue={"Rescan"} />
                    <Link href={`/projects/${props.params.projectId}/scans/${props.params.scanId}/inspect`}>Inspect</Link>
                    {/* {scanResult.id}
                    {scanResult.scan_id}
                    {scanResult.assigned_permissions.map((permission) => (
                        { permission }
                    ))} */}
                    {/* {scanResult.vulnerable_permissions.map((item) => (
                        { item }
                    ))}
                    {scanResult.overly_permissive_services.map((item) => (
                        { item }
                    ))}
                    {scanResult.exploitation_details.map((item) => (
                        { item }
                    ))}
                    {scanResult.post_exploitation_activities.map((item) => (
                        { item }
                    ))}
                    {scanResult.assessment_phase_details.map((item) => (
                        { item }
                    ))} */}
                </>
            }
        </div>
    );
}
