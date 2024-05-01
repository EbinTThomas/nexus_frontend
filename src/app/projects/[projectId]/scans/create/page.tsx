"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from 'react';
import axios from 'axios'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AvatarDemo } from '@/components/avatar-demo';
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import * as actions from "@/actions/index";

const providers = [
    {
        "id": 1,
        "name": "Amazon Web Services",
        "img": "https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png"
    },
    {
        "id": 2,
        "name": "Google Cloud",
        "img": "https://banner2.cleanpng.com/20190612/vok/kisspng-cloud-computing-google-cloud-platform-cloud-storag-google-cloud-logo-png-image-free-download-searchpn-5d01a5ae4d22e9.530730771560389038316.jpg"
    },
    {
        "id": 3,
        "name": "Microsoft Azure",
        "img": "https://marketplace.radiantlogic.com/wp-content/uploads/bw_store_facet_images/bw_ad_azure_bw_ad_azure-900x0.png"
    }
]

interface ScanCreatePageProps {
    params: {
        projectId: string
    }
}

export default function ScanCreatePage(props: ScanCreatePageProps) {
    const [tabIndex, setTabIndex] = useState(0);
    const [scanName, setScanName] = useState('');
    const [provider, setProvider] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [keys, setKeys] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('scanName', scanName);
            formData.append('provider', provider);
            formData.append('keys', keys); 

            const createScanAction = actions.createScan.bind(null, {projectId: props.params.projectId, formData: formData});
            createScanAction();
        } catch(err) {
            console.error("Error submitting form:", err);
        } finally{
            setIsLoading(false);
        }
    }
    
    return (
        <div className="scans_container">
            <h3 className="text-xl text-muted-foreground pb-6 pt-6">
            Create a scan (Step {tabIndex + 1} of 3)
            </h3>
            <Tabs className="w-[400px]" value={`${tabIndex}`}>
                <TabsContent value="0">
                    <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
                        Let's start with a name for your scan
                    </h2>
                    <Label className="text-xs pb-[4px] block">Scan name</Label>
                    <Input id="name" placeholder="Enter your scan name" className="py-[24px]" onChange={(e)=> setScanName(e.target.value)} value={scanName} />
                    <div className="btn_wrap pt-8 flex gap-[12px]">
                        <Button onClick={() => setTabIndex(tabIndex + 1)} className="px-[32px] py-[24px]" disabled={scanName === ''}>Continue</Button>
                    </div>
                </TabsContent>
                
                <TabsContent value="1">
                    <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
                        Now select the cloud provider
                    </h2>
                    <Label className="text-xs pb-[4px] block">Provider</Label>
                    <Select defaultValue={provider} onValueChange={(data) => setProvider(data)}>
                        <SelectTrigger className="w-full py-[24px]">
                            <SelectValue placeholder="Select cloud provider" />
                        </SelectTrigger>
                        <SelectContent>
                        {
                            providers.map((provider) => (
                                <SelectItem value={provider.id} key={provider.id}>
                                    <div className="flex gap-[12px] items-center">
                                        <AvatarDemo
                                            imgSrc={provider.img}
                                        />
                                        <span className="font-semibold">{provider.name}</span>
                                    </div>
                                </SelectItem>        
                            ))
                        }
                        </SelectContent>
                        </Select>
                    <div className="btn_wrap pt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setTabIndex(tabIndex - 1)} className="px-[32px] py-[24px]">Previous</Button>
                        <Button onClick={() => setTabIndex(tabIndex + 1)} className="px-[32px] py-[24px]" disabled={provider === '' || isLoading}>Continue</Button>
                    </div>
                </TabsContent>
                
                <TabsContent value="2">
                    <h2 className="scroll-m-20 pb-8 text-3xl font-semibold tracking-tight first:mt-0">
                        Provide the keys to the cloud services
                    </h2>
                    <Label className="text-xs pb-[4px] block">Upload Keys</Label>
                    <Input  type="file" onChange={(e) => setKeys(e.target.files[0])} accept=".csv" />
                    <div className="btn_wrap pt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setTabIndex(tabIndex - 1)} className="px-[32px] py-[24px]">Previous</Button>
                        <Button onClick={handleSubmit} className="px-[32px] py-[24px]" disabled={!keys || isLoading}>
                            {
                                isLoading 
                                ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                                </>
                            :'Continue'
                            }
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
