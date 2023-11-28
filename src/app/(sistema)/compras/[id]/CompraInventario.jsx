'use client'

import { useEffect, useState } from "react"
import CompraItemInventario from "./compraitem/CompraItemInventario"
import { numeroFormateado } from "@/utils/tools"

export default function CompraInventario(props) {
    const { inventario, ubicacions } = props
    const [terminados, setTerminados] = useState(true)
    const [filtro, setFiltro] = useState("ALL")
    const [inventarioFiltrado, setInvFiltrado] = useState({})
    const empsDisponible = inventario.reduce((ttl, itm) => ttl += itm.empaquesStock, 0)
    const empsTtl = inventario.filter(itm => itm.importe !== 0).reduce((ttl, itm) => ttl += itm.empaques, 0)
    const cantDisponible = inventario.reduce((ttl, itm) => ttl += itm.stock, 0)
    const cantTtl = inventario.filter(itm => itm.importe !== 0).reduce((ttl, itm) => ttl += itm.cantidad, 0)

    const porcEmpDisp = empsDisponible * 100 / empsTtl
    const porcCntDisp = cantDisponible * 100 / cantTtl
    // console.log(empsTtl)
    // console.log(porcEmpDisp)
    useEffect(() => {
        if (inventario) {
            let invfiltrado = inventario
            if (!terminados) {
                invfiltrado = inventario.filter(itm => itm.empaques > 0 && itm.cantidad > 0)
            }
            if (filtro !== "ALL") {
                invfiltrado = invfiltrado.filter(itm => itm.ubicacion._id === filtro)
            }
            let invPorUbicacion = invfiltrado.reduce((prds, itm) => {
                (prds[itm.ubicacion._id] = prds[itm.ubicacion._id] || []).push(itm)
                return prds
            }, {})
            setInvFiltrado(invPorUbicacion)
            // console.log(invPorUbicacion)
        }
    }, [filtro, terminados, inventario])
    return (
        <article className={`flex flex-col gap-2 py-4 `}>

            <div className="flex gap-2">

                <div className="basis-1/3 mb-5 rounded-sm bg-gray-800">
                    <h3 className="text-sm text-center">Empaques</h3>
                    <div className={`p-2 h-14 flex flex-row items-center justify-center transition-colors rounded-sm bg-gradient-to-r from-cyan-950 to-cyan-700 `} style={{ width: porcEmpDisp + "%" }} >


                    </div>
                    <div className="-mt-12 mb-2 flex basis-1/2 flex-col items-center">
                        <span className="text-3xl text-center font-semibold">{porcEmpDisp.toFixed(1)}%</span>
                    </div>
                    
                    <div className="font-semibold text-center">{empsDisponible} de {empsTtl}</div>
                    
                    {/* <ProgressBar value={porcEmpDisp} /> */}
                </div>

                <div className="basis-1/3 mb-5 rounded-sm bg-gray-800">
                    <h3 className="text-sm text-center">Unidades</h3>
                    
                    <div className={`p-2 h-14 flex flex-row items-center justify-center transition-colors rounded-sm bg-gradient-to-r from-cyan-950 to-cyan-700 `} style={{ width: porcCntDisp + "%" }} >
                    </div>
                    <div className=" -mt-12 mb-2 flex basis-1/2 flex-col items-center">
                        <span className="text-3xl  text-center font-semibold">{porcCntDisp.toFixed(1)}%</span>
                    </div>
                    
                    <div className="font-semibold text-center">{numeroFormateado(cantDisponible)} de {numeroFormateado(cantTtl)}</div>
                    
                </div>
                <div className="basis-1/3">emps vacios</div>

            </div>
            <div className="bg-gray-700 p-2 flex gap-6 w-full justify-center items-center">
                <div>
                    <input name="teminados" id="terminados" type="checkbox" checked={terminados} onChange={() => setTerminados(!terminados)} />
                    <label htmlFor="terminados">Mostrar terminados</label>
                </div>

                <select name="filtro" className="inputmini" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="ALL">Ver todo</option>
                    {ubicacions.map(ub => (
                        <option key={ub._id} value={ub._id}>{ub.nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <div className="bg-gray-800 flex px-2">
                    <div className="basis-2/4">Sucursal/Producto</div>
                    <div className="basis-2/4">Clasificación</div>
                    <div className="basis-1/4 text-right">Empaques</div>
                    <div className="basis-1/4 text-right">Unidades</div>
                </div>
                {ubicacions.sort((a, b) => a.nombre < b.nombre ? -1 : 1).map(ub => {
                    let invub = inventarioFiltrado[ub._id] || null
                    if (invub) {
                        return (
                            <div key={ub._id} >
                                <div className="border-b border-gray-500">
                                    <h2 className="text-xl font-extrabold border-b border-gray-500 ">{ub.nombre}</h2>
                                    {
                                        invub.map(itm => (
                                            <CompraItemInventario key={itm._id} itm={itm} {...props} />
                                        ))

                                    }
                                </div>
                                <div className="flex flex-row px-2 " >
                                    <div className="basis-2/4 text-right">Total:</div>
                                    <div className="basis-1/4 text-right">{invub.reduce((emp, itm) => emp += itm.empaquesStock, 0)}</div>
                                    <div className="basis-1/4 text-right">{invub.reduce((cant, itm) => cant += itm.stock, 0).toFixed(2)}</div>
                                </div>
                            </div>
                        )

                    }
                })}
            </div>
        </article>
    )
}
