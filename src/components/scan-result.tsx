import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TableResults } from "./common/table-results";
import { HiTerminal } from "react-icons/hi";

interface ScanResult {
    id: number;
    scan_id: number;
    assigned_permissions: string[];
    vulnerable_permissions: string[];
    overly_permissive_services: string[];
    exploitation_details: string[];
    post_exploitation_activities: string[];
    assessment_phase_details: string[];
    summary: string | null;
}

export function ScanResult({ data }: ScanResult) {
    return (
        <Accordion type="multiple" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" /> Assigned Permissions
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.assigned_permissions} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" /> Vulnerable Permissions
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.vulnerable_permissions} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" />
                        Overly Permissive Services
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.overly_permissive_services} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" />
                        Exploitation Details
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.exploitation_details} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" />
                        Post Exploitation Activities
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.post_exploitation_activities} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <HiTerminal size={24} color="#536682" />
                        Assessment Phase Details
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <TableResults data={data.assessment_phase_details} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
