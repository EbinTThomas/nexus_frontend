import Link from "next/link";
import * as actions from "@/actions/index";
import StartScanButton from "@/components/start-scan-button";
import { ScanResult } from "@/components/scan-result";
import Header from "@/components/common/header";
import { MdOutlineViewInAr } from "react-icons/md";

import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


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
        // scanResult = await actions.getScanResult(props.params.scanId);
        scanResult = {
            "id": 11,
            "scan_id": 6,
            "assigned_permissions": ['iam:Get*', 'iam:List*', 'iam:Put*'],
            "vulnerable_permissions": [
                'iam:listattachedgrouppolicies',
                'iam:listattacheduserpolicies',
                'iam:listrolepolicies',
                'iam:listgrouppolicies',
                'iam:listattachedrolepolicies',
                'iam:putrolepolicy',
                'iam:listgroups',
                'iam:listusers',
                'iam:putgrouppolicy',
                'iam:listroles',
                'iam:listinstanceprofiles',
                'iam:listpolicies',
                'iam:listuserpolicies',
                'iam:listgroupsforuser',
                'iam:listpolicyversions',
                'iam:putuserpolicy'
            ],
            "overly_permissive_services": ['PutGroupPolicy', 'PutUserPolicy'],
            "exploitation_details": ['PutGroupPolicy', 'PutUserPolicy'],
            "post_exploitation_activities": [],
            "assessment_phase_details": [],
            "summary": null
        }
    }

    return (
        <>
            <Header title="Scan Detail" description="Here's the scan details" />
            <div className="mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/projects/${props.params.projectId}/scans`}>Scans</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{scanDetail.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex justify-between">
                <div>
                    <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">{scanDetail.name}</h1>
                    <p className="leading-7 mb-4 mt-2">{scanDetail.description}</p>
                </div>
                {
                    scanDetail.state === "pending"
                        ? <StartScanButton scanId={props.params.scanId} btnValue={"Start Scan"} />
                        : scanDetail.state === "completed"
                        && <StartScanButton scanId={props.params.scanId} btnValue={"Rescan"} />
                }
            </div>
            <Separator className="my-4" />
            <pre className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] overflow-x-auto">
                <code className="font-mono text-sm font-semibold">
                    {JSON.stringify(scanDetail.keys, null, 2)}
                </code>
            </pre>
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
                    <div className="flex items-center justify-between mt-4">
                        <h1 className="text-lg font-semibold">Assessment</h1>
                        <Link href={`/projects/${props.params.projectId}/scans/${props.params.scanId}/inspect`} className="hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 gap-2">
                            <MdOutlineViewInAr />
                            View Result
                        </Link>
                    </div>
                    <Separator className="my-4" />
                    <ScanResult data={scanResult} />
                </>
            }
        </>
    );
}
