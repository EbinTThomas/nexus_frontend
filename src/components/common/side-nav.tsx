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
import { useEffect, useState } from "react";

export default function SideNav() {
    const [userCred, setUserCred] = useState({});
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
                    "path": `/projects/docs`
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

    const getUserAction = async () => await actions.getUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserAction();
                setUserCred(response);
            } catch (error) {
            }
        };
        fetchUser();
    }, [])

    return (
        <div className="w-[280px] h-full fixed top-0 left-0 bg-[#fff] flex flex-col justify-between p-4  border-r border-[#536682]-100 z-[2]">
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
                        <div
                            className="w-[36px] h-[36px] rounded-[0.375rem] flex items-center justify-center bg-[#f1f1f1] text-[.875rem] font-semibold text-gray-600"
                        >
                            {userCred && userCred.organisation?.substring(0, 1)}
                        </div>
                        <div>
                            <div className="font-[600] text-[0.875rem]">{userCred && userCred.organisation}</div>
                            <div className="text-[0.675rem]">{userCred && userCred.email}</div>
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