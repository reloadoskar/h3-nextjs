'use client'
import { useState } from "react"
import Resumen from "./Resumen"
import CompraInventario from "./CompraInventario"
import VentasCompra from "./VentasCompra"

export default function Main(props) {
    const {compra} = props
    // console.log(compra)
    const [sectionSelected, setSectionSel] = useState(0)
    const importeTotal = compra.items.reduce((ttl,itm)=>ttl+=itm.importe,0)
    
    return (
        <div>
            <nav className="border-b border-gray-700">
                <ul className="flex flex-row justify-between text-center">
                    <li className={`basis-1/5 mx-auto hover:font-semibold cursor-pointer ${sectionSelected === 0 ? "bg-gray-800" : ""}`} onClick={() => setSectionSel(0)}>Resumen</li>
                    <li className={`basis-1/5 mx-auto hover:font-semibold cursor-pointer ${sectionSelected === 1 ? "bg-gray-800" : ""}`} onClick={() => setSectionSel(1)}>Inventario</li>
                    <li className={`basis-1/5 mx-auto hover:font-semibold cursor-pointer ${sectionSelected === 2 ? "bg-gray-800" : ""}`} onClick={() => setSectionSel(2)}>Ventas</li>
                    <li className={`basis-1/5 mx-auto hover:font-semibold cursor-pointer ${sectionSelected === 3 ? "bg-gray-800" : ""}`} onClick={() => setSectionSel(3)}>Gastos</li>
                    <li className={`basis-1/5 mx-auto hover:font-semibold cursor-pointer ${sectionSelected === 4 ? "bg-gray-800" : ""}`} onClick={() => setSectionSel(4)}>Pagos</li>
                </ul>
            </nav>
            {sectionSelected === 0 ?
                <Resumen compra={compra} importeTotal={importeTotal} {...props}/>
                :
            sectionSelected === 1 ?
                <CompraInventario inventario={compra.items} {...props}/> : 
            sectionSelected === 2 ?
                <VentasCompra ventas={compra.ventaItems} {...props}/> :
            sectionSelected === 3 ?
             "gastos" :
            sectionSelected === 4 ?
            "pagos" : null
            }
        </div>
    )
}
