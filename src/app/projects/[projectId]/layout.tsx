import Header from "@/components/common/header";
import SideNav from "@/components/common/side-nav";

interface ProjectLayoutProps {
    children: React.ReactNode,
    params: {
        projectId: string
    }
}

export default function ProjectLayout(props: ProjectLayoutProps) {
    return (
        <>
            <Header />
            <SideNav />
            <div className="pl-[304px] pt-[104px] pr-[24px] pb-[24px]">
                {props.children}
            </div>
        </>
    )
}