"use client";

import { CiGrid41 } from "react-icons/ci";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CommandDialogDemo } from "./command-dialog-demo";
import * as actions from "@/actions/index";
import { Button } from "../ui/button";

export default function SideNav() {
    const pathname = usePathname();
    const projectId = pathname.split('/')[2];

    const logoutAction = () => actions.logout();

    const menuMapping = [
        {
            "title": "Main",
            "items": [
                {
                    "label": "Project Overview",
                    "icon": <IoGridOutline size={24} />,
                    "path": `/projects/${projectId}`
                },
                {
                    "label": "Scans",
                    "icon": <AiOutlineSecurityScan size={24} />,
                    "path": `/projects/${projectId}/scans`
                },
                {
                    "label": "Documentation",
                    "icon": <IoDocumentAttachOutline size={24} />,
                    "path": `#`
                },
                {
                    "label": "Projects",
                    "icon": <GoStack size={24} />
                    ,
                    "path": `/projects`
                }
            ]
        }
    ]

    const bottomMenuMapping = [
        {
            "label": "Settings",
            "icon": <IoSettingsOutline size={24} />,
            "path": `#`
        },
        {
            "label": "Help",
            "icon": <IoIosHelpCircleOutline size={24} />,
            "path": `#`
        },
    ]

    const userCred = {
        "avatar": "/assets/images/avatar.png",
        "name": "John Cena",
        "email": "johncena@gmail.com"
    }

    return (
        <div className="w-[280px] h-full fixed top-0 left-0 bg-[#fff] flex flex-col justify-between p-4  border-r border-[#536682]-100 z-[100]">
            <div>
                <Image src="/assets/images/logo.svg" width={24} height={24} alt="logo" className="w-auto h-10 mb-4" />
                <div className="pb-4 mb-5 border-b border-[#536682]-100">
                    <CommandDialogDemo />
                </div>
                {
                    menuMapping.map((menu) => (
                        <div key={menu.title}>
                            <div className="mb-4 text-[0.775rem] font-[500] text-[#536682]">{menu.title}</div>
                            <ul>
                                {
                                    menu.items.map((item) => (
                                        <li key={item.label} className="mb-4">
                                            <Link href={item.path} className={`flex gap-3 items-center block w-full text-[0.875rem] ${pathname === item.path ? "text-[#4f46e5]" : "text-[#536682]"} text-medium`}>{item.icon}{item.label}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
            <div>
                <ul>
                    {
                        bottomMenuMapping.map((item) => (
                            <li key={item.label} className="mb-4">
                                <Link href={item.path} className="flex gap-3 items-center block w-full text-[0.875rem] text-[#536682] text-medium">{item.icon}{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex gap-2 justify-between items-center border-t border-[#536682]-100 pt-4">
                    <div className="flex gap-2 items-center">
                        <Image
                            src="/assets/images/avatar.png"
                            alt="avatar"
                            width={24}
                            height={24}
                            className="w-[36px] h-[36px] rounded-[0.375rem]"
                        />
                        <div>
                            <div className="font-[600] text-[0.875rem]">{userCred.name}</div>
                            <div className="text-[0.675rem]">{userCred.email}</div>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={logoutAction}>
                        <FaPowerOff color="tomato" />
                    </Button>
                </div>
            </div>
        </div>
    )
}