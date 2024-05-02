"use client";
import * as actions from "@/actions/index";
import { Button } from "./ui/button";

export default function StartScanButton({scanId, btnValue}:{scanId: string, btnValue: string}) {
    async function handleStartScan(event) {
        event.preventDefault();
        const startScanAction = actions.startScan.bind(null, scanId)
        startScanAction()
    }
    return (
        <form onSubmit={handleStartScan}>
            <Button type="submit">{btnValue}</Button>
        </form>
    )
}