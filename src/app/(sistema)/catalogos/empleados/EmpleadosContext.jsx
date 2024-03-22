'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const EmpleadosContext = createContext()

export const useEmpleados = () => {
    return useContext(EmpleadosContext)
}

export const EmpleadosContextProvider = (props) =>{
    const [empleados, setEmpleados] = useState([])
    const loadEmpleados = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/empleado/s", { database })
            setEmpleados(response.data.empleados)
            return response;
        }
    }, [])
    return(
        <EmpleadosContext.Provider value={{
            empleados, loadEmpleados
        }}>
            {props.children}
        </EmpleadosContext.Provider>
    )

}