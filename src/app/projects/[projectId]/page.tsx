import Header from "@/components/common/header";
import VulnerabilityGraph from "@/components/vulnerability-graph";
import * as actions from "@/actions/index";

interface ProjectDetailPageProps {
    params: {
        projectId: string
    }
}

export default async function ProjectDetailPage(props: ProjectDetailPageProps) {
    const dashboardData = await actions.getDashboardData(props.params.projectId);

    return (
        <>
            <Header title="Project Overview" description="Here's the overview of the project" />
            <div className="flex gap-4 justify-stretch flex-wrap">
                <div className="p-4 bg-gray-800 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Projects</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">2</h3>
                </div>
                <div className="p-4 bg-gray-700 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Scans</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">{dashboardData.total_scans}</h3>
                </div>
                <div className="p-4 bg-gray-600 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Vulnerabilities</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">{dashboardData.total_scan_results}</h3>
                </div>
                <div className="p-4 bg-gray-200 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#000] text-[.875rem] mb-4">Total Issues</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#000]">0</h3>
                </div>
            </div>
            <div className="text-lg font-semibold mt-6">{dashboardData.project.name}</div>
            <p className="leading-7 mt-2 mb-4">
                {dashboardData.project.description}
            </p>
            <pre className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] overflow-x-auto">
                <code className="font-mono text-sm font-semibold">
                    {JSON.stringify(dashboardData.project, null, 2)}
                </code>
            </pre>
            <div className="flex gap-4 mt-6">
                <VulnerabilityGraph />
                <div className="w-full border rounded-[.675rem] p-4">
                    <div className="text-lg font-semibold">Previous Scan Overview</div>
                    <pre className="mt-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] overflow-x-auto w-full">
                        <code className="font-mono text-sm font-semibold">
                            {JSON.stringify(dashboardData.scan_results[0], null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    )
}