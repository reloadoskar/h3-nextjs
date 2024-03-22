"use client"
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"
export const ProductosContext = createContext()

export const useProductos = () => {
    return useContext(ProductosContext)
}

export const ProductosContextProvider = (props) =>{
    const [productos, setProductos] = useState([])
    const loadProductos = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/producto/s", { database })
            setProductos(response.data.productos)
            return response;
        }
        return false
    }, [])
    return(
        <ProductosContext.Provider value={{
            productos, loadProductos
        }}>
        {props.children}
        </ProductosContext.Provider>
    )

}