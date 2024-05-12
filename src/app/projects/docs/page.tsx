import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function Documentation(params: type) {
    return (
        <div className="create_project_container px-[24px] lg:px-[15vw] md:px-[10vw] sm:px-[5vw] pt-[80px] pb-[32px]">
            <div className="mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Documentation</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h2 className="scroll-m-20 pb-8 text-5xl font-semibold tracking-tight first:mt-0 leading-none">
                XOPs - Adversary Cloud Penetration Testing Framework
            </h2>
            <p className="leading-7">
                XOPs is a powerful tool designed to identify misconfigurations in cloud infrastructure, specifically focusing on the security implications of various roles, policies, and services attached to users in cloud environments. These misconfigurations can potentially allow a lower privileged user to gain unauthorized access to higher privileged resources, such as administrator accounts.
            </p><br />
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Features
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li><strong>Cloud Infrastructure Focus:</strong> XOPs is currently tailored for AWS infrastructure, with plans to expand to Azure and GCP in the future.</li>
                <li><strong>Misconfiguration Detection:</strong> The tool helps in identifying misconfigurations in cloud setups that could lead to security vulnerabilities.</li>
                <li><strong>User Role and Policy Analysis:</strong> XOPs analyzes user roles and policies to highlight potential areas of concern.</li>
                <li><strong>User Group Evaluation:</strong> It also evaluates user groups and their associated permissions to identify potential risks.</li>
            </ul>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                How to Use XOPs
            </h3>
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                <li><strong>Visit</strong> <Link href="/">www.xops.com</Link>: Access the XOPs platform through the website.</li>
                <li><strong>Create or Login to Your Account:</strong> Register for a new account or log in with your existing credentials.</li>
                <li><strong>Create a Project:</strong> Set up a project, which serves as a workspace for organizing and running specific scans.</li>
                <li><strong>Create a Scan:</strong> Use the tool to create a scan using the cloud user keys or lower privileged user keys that need testing.</li>
                <li><strong>Start the Scan:</strong> Initiate the scan process to identify potential misconfigurations.</li>
                <li><strong>View Scan Results:</strong> Once the scan is completed, the results will be displayed, highlighting any identified issues.</li>
                <li><strong>Inspect Scan Results:</strong> Click on 'inspect' to visualize the attack path and understand the potential impact of the identified misconfigurations.</li>
            </ol>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Future Updates
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                <strong>Azure and GCP Support: </strong>
                XOPs plans to expand its compatibility to Azure and GCP, providing a comprehensive solution for cloud security across multiple platforms.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                XOPs is an essential tool for organizations looking to enhance their cloud security posture by identifying and mitigating potential vulnerabilities arising from misconfigurations.
            </p>
        </div>
    )
}