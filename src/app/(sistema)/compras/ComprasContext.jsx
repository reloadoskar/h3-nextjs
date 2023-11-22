'use client'
import { createContext, useState, useContext } from 'react'
import axios from 'axios';
import moment from "moment/moment";
// import { loadCompras } from '@/utils/loaders';

export const ComprasContext = createContext()

export const useCompras = () => {
    return useContext(ComprasContext)
}


export const ComprasContextProvider = (props) => {
    const [compras, setCompras] = useState([])
    const [mesAnio, setMesAnio] = useState(moment().format("YYYY-MM"))
//     const compras = await loadCompras(user, mesAnio)
//     const [compra, setCompra] = useState(null)
//     const [itemCompra, setItemCompra] = useState(null)

//     const numCompras = compras.length
//     const totalImporte = compras.reduce((acc, compra) => acc += compra.importe, 0)
//     const totalVenta = compras.reduce((acc, compra) => acc += compra.venta, 0)
//     const totalGasto = compras.reduce((acc, compra) => acc += compra.gasto, 0)
//     const totalPagos = compras.reduce((acc, compra) => acc += compra.pagos, 0)
//     const totalSaldo = compras.reduce((acc, compra) => acc += compra.saldo, 0)
//     const resultado = totalVenta - totalGasto - totalImporte

    const loadCompras = async (database, mesAnio) => {
        try {
            const res = await axios.post("/api/compra/s",{database: database, mesanio: mesAnio})
            return setCompras(res.data)
        } catch (error) {
            console.log(error)
        }
    }

//     const actualizarCompra = async (user, compra) =>{
//         // const res = await getCompra(user, compra)
//         // setCompra(res.compra)
//     }

//     const addCompra = async (user, compra) => {
//     	// const res = await saveCompra(user, compra)
//         // setCompras([...compras, res.compra])
//     	// return res
//     }

//     const removeCompra = async (user, id) =>{
//     	// const res = await cancelCompra(user, id)
//     	// setCompras(compras.filter(compra => compra._id !== id))
//     	// return res
//     }

//     const cerrarCompra = async (user, id) => {
//         // const res = await closeCompra(user, id)
//         // return res
//     }

//     const selectCompra = (compraSelected) => {
//         setCompra(compraSelected)
//     }

//     const comprasActivas = async (user) => {
//         // const res = await getComprasActivas(user)
//         // return res.compras
//     }

//     const findCompra = async (user, id) => {
//         // const res = await getCompra(user, id)
//         // setCompra(res)
//     }

//     const clearCompras = () => {
//         setCompras([])
//     }

//     const editCompra = async (user, compra) =>{
//         // const res = await updateCompra(user, compra)
//         // return res
//     }

//     const crearMerma = async (user, data) =>{
//         // const res = await createMerma(user, data)
//         // return res
//     }

//     const selectItemCompra = (itemCompraSelected) => {
//         // setItemCompra(itemCompraSelected)
//     }

//     const updateItemCompra = (item) => {
//         // selectItemCompra(item)
//     }

    return (
        <ComprasContext.Provider
            value={{
                mesAnio, setMesAnio,
                compras,
                setCompras,
//                 numCompras,
//                 totalImporte, totalGasto, totalPagos, totalSaldo, totalVenta, resultado,
//                 compra,
//                 itemCompra,
                loadCompras,
//                 addCompra,
//                 removeCompra,
//                 selectCompra,
//                 cerrarCompra,
//                 comprasActivas,
//                 findCompra,
//                 clearCompras,
//                 editCompra,
//                 crearMerma,
//                 selectItemCompra, updateItemCompra, actualizarCompra
            }}
        >
            {props.children}
        </ComprasContext.Provider>
    )
}

export default ComprasContextProvider