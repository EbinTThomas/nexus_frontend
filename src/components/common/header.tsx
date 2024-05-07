import ProjectSwitch from "./project-switch";

interface HeaderProps {
    title: string,
    description: string
}

export default function Header({ title, description }: HeaderProps) {

    return (
        <header className="fixed top-0 right-0 w-full pl-[304px] pr-[24px] pt-4 pb-4 border-b border-[#536682]-100 flex justify-between items-center bg-[#fff] bg-opacity-15 backdrop-blur-[5px] z-[1]">
            <div>
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm">
                    {description}
                </p>
            </div>
            <ProjectSwitch />
        </header>
    )
}