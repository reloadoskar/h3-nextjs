import moment from "moment"
import AgregarItemForm from "./AgregarItemForm"
import { usePdv } from "./PdvContext"
import { useVentas } from "./VentaContext"

export default function PdvInventario() {
    const {inventario} = usePdv()
    const {
        item, setItem,
    } = useVentas()


    return (
        <div className='w-full mt-12 px-6 flex flex-col'>
            {inventario.length !== 0 ?
                !item ? 
                    <section className="flex flex-col bg-gray-700 rounded-md px-6 py-2">
                        <nav >
                            <ul className="flex">
                                <li className="basis-1/2">buscar</li>
                                <li className="basis-1/2">ordenar por</li>
                            </ul>
                        </nav>

                        <div>
                            {inventario.filter(itm=>itm.empaquesStock>0 && itm.stock>0).map(item => (
                                <div name="item" key={item._id} className="flex cursor-pointer hover:bg-gray-500" onClick={() => setItem(item)}>
                                    <div className="basis-2/3">
                                        #{item.compra.folio}:{ moment(item.createdAt).format("DD/MM/YYYY")} - {item.producto.descripcion}-{item.clasificacion}
                                    </div>
                                    <div className="basis-1/3 text-right">{item.empaquesStock}</div>
                                    <div className="basis-1/3 text-right">{item.stock.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                    </section>
                    : 
                    <AgregarItemForm />
                : <span className="text-center">Cargando inventario</span>
            }
        

        </div >
    )
}
