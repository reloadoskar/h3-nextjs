'use client'
import { createContext, useState, useContext, useEffect } from 'react'

export const PdvContext = createContext()

export const usePdv = () => {
    return useContext(PdvContext)
}

export const PdvContextProvider = (props) => {
    const [database, setDatabase] = useState(null)
    const [fecha, setFecha] = useState(null)
    const [ubicacion, setUbicacion] = useState(null)
    const [clientes, setClientes] = useState([])
    const [inventario, setInventario] = useState([])
    const [minEmps, setMinEmps] = useState(0)
    const [minStock, setMinStock] = useState(1)

    return(
        <PdvContext.Provider value={{ 
            database, setDatabase,
            fecha, setFecha,
            ubicacion, setUbicacion,
            inventario, setInventario,
            clientes, setClientes,
            minEmps, setMinEmps,
            minStock, setMinStock
        }}>
            {props.children}
        </PdvContext.Provider>
    )
}