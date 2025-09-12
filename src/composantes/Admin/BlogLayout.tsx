import SidebarRituelLayout from "@/components/BlogClient/SidebarRituelLayout";
import { PageEntity } from "../../../types/page-type";


interface BlogLayoutProps {
    children: React.ReactNode;
    content: PageEntity;
}


export default function BlogLayout({ children, content }: BlogLayoutProps) {
    return (


        <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 gap-12">
            {/* Header */}
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-3xl md:text-5xl font-extrabold">
                    {content.h1}
                </h1>
                <p className="text-lg text-slate-600">
                    {content.description1}
                </p>
            </div>

            {/* Layout principal */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Liste des articles */}
                <section className="flex-1 flex flex-wrap gap-8" >
                    {children}
                </section>

                {/* Sidebar injectée depuis le serveur */}
                <aside className="w-full lg:w-1/4">
                    <SidebarRituelLayout />
                </aside>
            </div>
        </div>
    );
}
