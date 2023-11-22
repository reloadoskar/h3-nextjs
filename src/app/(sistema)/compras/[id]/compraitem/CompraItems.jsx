import { numeroFormateado } from "@/utils/tools"
import CompraItem from "./CompraItem"

export default function CompraItems(props) {
    const { items } = props
    const importeTotal = items.reduce((ttl,itm)=>ttl+=itm.importe,0)
    const empTotal = items.reduce((ttl,itm)=>ttl+=itm.empaques,0)
    const cantTotal = items.reduce((ttl,itm)=>ttl+=itm.cantidad,0)
    return (
        <div className="flex flex-col">
            <div className='flex flex-row bg-gray-700 px-4'>
                <p className='basis-2/6 border-r px-2'>Producto</p>
                <p className='basis-1/6 text-right border-r px-2'>Empaques</p>
                <p className='basis-1/6 text-right border-r px-2'>Unidades</p>
                <p className='basis-1/6 text-right border-r px-2'>Precio</p>
                <p className='basis-1/6 text-right px-2'>Importe</p>
            </div>
            {items.map(item => (
                <CompraItem key={item._id} item={item} {...props}/>
            ))}
            <div className="flex flex-row gap-1 justify-end bg-gray-800 px-2"> 
                <p className="basis-2/6 text-right">totales</p>
                <p className="basis-1/6 text-right">{numeroFormateado(cantTotal)}</p>
                <p className="basis-1/6 text-right">{numeroFormateado(empTotal)}</p>
                <p className="basis-1/6 text-right"></p>
                <p className="basis-1/6 text-right">{numeroFormateado(importeTotal)}</p>
            </div>
        </div>
    )

}
