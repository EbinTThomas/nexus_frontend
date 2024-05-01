"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import * as actions from "@/actions/index";
import { usePathname, useRouter } from "next/navigation"

interface ProjectProps {
    id: string,
    name: string
}

export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const pathName = usePathname();
    const projectId = pathName.split('/')[2];
    const [projects, setProjects] = React.useState([]);
    const router = useRouter();

    const getProjectsAction = actions.getProjects.bind(null);
    const getCurrentProjectAction = actions.getCurrentProject.bind(null, projectId);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getProjectsAction();
                const currentProjectData = await getCurrentProjectAction();
                setProjects(projectsData);
                setValue(currentProjectData.id)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? projects.find((project) => project.id === value)?.name
                        : "Select project..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search project..." />
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                        {projects.map((project, index) => (
                            <CommandItem
                                key={index}
                                value={project.id}
                                onSelect={() => {
                                    router.replace(`/projects/${value}`)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === project.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {project.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
