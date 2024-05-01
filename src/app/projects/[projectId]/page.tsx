"use client";

import * as actions from "@/actions/index";
import {
    LineChart,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';

interface ProjectDetailPageProps {
    params: {
        projectId: string
    }
}

export default function ProjectDetailPage(props: ProjectDetailPageProps) {
    // const project = await actions.getCurrentProject(props.params.projectId);

    return (
        <>
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
            <div className="flex mt-8 gap-4">
                <div className="border rounded-[.675rem] p-4">
                    <div className="text-[#000] text-[1.175rem] font-medium mb-4">Vulnerability Open Issues</div>
                    <LineChart
                        xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May"] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5],
                            },
                        ]}
                        sx={{
                            [`& .${lineElementClasses.root}`]: {
                                stroke: '#8884d8',
                                strokeWidth: 2,
                            },
                            [`& .${markElementClasses.root}`]: {
                                stroke: '#8884d8',
                                scale: '0.6',
                                fill: '#fff',
                                strokeWidth: 2,
                            },
                        }}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </>
    )
}