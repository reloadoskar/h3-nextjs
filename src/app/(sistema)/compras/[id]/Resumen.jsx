import Link from 'next/link'
import CompraItems from "./compraitem/CompraItems"
import { numeroFormateado } from '@/utils/tools'
export default function Remision(props) {
    const { compra, importeTotal } = props
    const compraItems = compra.items.filter(itm => itm.importe !== 0)
    const ventaTotal = compra.ventaItems.reduce((t, el) => t += el.importe, 0)
    const gastosTotal = compra.gastos.reduce((ttl, el) => ttl += el.importe, 0)
    const pagosTotal = compra.pagos.reduce((ttl, el) => ttl += el.importe, 0)
    const saldoTotal = importeTotal - pagosTotal
    const resultado = ventaTotal - importeTotal - gastosTotal
    return (
        <article className={`flex flex-col gap-2`}>
            {compraItems.length === 0 ?
                <p className="sectionbasic bg-gray-800 p-12 mt-10 rounded-md md:p-16">
                    <Link href={`/compras/${compra._id}/compraitem/new`} className="botonborde">Agregar producto</Link>
                </p>
                :
                <div className="py-12 flex flex-col items-end gap-4">
                    <div className="justify-end">
                        <Link href={`/compras/${compra._id}/compraitem/new`} className="botonborde">Agregar producto</Link>
                    </div>
                    <div className="w-full">
                        <CompraItems items={compraItems} {...props} />
                    </div>
                </div>
            }
            <div className="py-6 flex gap-4">

                <div className="text-center text-2xl flex flex-col basis-1/4">
                    <span>Venta</span>
                    <span>$ {numeroFormateado(ventaTotal) || 0}</span>
                </div>

                <div className="group text-center text-2xl flex flex-col basis-1/4 ">
                    <div className='group flex flex-col'>
                        <div className='flex justify-center items-center'>
                            <span>Costo</span>
                            <svg
                                className="fill-current h-4 w-4 group-hover:rotate-180 transition-transform"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>                        
                        <span className='text-red-400'>- $ {numeroFormateado(importeTotal) || 0}</span>
                    </div>
                    <div className='transition duration-700 ease-in-out delay-150 text-gray-900 group-hover:text-gray-200'>
                        <div className="text-center text-xl flex flex-col">
                            <span>Pagos

                            </span>
                            <span>$ {numeroFormateado(pagosTotal) || 0}</span>
                        </div>
                        <div className="text-center text-xl flex flex-col">
                            <span>Saldo</span>
                            <span>$ {numeroFormateado(saldoTotal) || 0}</span>
                        </div>
                    </div>
                </div>



                <div className="text-center text-2xl flex flex-col basis-1/4">
                    <span>Gastos</span>
                    <span
                        className={`${resultado > 0 ? "text-green-400" : "text-red-400"}`}
                    >$ {numeroFormateado(gastosTotal) || 0}</span>
                </div>

                <div className="text-center text-2xl flex flex-col basis-1/4">
                    <span>Resultado</span>
                    <span
                        className={`${resultado > 0 ? "text-green-400" : "text-red-400"}`}
                    >$ {numeroFormateado(resultado) || 0}</span>
                </div>



            </div>

        </article>
    )
}
