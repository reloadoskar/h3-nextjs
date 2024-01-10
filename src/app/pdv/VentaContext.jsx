'use client'
import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'

export const VentasContext = createContext()

export const useVentas = () => {
    return useContext(VentasContext)
}

export const VentasContextProvider = (props) => {
    const [database, setDatabase] = useState()
    const [ubicacion, setUbicacion] = useState()
    const [fecha, setFecha] = useState(new Date())
    
    const [cliente, setCliente] = useState("60247712cc61c80004333be1")
    const [item, setItem] = useState()
    const [itemCant, setItemCant] = useState()
    const [itemEmps, setItemEmps] = useState()
    const [itemPrec, setItemPrec] = useState()
    const [itemImpo, setItemImpo] = useState()

    const [ventaItems, setVntaItms] = useState([])

    const [importeTotal, setImporteTotal] = useState(0)
    const [tipoPago, setTipoPago] = useState("CONTADO")
    const [efectivo, setEfectivo] = useState()
    const [cambio, setCambio] = useState(0)

    const [comentario, setComentario] = useState("")

    useEffect(() => {
        let cambio = parseFloat(efectivo) - importeTotal
        // console.log(cambio)
        setCambio(cambio)
    }, [efectivo])

    const selectUbicacion = (ub) => {
        return setUbicacion(ub)
    }

    const limpiarItemSeleccionado = () => {
        setItem(null)
        setItemCant()
        setItemEmps()
        setItemPrec()
        setItemImpo()
    }

    useEffect(() => {

        setItemImpo((itemCant * itemPrec).toFixed(2))

    }, [itemEmps, itemCant, itemPrec])

    const resetItems = () => {
        setVntaItms([])
    }

    const resetVenta = () => {
        resetItems()
        limpiarItemSeleccionado()
        setImporteTotal(0)
        setEfectivo()
        setCambio(0)
    }

    const crearVenta = async (venta) => {
        try {
            const res = await axios.post("/api/venta/save", venta)
            // console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }

    useEffect(()=>{
        if(cliente){
            console.log(cliente)
        }
    },[cliente])
    return (
        <VentasContext.Provider
            value={{
                database, setDatabase,
                ubicacion, selectUbicacion,
                cliente, setCliente,
                fecha, setFecha,
                item, setItem,
                itemCant, setItemCant,
                itemEmps, setItemEmps,
                itemPrec, setItemPrec,
                itemImpo, setItemImpo,
                importeTotal, setImporteTotal,
                efectivo, setEfectivo,
                cambio, setCambio,
                limpiarItemSeleccionado,
                ventaItems, setVntaItms,
                tipoPago, setTipoPago,
                resetItems,
                resetVenta,
                crearVenta
            }}>
            {props.children}
        </VentasContext.Provider>
    )
}