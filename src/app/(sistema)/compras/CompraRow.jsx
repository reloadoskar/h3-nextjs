'use client'
import { numeroFormateado } from '@/utils/tools'
import { useRouter } from 'next/navigation'

export default function CompraRow({ compra }) {
    const router = useRouter()
    const importeTotal = compra.items.reduce((ttl,itm)=>ttl+=itm.importe,0)
    compra.tventas = compra.ventaItems.reduce((ttl,vnta) => ttl+=vnta.importe,0)
    compra.tgastos = compra.gastos.reduce((ttl,gst) => ttl+=gst.importe,0)
    const resultado = compra.tventas -importeTotal - compra.tgastos
    const showCompra = (id) =>{
        router.push(`/compras/${id}`)
    }
    return (
        <li className='flex flex-row gap-2 p-2 border-b hover:bg-gray-500 cursor-pointer transition duration-700 ease-in-out' onClick={() => showCompra(compra._id)}>
            <div className='basis-1/12'>{compra.folio}</div>
            <div className='basis-1/12'>{compra.clave}</div>
            <div className='basis-2/12'>{compra.fecha}</div>
            <div className='basis-3/12'>{compra.productor?.nombre}</div>
            <div className=' text-right basis-1/12'>{numeroFormateado(importeTotal)}</div>
            <div className=' text-right basis-2/12'>{numeroFormateado(compra.tventas)}</div>
            <div className=' text-right basis-1/12'>{numeroFormateado(compra.tgastos)}</div>
            <div className={`text-right basis-2/12 ${resultado > 0 ? "text-green-400" : "text-red-400"}`}>{numeroFormateado(resultado)}</div>
        </li>
    )
}
