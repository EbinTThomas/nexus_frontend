"use client"

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

// const owners = [
//     {
//         "id": 1,
//         "name": "Michael Jackson",
//         "email": "mj@gmail.com",
//         "img": "https://c4.wallpaperflare.com/wallpaper/687/811/828/michael-jackson-peace-wallpaper-preview.jpg"
//     },
//     {
//         "id": 2,
//         "name": "John Cena",
//         "email": "johncena@gmail.com",
//         "img": "https://deadline.com/wp-content/uploads/2024/01/john-cena-wwe-retiring.jpg"
//     }
// ]

export default function ProjectCreatePage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [projectName, setProjectName] = useState('');
    const [owner, setOwner] = useState('');
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log(projectName, owner)
            await setTimeout(() => {
                console.log("Submitted successfully");
                setIsLoading(false);
                router.push('/dashboard/scans')
            }, 5000);
        } catch (err) {

        }
    }

    const fetchOwners = async () => {
        const getUserAction = await actions.getUser.bind(null);
        const ownerData = getUserAction();
        setOwners([ownerData]);
    }

    useEffect(() => {
        fetchOwners();
    }, [])

    return (
        <div className="create_project_container">
            <h3 className="text-xl text-muted-foreground pb-6">
                Create a project (Step {tabIndex + 1} of 2)
            </h3>
            <Tabs className="w-[400px]" value={`${tabIndex}`}>
                <TabsContent value="0">
                    <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
                        Let's start with a name for your project
                    </h2>
                    <Label className="text-xs pb-[4px] block">Project name</Label>
                    <Input id="name" placeholder="Enter your project name" className="py-[24px]" onChange={(e) => setProjectName(e.target.value)} value={projectName} />
                    <div className="btn_wrap pt-8 flex gap-[12px]">
                        <Button onClick={() => setTabIndex(tabIndex + 1)} className="px-[32px] py-[24px]" disabled={projectName === ''}>Continue</Button>
                    </div>
                </TabsContent>

                <TabsContent value="1">
                    <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
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
                                            {console.log(ownerItem)}
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
        </div>
    );
}
