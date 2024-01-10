import { useEffect, useState } from "react"
import AgregarItemForm from "./AgregarItemForm"
import { usePdv } from "./PdvContext"
import { useVentas } from "./VentaContext"
import moment from "moment"
import { Filter, Search } from "lucide-react"

export default function PdvInventario() {
    const { inventario, minEmps, minStock } = usePdv()
    const {
        item, setItem,
    } = useVentas()

    const [searchFiltro, setSearchFiltro] = useState("PRODUCTO")
    const [search, setSearch] = useState("")

    const [invfiltrado, setInvfiltrado] = useState([])

    useEffect(()=>{
        if(inventario){
            let filtrado = inventario
                filtrado = filtrado.filter(itm => itm.empaquesStock >= minEmps && itm.stock >= minStock)
                if(search!== ""){      
                    if(searchFiltro==="PRODUCTO"){
                        filtrado = filtrado.filter(itm => itm.producto.descripcion.includes(search) )
                    }              
                    if(searchFiltro==="FOLIO"){
                        filtrado = filtrado.filter(itm => itm.compra.folio === parseInt(search) )
                    }              
                    if(searchFiltro==="CLAS"){
                        filtrado = filtrado.filter(itm => itm.producto.clasificacion.includes(search) )
                    }              
                }
            return setInvfiltrado(filtrado)
        }
        return setInvfiltrado([])
    },[inventario, search, searchFiltro, minEmps, minStock])

    return (
        <div className='w-full mt-12 px-6 flex flex-col'>
            {inventario.length !== 0 ?
                !item ?
                    <section className="flex flex-col bg-gray-700 px-6 py-2">
                        <nav >
                            <ul className="flex pb-4 items-center gap-3 ">
                                <li className="basis-1/2 mx-auto ">
                                    <div className="inputbasico flex gap-2">
                                        <label htmlFor="search">
                                            <Search />
                                        </label>
                                        <input id="search" name="search"
                                            type="text"
                                            className="w-full bg-transparent focus:border-none focus:outline-none"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <div>
                                            <select name="searchfiltro"
                                                className="bg-transparent focus:outline-none"
                                                value={searchFiltro}
                                                onChange={(e) => setSearchFiltro(e.target.value.toUpperCase)}
                                            >
                                                <option className="text-gray-950" value="PRODUCTO">Producto</option>
                                                <option className="text-gray-950" value="FOLIO">Folio</option>
                                                <option className="text-gray-950" value="CLAS">Clasificación</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </nav>

                        <div>
                            <div className="flex bg-gray-900 px-2">
                                <div className="basis-2/3"></div>
                                <div className="basis-1/3 text-right">Empaques</div>
                                <div className="basis-1/3 text-right">Unidades</div>
                            </div>
                            {invfiltrado
                                .map(item => (
                                    <div name="item" key={item._id} className="flex cursor-pointer hover:bg-gray-500 odd:bg-gray-800 px-2" onClick={() => setItem(item)}>
                                        <div className="basis-2/3">
                                            #{item.compra.folio}:{moment(item.createdAt).format("DD/MM/YYYY")} - {item.producto.descripcion}-{item.clasificacion}
                                        </div>
                                        <div className="basis-1/3 text-right">{item.empaquesStock}</div>
                                        <div className="basis-1/3 text-right">{item.stock.toFixed(2)}</div>
                                    </div>
                                ))}
                        </div>

                    </section>
                    :
                    <AgregarItemForm />
                : <span className="text-center">No se ha cargado el inventario. ⚠️</span>
            }


        </div >
    )
}
