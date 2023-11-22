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

    return(
        <PdvContext.Provider value={{ 
            database, setDatabase,
            fecha, setFecha,
            ubicacion, setUbicacion,
            inventario, setInventario,
            clientes, setClientes

        }}>
            {props.children}
        </PdvContext.Provider>
    )
}