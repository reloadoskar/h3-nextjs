'use client'
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from 'react'
import Image from 'next/image'
import Logo from '@/images/logob_hadria3.svg'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import { Factory, FolderTree, LayoutDashboard, ShoppingBag, Store, TableProperties, TrendingUp, Warehouse } from "lucide-react";
import avatar from '@/images/avatarH5.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const SidebarContext = createContext()

export default function Sidebar() {
    const { data: session, status } = useSession()
    const [expanded, setExpanded] = useState(true)
    const pathname = usePathname()
    return (
        <aside className='h-screen'>
            <nav className='h-full bg-gray-950 flex flex-col border-r'>
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <Image src={Logo} alt="" className={`overflow-hidden transition-all ${expanded ? "w-24" : "w-0"}`} />
                    <button onClick={() => setExpanded(curr => !curr)} className='p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700'>
                        {expanded ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className='flex-1 px-3'>
                        <SidebarItem icon={<LayoutDashboard />} size={20} text="Dashboard" active={pathname === "/dashboard" ? true : false} linkto="dashboard" />
                        <SidebarItem icon={<FolderTree />} size={20} text="Catálogos" active={pathname === "/catalogos" ? true : false} linkto="catalogos" />
                        <SidebarItem icon={<Warehouse />} size={20} text="Compras" active={pathname === "/compras" ? true : false} linkto="compras" />
                        {/* <SidebarItem icon={<Factory />} size={20} text="Producción" />
                        <SidebarItem icon={<TrendingUp />} size={20} text="Inversión" /> */}
                        <SidebarItem icon={<TableProperties />} size={20} text="Inventario" active={pathname === "/inventario" ? true : false} linkto="inventario" />
                        <SidebarItem icon={<ShoppingBag />} size={20} text="Ventas" active={pathname === "/ventas" ? true : false} linkto="ventas" />
                        <SidebarItem icon={<Store />} size={20} text="Pdv" active={pathname === "/pdv" ? true : false} linkto="pdv" />
                    </ul>
                </SidebarContext.Provider>
                <div className='border-t flex p-3'>
                    <Image src={avatar} alt="avatar" width={50} />
                    <div className={`
                    flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                `}>
                        <div className='leading-4'>
                            <h4 className='font-semibold'>{!session ? "" : session.user.nombre}</h4>
                            <span className='text-xs text-gray-500'>{!session ? "" : session.user.email}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert, linkto }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <li >
            <Link href={`/${linkto}`} className={`
            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
                    ? "bg-gradient-to-tr from-indigo-400 to-indigo-300 text-indigo-900"
                    : "hover:bg-gray-700 text-gray-400"
                }
        `}>
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
                )}
                {!expanded && (
                    <div
                        className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                    >
                        {text}
                    </div>
                )}
            </Link>
        </li>
    )
}
