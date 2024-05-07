import Header from "@/components/common/header";
import VulnerabilityGraph from "@/components/vulnerability-graph";

interface ProjectDetailPageProps {
    params: {
        projectId: string
    }
}

export default function ProjectDetailPage(props: ProjectDetailPageProps) {
    // const project = await actions.getCurrentProject(props.params.projectId);

    return (
        <>
            <Header title="Project Overview" description="Here's the overview of the project" />
            <div className="flex gap-4 justify-stretch flex-wrap">
                <div className="p-4 bg-gray-800 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Projects</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">1</h3>
                </div>
                <div className="p-4 bg-gray-700 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Scans</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">0</h3>
                </div>
                <div className="p-4 bg-gray-600 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#fff] text-[.875rem] mb-4">Total Vulnerabilities</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#fff]">0</h3>
                </div>
                <div className="p-4 bg-gray-200 rounded-[.675rem] flex-1 min-w-[200px]">
                    <div className="text-[#000] text-[.875rem] mb-4">Total Issues</div>
                    <h3 className="scroll-m-20 text-3xl font-medium tracking-tight text-center text-[#000]">0</h3>
                </div>
            </div>
            <VulnerabilityGraph />
        </>
    )
}