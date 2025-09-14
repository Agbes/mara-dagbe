"use client";
import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Mail,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Video,
    Type,
} from "lucide-react";


import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


type MenuItem = {
    id: string;
    label: string;
    href?: string;
    icon?: React.ElementType;
    children?: {
        id: string;
        label: string;
        href: string;
        icon?: React.ElementType;
    }[];
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const { data: session } = useSession()

    if (!session || !session.user.superUser) {
        redirect("/login");
    }
    const [active, setActive] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const menuItems: MenuItem[] = [
        { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, href: "/admin" },

        {
            id: "temoignages",
            label: "Témoignages",
            icon: Users,
            children: [
                { id: "video", label: "Vidéos", href: "#", icon: Video },
                { id: "texte", label: "Textes", href: "#", icon: Type },
            ],
        },

        {
            id: "articles-pages",
            label: "Articles & Pages",
            icon: FileText,
            children: [
                { id: "articles", label: "Articles", href: "/admin/rituels" },
                { id: "tags", label: "Tags", href: "/admin/tag" },
                { id: "categories", label: "Catégories", href: "/admin/categories" },
            ],
        },

        { id: "messages", label: "Messages reçus", icon: Mail, href: "/admin/messages" },
        { id: "parametres", label: "Paramètres", icon: Settings, href: "/admin/parametres" },
    ];


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-cyan-800 text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6 text-center border-b border-cyan-700 flex justify-between items-center">
                    <h1 className="text-xl font-bold">⚡ Admin Moussa</h1>
                    <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        if (item.children) {
                            return (
                                <div key={item.id}>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition ${openDropdown === item.id
                                                ? "bg-cyan-700 text-white"
                                                : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            {Icon && <Icon className="w-5 h-5" />}
                                            {item.label}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openDropdown === item.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Sous-menu */}
                                    {openDropdown === item.id && (
                                        <div className="ml-10 mt-2 space-y-2">
                                            {item.children.map((child) => {
                                                const ChildIcon = child.icon;
                                                return (
                                                    <Link
                                                        key={child.id}
                                                        href={child.href}
                                                        onClick={() => {
                                                            setActive(child.id);
                                                            setSidebarOpen(false);
                                                        }}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${active === child.id
                                                                ? "bg-cyan-600 text-white"
                                                                : "text-cyan-100 hover:bg-cyan-600"
                                                            }`}
                                                    >
                                                        {ChildIcon && <ChildIcon className="w-4 h-4" />}
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.id}
                                href={item.href!}
                                onClick={() => {
                                    setActive(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active === item.id
                                        ? "bg-cyan-600 text-white"
                                        : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
                                    }`}
                            >
                                {Icon && <Icon className="w-5 h-5" />}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-cyan-700">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition">
                        <LogOut className="w-5 h-5" /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:pl-72">
                {/* Top bar */}
                <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                    <button className="lg:hidden text-cyan-700" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-7 h-7" />
                    </button>
                    <h2 className="text-xl font-bold">Tableau de bord</h2>
                </header>

                {/* ✅ Ici je rends le contenu dynamique */}
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
