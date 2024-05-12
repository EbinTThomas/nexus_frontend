"use client";
import * as actions from "@/actions/index";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { TbLoader } from "react-icons/tb";

export default function StartScanButton({scanId, btnValue}:{scanId: string, btnValue: string}) {
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleStartScan(event) {
        event.preventDefault();
        const startScanAction = actions.startScan.bind(null, scanId)
        startScanAction()
        setIsLoading(true);
    }

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(async () => {
                const scanDetail = await actions.getScanDetail(scanId);
                if (scanDetail.state === "completed") {
                    setIsLoading(false);
                    clearInterval(interval);
                    window.location.reload();
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <form onSubmit={btnValue==="Start Scan" && handleStartScan}>
            <Button type="submit" className="flex gap-2">{btnValue} {isLoading && <TbLoader size={16} />}</Button>
        </form>
    )
}