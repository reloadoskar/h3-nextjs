'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const UbicacionsContext = createContext()

export const useUbicacions = () => {
    return useContext(UbicacionsContext)
}
export const UbicacionsContextProvider = (props) => {
    const [ubicacions, setUbicacions] = useState([])
    const [ubicacion, setUbicacion] = useState(null)
    const loadUbicacions = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/ubicacion/s",{database})
            
            return response; 
        }
    }, [])
    return(
        <UbicacionsContext.Provider value={{
            ubicacion, setUbicacion,
            ubicacions, setUbicacions, 
            loadUbicacions
        }}>
            {props.children}
        </UbicacionsContext.Provider>
    )
}