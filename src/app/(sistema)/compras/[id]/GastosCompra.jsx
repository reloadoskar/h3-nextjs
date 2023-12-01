import { Search } from 'lucide-react'
import React from 'react'

export default function GastosCompra() {
    const gastos =[
    {folio: 1, fecha: "2023-11-5", importe:500, ubicacion:{nombre:"SUCURSAL 1"}, descripcion:"DESCARGA"},
    {folio: 2, fecha: "2023-11-8", importe:1000, ubicacion:{nombre:"SUCURSAL 1"}, descripcion:"ANDEN RENTA"},
    {folio: 10, fecha: "2023-11-10", importe:1000, ubicacion:{nombre:"SUCURSAL 1"}, descripcion:"ANDEN RENTA"},
]
  return gastos.length === 0 ? <h1 className='text-2xl font-bold text-center py-5'>Aún no se registran gastos.</h1> :
    <div className='flex flex-col'>
        <div className='flex gap-4 items-center     '>
            <div className='basis-1/4'>
                <button className='botonborde w-full'>+ Nuevo Gasto</button>

            </div>
            <div className='basis-1/4 inputbasico flex gap-2'>
                <Search />
                <input className='bg-transparent selection::border-none select-none' />
            </div>
            menu filtros ordenar por
        </div>
        <div className='bg-gray-800 flex px-2 gap-2'>
            <span className='basis-1/5'>Folio</span>
            <span className='basis-1/5'>Fecha</span>
            <span className='basis-1/5'>Ubicación</span>
            <span className='basis-1/5'>Descripción</span>
            <span className='basis-1/5 text-right'>Importe</span>
        </div>
        {gastos.map(gasto=>(
            <div className='flex px-2 ' key={gasto.folio}>
                <div className='basis-1/5'>{gasto.folio}</div>
                <div className='basis-1/5'>{gasto.fecha}</div>
                <div className='basis-1/5'>{gasto.ubicacion.nombre}</div>
                <div className='basis-1/5'>{gasto.descripcion}</div>
                <div className='basis-1/5 text-right'>{gasto.importe}</div>
            </div>
        ))}
    </div>
}
