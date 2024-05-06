"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as actions from "@/actions/index";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

const ProjectSwitch = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const pathName = usePathname();
    const projectId = pathName.split('/')[2];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await actions.getProjects() || [];
                const currentProjectData = await actions.getCurrentProject(projectId) || {};
                setProjects(projectsData);
                setSelectedProject(currentProjectData);
            }
            catch (error) {

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    return (

        !isLoading &&
        <DropdownMenu>
            <DropdownMenuTrigger className="text-[0.875rem] font-medium flex gap-2 items-center">{selectedProject.name} <IoMdArrowDropdown /></DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                    onClick={() => { window.location.href = `/projects/create` }}
                    className="flex gap-3 items-center"
                >
                    <IoAdd />Create new project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {
                    projects.map((project) => (
                        project.id !== selectedProject.id &&
                        <DropdownMenuItem
                            key={project.id}
                            onClick={() => { window.location.href = `/projects/${project.id}` }}
                        >
                            {project.name}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default ProjectSwitch;
