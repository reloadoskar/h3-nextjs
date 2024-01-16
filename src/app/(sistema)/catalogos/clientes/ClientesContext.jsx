'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const ClientesContext = createContext()

export const useClientes = () => {
    return useContext(ClientesContext)
}
export const ClientesContextProvider = (props) => {
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState(null)
    const [verCliente, setVerCliente] = useState(false)

    const loadClientes = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/cliente/s", { database })
            setClientes(response.data.clientes)
            return response;
        }
    }, [])

    const createCliente = async (database, data) => {
        const res = await axios.post("/api/cliente/", { database, data })
        setClientes([...clientes, res.data.cliente])
    }

    const updateCliente = async (database, clnt) => {
        const res = await axios.put("/api/cliente/", { database, clnt })
        return res
    }

    return (
        <ClientesContext.Provider value={{
            cliente, setCliente,
            clientes, setClientes,
            loadClientes, updateCliente,
            createCliente, verCliente, setVerCliente,
        }}>
            {props.children}
        </ClientesContext.Provider>
    )
}