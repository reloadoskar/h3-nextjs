'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const InventarioContext = createContext()

export const useInventario = () => {
    return useContext(InventarioContext)
}
export const InventarioContextProvider = (props) => {
    const [database, setDatabase] = useState(null)
    const [inventario, setInventario] = useState([])
    const [inventarioFiltrado, setInvFiltrado] = useState([])
    const [mostrarTerminados, setMostrarTerminados] = useState(true)
    const [filtros, setFiltros] = useState({
        ubicacion: "TODO",
        clasificacion: "TODO",
        producto: "TODO",
        mostrarTerminados: true,
    })
    
    // La función fetch que se memoriza con useCallback 
    const loadInventarioGlobal = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/inventario/global",{database})
            
            return response; 
        }
    }, [])

    useEffect(() => {
        if (inventario && filtros) {
            let invfiltrado = inventario
            if (!filtros.terminados) {
                invfiltrado = inventario.filter(itm => itm.empaques > 0 || itm.cantidad > 0)
            }
            if (filtros.ubicacion !== "TODO") {
                invfiltrado = invfiltrado.filter(itm => itm.ubicacion._id === filtros.ubicacion)
            }
            if (filtros.clasificacion !== "TODO") {
                invfiltrado = invfiltrado.filter(itm => itm.clasificacion === filtros.clasificacion)
            }
            if(!filtros.mostrarTerminados){
                invfiltrado = invfiltrado.filter(itm=> itm.stock > 0 && itm.empaquesStock > 0)
            }
            let invPorUbicacion = invfiltrado.reduce((prds, itm) => {
                (prds[itm.ubicacion._id] = prds[itm.ubicacion._id] || []).push(itm)
                return prds
            }, {})
            setInvFiltrado(invPorUbicacion)
        }
    }, [filtros, inventario])

    return(
        <InventarioContext.Provider value={{
            inventario, setInventario,
            inventarioFiltrado,
            loadInventarioGlobal,
            filtros, setFiltros,
        }}>
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider