import { adminConnection } from "./adminConnection"
import Productor from "@/models/productor"
import Ubicacion from "@/models/ubicacion"
import Producto from '@/models/producto'
import Compra from '@/models/compra'
import CompraItem from '@/models/compraitem'
import VentaItem from "@/models/ventaitem"
import Venta from "@/models/venta"
import Cliente from "@/models/cliente"
import Pago from "@/models/pago"
import Gasto from "@/models/gasto"

export async function loadCompras(user, mesAnio) {
    try {
        await adminConnection(user)
        let compras = await Compra
            .find({ fecha: { $gt: mesAnio + "-00", $lt: mesAnio + "-32" } })
            .populate('productor items')
            .populate({path:'items', populate: 'producto ubicacion'})
            .lean()
        return JSON.stringify(compras)
    } catch (error) {
        return []
    }
}

export async function loadCompra(id){
    try {
        let compra = await Compra.findById(id)
            .populate('productor ubicacion items gastos pagos')
            // .populate({path:'ventaItems', populate:'ubicacion producto compraItem venta'})
            .populate({
                path: 'ventaItems',
                populate: {
                    path: 'venta', select: 'cliente', populate:'cliente'
                },
            })
            .populate({
                path: 'ventaItems',
                populate: {
                    path: 'compraItem', select: 'clasificacion'
                },
            })
            .populate({
                path: 'ventaItems',
                populate: {path: 'ubicacion producto'}
            })
            .populate({path:'items', populate: 'producto ubicacion'})
            .populate({path:'gastos', populate: 'ubicacion'})
            .populate({path:'pagos', populate: 'ubicacion'})
            .lean()
        return JSON.stringify(compra)
    } catch (error) {
        return console.log(error)
    }
}

export async function loadCompraItem(id){
    try {
        let citem = await CompraItem.findById(id)
            .populate('producto ubicacion').lean()
            return JSON.stringify(citem)
    } catch (error) {
        return console.log(error)
    }
}

export async function loadProductors() {
    try {
        let productors = await Productor.find().lean()
        return JSON.stringify(productors)
    } catch (error) {
        return error
    }
}
export async function loadUbicacions(user) {
    try {
        await adminConnection(user)
        let ubicacion = await Ubicacion.find().lean()
        return JSON.stringify(ubicacion)
    } catch (error) {
        return error
    }
}
export async function loadProductos() {
    try {
        let productos = await Producto.find().lean()
        return JSON.stringify(productos)
    } catch (error) {
        return error
    }
}