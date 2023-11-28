import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import PaginationControls from '@/components/pagination/PaginationControls'
import moment from "moment"
import { numeroFormateado } from "@/utils/tools"

export default function VentasCompra({ ventas, ubicacions }) {
    const searchParams = useSearchParams()

    /////////////////////CODIGO DE PAGINACION /////////////////////
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '5'

    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page) // 5, 10, 15 ...


    ////////////////////////////////////////////////////////////////



    const [mermas, setMermas] = useState([])
    const [cantt, setCantt] = useState(0)
    const [tmermas, setTmermas] = useState(0)
    // const [tventas, setTventas] = useState(0)
    const [tcant, setTcant] = useState(0)
    const [timp, setTimp] = useState(0)
    const [temp, setTemp] = useState(0)
    const [tpprom, setTprom] = useState(0)

    const [ventasFiltradas, setVf] = useState([])
    const [filtros, setFiltros] = useState({
        tipo: "TODO",
        // fecha: moment().format("YYYY-MM-DD"), 
        fecha: "",
        ubicacion: "TODAS",
        clasificacion: "TODO",
        producto: "TODOS"
    })
    const [productosDisponibles, setProductosDisponibles] = useState([])
    const [relacionSeleccionada, setRsel] = useState(0)
    const [relacionFechaImporte, setRfi] = useState([])
    const [relacionFechaEmpaques, setRfe] = useState([])
    const [relacionUbicacionEmpaques, setRubem] = useState([])
    const [relacionUbicacionImporte, setRubimp] = useState([])

    useEffect(() => {
        if (ventas && filtros) {
            var listaFiltrada = ventas

            if (filtros.tipo !== "TODO") {
                listaFiltrada = listaFiltrada.filter(el => el.venta.tipoPago === filtros.tipo)
            }
            if (filtros.fecha !== "") {
                listaFiltrada = listaFiltrada.filter(el => el.fecha === filtros.fecha)
            }
            if (filtros.ubicacion !== "TODAS") {
                listaFiltrada = listaFiltrada.filter(el => el.ubicacion._id === filtros.ubicacion)
            }
            // if(filtros.compra !== "TODO"){
            //     listaFiltrada = listaFiltrada.filter(el=>el.compra.folio === filtros.compra)
            // }
            // if(filtros.producto !== "TODO"){
            //     let dc = JSON.parse(filtros.producto)
            //     listaFiltrada = listaFiltrada.filter(el=>el.compraItem._id === dc.compraItem._id)
            // }
            if (filtros.clasificacion !== "TODO") {
                listaFiltrada = listaFiltrada.filter(el => el.compraItem.clasificacion === filtros.clasificacion)
            }
            if (filtros.producto !== "TODOS") {
                listaFiltrada = listaFiltrada.filter(el => el.compraItem._id === filtros.producto)
            }
            setVf(listaFiltrada)

            let productosdisponibles = ventas.reduce((acc, el) => {
                let objetoacomparar = { _id: el.compraItem._id, clasificacion: el.compraItem.clasificacion, producto: el.producto, compra: el.compra, fecha: el.compraItem.createdAt, empaques: el.compraItem.empaques }
                let finded = acc.find(el => el._id === objetoacomparar._id)
                if (!finded) {
                    return [...acc, objetoacomparar]
                }
                // if(!acc.includes(objetoacomparar)){
                //     return [...acc, objetoacomparar]
                // }

                return acc
            }, [])

            setProductosDisponibles(productosdisponibles)

            let fechasdisponibles = listaFiltrada.reduce((acc, el) => {
                if (!acc.includes(el.fecha)) {
                    return [...acc, el.fecha]
                }
                return acc
            }, [])

            let ubicacionesdisponibles = listaFiltrada.reduce((acc, el) => {
                if (!acc.includes(el.ubicacion.nombre)) {
                    return [...acc, el.ubicacion.nombre]
                }
                return acc
            }, [])

            // let tv = listaFiltrada.length
            let ct = listaFiltrada.reduce((acc, it) => acc += it.cantidad, 0)
            let et = listaFiltrada.reduce((acc, it) => acc += it.empaques, 0)
            let it = listaFiltrada.reduce((acc, it) => acc += it.importe, 0)
            let lmermas = listaFiltrada.filter(itm => itm.precio === 0).reduce((acc, it) => acc += it.cantidad, 0)
            let pprom = it / ct
            let tmerms = lmermas * pprom

            var relFechaImporte = []
            fechasdisponibles.forEach(fecha => {
                let importeFecha = listaFiltrada.filter(el => el.fecha === fecha).reduce((acc, el) => acc += el.importe, 0)
                relFechaImporte.push({ fecha: moment(fecha).format("ddd DD"), importe: importeFecha })
            });
            setRfi(relFechaImporte)

            var relFechaEmpaques = []
            fechasdisponibles.forEach(fecha => {
                let empaquesFecha = listaFiltrada.filter(el => el.fecha === fecha).reduce((acc, el) => acc += el.empaques, 0)
                relFechaEmpaques.push({ fecha: moment(fecha).format("ddd DD"), empaques: empaquesFecha })
            })
            setRfe(relFechaEmpaques)

            var relUbicacionEmpaques = []
            ubicacionesdisponibles.forEach(ub => {
                let empaquesUbicacion = listaFiltrada.filter(el => el.ubicacion.nombre === ub)
                    .reduce((acc, el) => acc += el.empaques, 0)
                relUbicacionEmpaques.push({ ubicacion: ub, empaques: empaquesUbicacion })
            })
            setRubem(relUbicacionEmpaques)

            var relUbicacionImporte = []
            ubicacionesdisponibles.forEach(ub => {
                let importeUbicacion = listaFiltrada.filter(el => el.ubicacion.nombre === ub)
                    .reduce((acc, el) => acc += el.importe, 0)
                relUbicacionImporte.push({ ubicacion: ub, importe: importeUbicacion })
            })
            setRubimp(relUbicacionImporte)






            setMermas(lmermas)
            setTmermas(tmerms)
            // setTventas(tv)
            setTcant(ct)
            setTimp(it)
            setTemp(et)
            setCantt(ct - lmermas)
            setTprom(pprom)
        }
    }, [filtros, ventas])
    const entries = ventasFiltradas.slice(start, end)
    return ventas.length > 0 ?
        <div>          
            <div className="bg-gray-700 px-6">
                <h2 className="text-center uppercase ">filtros</h2>
                <div className="flex gap-2 items-center">
                    <div className="basis-1/5">
                        <label htmlFor="tipo">Tipo de Venta</label>
                        <select id="tipo"
                            className="inputbasico mt-0"
                            value={filtros.tipo}
                            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                        >
                            <option>TODO</option>
                            <option>CONTADO</option>
                            <option>CRÉDITO</option>
                        </select>
                    </div>
                    <div className="basis-1/5">
                        <label htmlFor="fecha">Fecha</label>
                        <input id="fecha"
                            className="inputbasico mt-0"
                            type="date"
                            value={filtros.fecha}
                            onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
                        />
                    </div>
                    <div className="basis-1/5">
                        <label htmlFor="ubicacion">Ubicación</label>
                        <select id="ubicacion"
                            className="inputbasico mt-0"
                            value={filtros.ubicacion}
                            onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
                        >
                            <option>TODAS</option>
                            {ubicacions.length === 0 ? null :
                                ubicacions.sort((a, b) => a.nombre < b.nombre ? -1 : 1).map((ub, i) => (
                                    <option value={ub._id} key={i} >{ub.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="basis-1/5">
                        <label htmlFor="clasificacion">Clasificación</label>
                        <select id="clasificacion"
                            className="inputbasico mt-0"
                            value={filtros.clasificacion}
                            onChange={(e) => setFiltros({ ...filtros, clasificacion: e.target.value })}
                        >
                            <option>TODO</option>
                            <option value="S/C">SIN CLASIFICAR</option>
                            <option value="LINEA">LINEA</option>
                            <option value="MAYOREO">MAYOREO</option>
                            <option value="MENUDEO">MENUDEO</option>
                            <option value="CASCADO">CASCADO</option>
                        </select>
                    </div>
                    <div className="basis-1/5">
                        <label htmlFor="producto">Producto</label>
                        <select id="producto"
                            className="inputbasico mt-0"
                            value={filtros.producto}
                            onChange={(e) => setFiltros({ ...filtros, producto: e.target.value })}
                        >
                            <option value="TODOS">TODOS</option>
                            {productosDisponibles.length > 0 ?
                                productosDisponibles.map((item, i) => (
                                    <option value={item._id} key={i}>
                                        {item.producto.descripcion} {item.clasificacion} - {item.empaques} {moment(item.fecha).format("dd DD/MM")}
                                    </option>
                                ))
                                : null
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex-col w-1/2 bg-gray-800 p-6 rounded-md my-2">
                    <div className="flex">
                        <span className="basis-1/2">No. Ventas</span>
                        <span className="basis-1/2 text-right">{ventasFiltradas.length}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Empaques:</span>
                        <span className="basis-1/2 text-right">{temp}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Unidades:</span>
                        <span className="basis-1/2 text-right">{tcant.toFixed(2)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-2/3">Precio Promedio:</span>
                        <span className="basis-1/3 text-right">{(tpprom).toFixed(2)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Importe total:</span>
                        <span className="basis-1/2 text-right">{ numeroFormateado(timp,2)}</span>
                    </div>
                </div>
                
                <div className="flex-col w-1/2 bg-gray-800 p-6 rounded-md my-2">
                    <div className="flex">
                        <span className="basis-1/2">Bruto:</span>
                        <span className="basis-1/2 text-right">{tcant.toFixed(2)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Neto:</span>
                        <span className="basis-1/2 text-right">{cantt.toFixed(2)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Mermas:</span>
                        <span className="basis-1/2 text-right">{tmermas.toFixed(2)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">Costo mermas:</span>
                        <span className="basis-1/2 text-right">{numeroFormateado(tmermas)}</span>
                    </div>
                    <div className="flex">
                        <span className="basis-1/2">% de venta:</span>
                        <span className="basis-1/2 text-right">{(tmermas * 100 / timp).toFixed(2)}</span>
                    </div>

                </div>
            </div>
            {ventasFiltradas.length <= 0 ?
                <h1>No hay ventas</h1>
                : 
                <div className="">
                    <div className="flex bg-gray-800">
                        <span className="basis-6/12 text-xs">Folio</span>
                        <span className="basis-2/12 text-xs">Ubicación</span>
                        <span className="basis-1/12 text-xs text-right">Empaques</span>
                        <span className="basis-1/12 text-xs text-right">Unidades</span>
                        <span className="basis-1/12 text-xs text-right">Precio</span>
                        <span className="basis-1/12 text-xs text-right">Importe</span>
                    </div>
                    {    entries.map(vta => (
                        <div key={vta._id} className="flex">
                            <span className="basis-6/12">
                                #{vta.ventaFolio} {vta.fecha} {vta.venta.cliente.clave} - {vta.producto.clave} {vta.compraItem.clasificacion}
                            </span>
                            <span className="basis-2/12 ">
                                {vta.ubicacion.nombre}
                            </span>
                            <span className="basis-1/12 text-right">
                                {vta.empaques.toFixed(1)}
                            </span>
                            <span className="basis-1/12 text-right">
                                {vta.cantidad.toFixed(2)}
                            </span>
                            <span className="basis-1/12 text-right">
                                {vta.precio.toFixed(2)}
                            </span>
                            <span className="basis-1/12 text-right">
                                {vta.importe.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
}
            <PaginationControls
                length= {ventas.length}
                hasNextPage={end < ventas.length}
                hasPrevPage={start > 0}
            />
        </div>
    : <h1 className="flex text-2xl font-bold py-5 text-center justify-center">Aún no hay ventas registradas.</h1>
}
