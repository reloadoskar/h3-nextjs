'use client'
import { Factory, FolderTree, LayoutDashboard, Menu, ShoppingBag, SidebarCloseIcon, X, Store, TableProperties, TrendingUp, Warehouse } from "lucide-react";
import Link from "next/link";
import NavItem from "./NavItem";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const ref = useRef(null)
    const router = useRouter()
    const [expanded, setExpanded] = useState(false)
    const goTo = (here)=>{
        router.push(here);
        setExpanded(false)
    }
    useEffect(()=>{
        const handleOutsideClick = (e) =>{
            if(!ref.current?.contains(e.target)){
                setExpanded(false)
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    },[ref])
    return (

        <div className="flex align-top " ref={ref}>
            <div className={`fixed w-1/4 inset-0 bg-gradient-to-b 
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
                <div>
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
            </div>
            <div>
            </div>
        </div>
    )
}
