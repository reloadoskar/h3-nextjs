import CompraRow from './CompraRow'

export default function ListaCompras({ compras }) {
    return compras.length > 0 ?
        <div className=''>
            <ul>
                <li className='flex flex-row gap-2 bg-gray-500 p-2'>
                    <div className='basis-1/12'>Folio</div>
                    <div className='basis-1/12'>Clave</div>
                    <div className='basis-2/12'>Fecha</div>
                    <div className='basis-3/12'>Productor</div>
                    <div className=' text-right basis-1/12'>Costo</div>
                    <div className=' text-right basis-2/12'>Venta</div>
                    <div className=' text-right basis-1/12'>Gastos</div>
                    <div className=' text-right basis-2/12'>Resultado</div>
                </li>
                {compras.map(compra => {
                    return (
                        <CompraRow compra={compra} key={compra.folio} />
                    )
                })}
            </ul>
        </div>
        : <h2>no hay compras</h2>
}
