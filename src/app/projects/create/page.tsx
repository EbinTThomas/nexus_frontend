"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AvatarDemo } from '@/components/avatar-demo';
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation';
import * as actions from "@/actions/index";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ProjectCreatePage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = {
                "name": projectName,
                "owner_id": owner,
                "description": description
            };
            const result = await actions.createProject(formData);
            if (result.success) {
                window.location.href = result.redirectTo;
            }
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to submit:", err);
            setIsLoading(false);
        }
    }

    const fetchOwners = async () => {
        try {
            const ownerData = await actions.getUser();
            setOwners([ownerData]);
        } catch (error) {
            console.error("Failed to fetch owners:", error);
        }
    }

    useEffect(() => {
        fetchOwners();
    }, [])

    return (
        <div className="create_project_container px-[15vw] pt-[80px]">
            <div className="mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create Project</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h3 className="text-xl text-muted-foreground pb-6">
                Create a project (Step {tabIndex + 1} of 3)
            </h3>
            <Tabs className="max-w-[600px]" value={`${tabIndex}`}>
                <TabsContent value="0">
                    <h2 className="scroll-m-20 pb-8 text-5xl font-semibold tracking-tight first:mt-0 leading-none">
                        Let's start with a name for your project
                    </h2>
                    <Label className="text-xs pb-[4px] block">Project name</Label>
                    <Input id="name" placeholder="Enter your project name" className="py-[24px]" onChange={(e) => setProjectName(e.target.value)} value={projectName} />
                    <div className="btn_wrap pt-8 flex gap-[12px]">
                        <Button onClick={() => setTabIndex(tabIndex + 1)} className="px-[32px] py-[24px]" disabled={projectName === ''}>Continue</Button>
                    </div>
                </TabsContent>

                <TabsContent value="1">
                    <h2 className="scroll-m-20 pb-8 text-5xl font-semibold tracking-tight first:mt-0 leading-none">
                        Describe your project
                    </h2>
                    <Label className="text-xs pb-[4px] block">Project Description</Label>
                    <Textarea id="description" placeholder="It's a project ..." className="py-[12px] h-32" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <div className="btn_wrap pt-8 flex gap-[12px] justify-between">
                        <Button variant="outline" onClick={() => setTabIndex(tabIndex - 1)} className="px-[32px] py-[24px]">Previous</Button>
                        <Button onClick={() => setTabIndex(tabIndex + 1)} className="px-[32px] py-[24px]" disabled={description === ''}>Continue</Button>
                    </div>
                </TabsContent>

                <TabsContent value="2">
                    <h2 className="scroll-m-20 pb-8 text-5xl font-semibold tracking-tight first:mt-0 leading-none">
                        Now select the ownership of the project
                    </h2>
                    <Label className="text-xs pb-[4px] block">Project Owner</Label>
                    <Select defaultValue={owner} onValueChange={(data) => setOwner(data)}>
                        <SelectTrigger className="w-full py-[24px]">
                            <SelectValue placeholder="Select project owner" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                owners.map((ownerItem) => (
                                    <SelectItem value={ownerItem.id} key={ownerItem.id}>
                                        <div className="flex gap-[12px]">
                                            <AvatarDemo
                                                imgSrc={ownerItem.img}
                                            />
                                            <div className="flex flex-col gap-[4px] text-left">
                                                <div className="font-semibold">{ownerItem.organisation}</div>
                                                <div className="text-xs">{ownerItem.email}</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <div className="btn_wrap pt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setTabIndex(tabIndex - 1)} className="px-[32px] py-[24px]">Previous</Button>
                        <Button onClick={handleSubmit} className="px-[32px] py-[24px]" disabled={owner === '' || isLoading}>
                            {
                                isLoading
                                    ? <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                    : 'Continue'
                            }
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="lg:block hidden bg-[url('https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-ideas_23-2149164331.jpg?w=1060&t=st=1715102651~exp=1715103251~hmac=27ce7f52b918f473d487388ef43f8031b0512f5b670b41bfdfce75146e57b04c')] fixed w-full h-full top-0 right-0 z-[-1] bg-right-bottom bg-[length:auto_500px] bg-no-repeat opacity-[.5]"></div>
        </div>
    );
}
