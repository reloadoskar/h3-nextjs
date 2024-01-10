import { XCircle } from "lucide-react"
import { useVentas } from "./VentaContext"
import { usePdv } from "./PdvContext"

import { useState } from "react"
import Cobrar from "./Cobrar"
import { numeroFormateado } from "@/utils/tools"

export default function Nota() {
    const { ventaItems: items, resetItems, setVntaItms, importeTotal, setImporteTotal, resetVenta } = useVentas()
    const { inventario} = usePdv()
    const [modalCobrar, setModalCobrar] = useState(false)
    let tEmpaques = 0
    let tCantidad = 0
    if (items) {
        tEmpaques = items.reduce((ttl, itm) => ttl += parseFloat(itm.empaques), 0)
        tCantidad = items.reduce((ttl, itm) => ttl += parseFloat(itm.cantidad), 0).toFixed(2)
        setImporteTotal( items.reduce((ttl, itm) => ttl += parseFloat(itm.importe), 0) )
    }

    const handleCancelar = () => {
        items.forEach(item => {
            let itmInv = inventario.filter(itm=>itm._id===item.item._id)
            // console.log(itmInv)
            itmInv[0].stock += parseFloat(item.cantidad)
            itmInv[0].empaquesStock += parseFloat(item.empaques)
        });
        resetItems()
    }

    const removeVentaItem = (vtaItem,i) => {
        let itmInv = inventario.filter(itm=>itm._id===vtaItem.item._id)
            itmInv[0].stock += parseFloat(vtaItem.cantidad)
            itmInv[0].empaquesStock += parseFloat(vtaItem.empaques) 

        // let itemsFiltrados = items.filter(itm=>itm.item._id!== vtaItem.item._id)
        let itemsFiltrados = items.splice(i,1)
        // console.log(itemsFiltrados)
        // FALTA REMOVER SOLO UN ITEM CUANDO EXISTAN VARIOS DEL MISMO COMPRAITEM
        setVntaItms(itemsFiltrados)
    }

    const cobrar = () =>{
        setModalCobrar(true)
    }

    const cerrarCobrar = () =>{
        setModalCobrar(false)
    }

    return (
        <div className='mt-12 px-6'>
            {items.length > 0 ?
                <div className="bg-gray-600 px-6 py-2 rounded-md">

                    {items.map((itm,i) => (
                        <div key={i} className='flex odd:bg-gray-800 px-2'>
                            {/* <button onClick={()=>removeVentaItem(itm,i)} className="pr-2 hover:text-red-500 transition duration-400 ease-in-out"><XCircle /></button> */}
                            <span className='basis-2/6'>
                                #{itm.item.compra.folio}-{itm.item.producto.descripcion} {itm.item.clasificacion}
                            </span>
                            <span className='basis-1/6 text-right'>
                                {itm.empaques}
                            </span >
                            <span className='basis-1/6 text-right'>
                                {itm.cantidad}
                            </span>
                            <span className='basis-1/6 text-right' >
                                {itm.precio}
                            </span>
                            <span className='basis-1/6 text-right' >
                                {itm.importe}
                            </span>
                        </div>
                    ))}

                    <div className='flex border-t border-gray-700'>
                        <span className="px-4 "></span>
                        <span className='basis-2/6 text-right'>Totales:</span>
                        <span className='basis-1/6 text-right'>{tEmpaques}</span>
                        <span className='basis-1/6 text-right'>{tCantidad}</span>
                        <span className='basis-1/6 text-right'></span>
                        <span className='basis-1/6 text-right'>{numeroFormateado( importeTotal)}</span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="botonrojo" onClick={handleCancelar}>cancelar</button>
                        <button className="botonverde" onClick={cobrar}>cobrar</button>
                        <Cobrar open={modalCobrar} close={cerrarCobrar} />
                    </div>
                </div>
                : null
            }

        </div>
    )
}
