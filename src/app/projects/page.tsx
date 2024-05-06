import * as actions from "@/actions/index";
import { DataTableProjects } from "@/components/common/data-table-projects";

export default async function Projects() {
    const projects = await actions.getProjects();

    return (
        <div className="px-[15vw] pt-[32px]">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Projects
            </h3>
            <DataTableProjects data={projects} />
        </div>
    )
}