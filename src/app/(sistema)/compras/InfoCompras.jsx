'use client'
import { numeroFormateado } from "@/utils/tools"

export default function InfoCompras(
  {compras = []}
  ) {
    
  const numCompras = compras.length
  const totalImporte = compras.reduce((acc,compra)=>acc+=compra.items.reduce((acc2,itm)=>acc2+=itm.importe,0),0) ||0
  const totalVenta = compras.reduce((acc,compra)=>acc+=compra.ventaItems.reduce((acc2, itm)=>acc2+=itm.importe,0),0) || 0
  const totalGasto = compras.reduce((acc,compra)=>acc+=compra.gastos,0) || 0
  const totalPagos = compras.reduce((acc,compra)=>acc+=compra.pagos,0)
  const totalSaldo = totalImporte-totalPagos ||0
  const resultado = totalVenta - totalGasto - totalImporte
  return (
    <div className='flex flex-col-6 gap-2 justify-between p-4 border rounded-md bg-gray-700'>
      <div className='flex flex-col text-center'>
        <h2 className='text-5xl font-bold'>{numCompras}</h2>
        <span className='text-gray-400'>Operaciones</span>
      </div>
      <div className='flex flex-col text-center'>
        <span className="text-gray-400">Venta total</span>
        <h3 className="font-bold text-lg">$ {numeroFormateado(totalVenta)}</h3>
      </div>
      <div className='flex flex-col text-center'>
        <span className="text-gray-400">Costo total</span>
        <h3 className="text-lg font-bold">$ {numeroFormateado(totalImporte)}</h3>
      </div>
      <div className='flex flex-col text-center'>
        <span className="text-gray-400">Pagos</span>
        <h3 className="text-lg font-bold">$ {numeroFormateado(totalPagos)}</h3>
        <span className="text-gray-400">Saldo</span>
        <h3 className="text-lg font-bold">$ {numeroFormateado(totalSaldo)}</h3>
      </div>
      <div className='flex flex-col text-center'>
        <span className="text-gray-400">Gasto total</span>
        <h3 className="text-lg font-bold">$ {numeroFormateado(totalGasto)}</h3>
      </div>
      <div className='flex flex-col text-center'>
        <span className="text-gray-400">Resultado</span>
        <h3 className={`text-lg font-bold ${resultado < 0 ? "text-red-400": "text-green-400"}`}>$ {numeroFormateado(resultado)}</h3>
      </div>
    </div>
  )
}
