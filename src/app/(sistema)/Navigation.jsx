import { Factory, FolderTree, LayoutDashboard, ShoppingBag, Store, TableProperties, TrendingUp, Warehouse } from "lucide-react";

export default function Navigation() {
    return (

        <div className="flex align-top">
            <input type="checkbox" id="nav" className="peer hidden" />
            <label htmlFor="nav" className="
                w-6 
                h-4 
                transition-all 
                
                bg-open-menu 
                bg-cover 
                bg-center 
                cursor-pointer 
                peer-checked:bg-close-menu 
                z-50
                ">
            </label>
            <div className="fixed w-1/4 inset-0 bg-gradient-to-b from-black/95 to-black/70 -translate-x-full peer-checked:translate-x-0 transition-transform duration-500 ease-in-out group">

                <div className="w-full py-10">
                    <h1 className="text-2xl font-bold text-center">H A D R I A 3</h1>
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-6">
                            <li className="px-6 flex gap-2">
                                <LayoutDashboard />
                                <span>
                                    Dashboard
                                </span>
                            </li>
                            <li className="px-6 flex gap-2">
                                <FolderTree />
                                <span>
                                    Catálogos
                                </span>
                            </li>
                            <li className="px-6 flex gap-2">
                                <Warehouse />
                                <span>
                                    Compras
                                </span>
                            </li>
                            <li className="px-6 flex gap-2">
                                <TableProperties />
                                <span>
                                    Inventario
                                </span>
                            </li>
                            <li className="px-6 flex gap-2">
                                <ShoppingBag />
                                <span>
                                    Ventas
                                </span>
                            </li>
                            <li className="px-6 flex gap-2">
                                <Store />
                                <span>
                                    Pdv
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
