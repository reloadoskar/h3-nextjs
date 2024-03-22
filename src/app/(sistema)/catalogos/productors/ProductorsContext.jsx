'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const ProductorsContext = createContext()

export const useProductors = () => {
    return useContext(ProductorsContext)
}

export const ProductorsContextProvider = (props) =>{
    const [productors, setProductors] = useState([])
    const [productor, setProductor] = useState(null)
    const [verProductor, setVerP] = useState(false)
    const loadProductors = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/productor/s", { database })
            setProductors(response.data.productors)
            return response;
        }
    }, [])
    const createProductor = async (database, prdctr) => {
        const res = await axios.post("/api/productor/", { database, prdctr })
        setProductor([...productors, res.data.productor])
    }

    const updateProductor = async (database, prdctr) => {
        const res = await axios.put("/api/productor/", { database, prdctr })
        return res
    }
    return(
        <ProductorsContext.Provider value={{
            productors, productor, setProductor, loadProductors, createProductor, updateProductor,
            verProductor, setVerP,
        }}>
            {props.children}
        </ProductorsContext.Provider>
    )

}