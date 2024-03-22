'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}
export const SettingsContextProvider = (props) => {
    const [settings, setSettings] = useState({
        tipo: "",
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
        plan: "",
        periodo:"",
        precio:0,
    }) 
            
    // La función fetch que se memoriza con useCallback 
    const loadSettings = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/settings/load",{database})            
            return response; 
        }
    }, [])

    const createSettings = async (database, data) => {
        const res = await axios.post("/api/settings/", { database, data })
        // console.log(res.data)
        // setSettings(res.data.settings)
        return res
    }
    const updateSettings = async (database, data) => {
        const res = await axios.put("/api/settings/", { database, data })
        setSettings(data)
        return res
    }
    return(
        <SettingsContext.Provider value={{
            settings, setSettings,
            createSettings,
            loadSettings, updateSettings
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider