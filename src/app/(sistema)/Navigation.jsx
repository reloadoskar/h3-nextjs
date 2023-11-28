'use client'
import { Factory, FolderTree, LayoutDashboard, Menu, ShoppingBag, SidebarCloseIcon, X, Store, TableProperties, TrendingUp, Warehouse, MoreVertical } from "lucide-react";
import Link from "next/link";
import NavItem from "./NavItem";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from '@/images/avatarH5.png'
import { useSession } from "next-auth/react";

export default function Navigation() {
    const { data: session, status } = useSession()
    const ref = useRef(null)
    const router = useRouter()
    const [expanded, setExpanded] = useState(false)
    const goTo = (here) => {
        router.push(here);
        setExpanded(false)
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!ref.current?.contains(e.target)) {
                setExpanded(false)
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref])
    return (

        <div className="flex flex-col" ref={ref}>
            <div className={`fixed w-1/3 inset-0 bg-gradient-to-b  flex flex-col
                from-black/95 to-black/80 
                ${expanded ? "translate-x-0" : "-translate-x-full"}
                transition-transform 
                duration-500 ease-in-out `}>
                <div className="w-6 h-6 absolute -right-6">
                    <button className="" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <X /> : <Menu />}
                    </button>
                </div>

                <div className="w-full py-10">
                    <h1 className="text-2xl font-bold text-center">H A D R I A 3</h1>
                </div>
                <div className="flex-1">
                    <nav>
                        <ul className="flex flex-col gap-2">
                            <NavItem goTo={goTo} icon={<LayoutDashboard />} text="Dashboard" linkto="/dashboard" />
                            <NavItem goTo={goTo} icon={<FolderTree />} text="Catálogos" linkto="/catalogos" />
                            <NavItem goTo={goTo} icon={<Warehouse />} text="Compras" linkto="/compras" />
                            <NavItem goTo={goTo} icon={<TableProperties />} text="Inventario" linkto="/inventario" />
                            <NavItem goTo={goTo} icon={<ShoppingBag />} text="Ventas" linkto="/ventas" />
                            <NavItem goTo={goTo} icon={<Store />} text="Punto de venta" linkto="/pdv" />
                        </ul>
                    </nav>
                </div>
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
            </div>
        </div>
    )
}
