'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const MenuContext = createContext()

export const useMenu = () => {
    return useContext(MenuContext)
}
export const MenuContextProvider = (props) => {
    const [menu, setMenu] = useState([])
    
    const loadMenu = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/menu/load",{database})  
            setMenu(response.data.platos)         
            return response; 
        }
    }, [])

    const crearPlato = async (data) =>{
        if(data){
            const res = await fetch("/api/menu/plato",{
                method: "POST",
                body: data
            })
            const dt = await res.json()        
            setMenu([dt.plato, ...menu])
            return dt
        }
    }

    return(
        <MenuContext.Provider value={{
            menu,
            loadMenu, crearPlato
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider