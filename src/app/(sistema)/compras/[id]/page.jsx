import { loadCompra, loadProductos, loadUbicacions } from "@/utils/loaders"
import Header from "./Header"
import Main from "./Main"

export default async function Compra({ params }) {
    let getCompra = await loadCompra(params.id)
    let getUbicacions = await loadUbicacions()
    let getProductos = await loadProductos()
    // console.log(getCompra)
    const compra = JSON.parse(getCompra)
    // const compra = null
    const ubicacions = JSON.parse(getUbicacions)
    const productos = JSON.parse(getProductos)
    // console.log(productos)
    return compra ?
        <section className="contenedor flex flex-col">
            <Header compra={compra} />
            <Main compra={compra} ubicacions={ubicacions} productos={productos} />
        </section>
    : <p className="font-bold text-2xl text-center">No hay datos de compra</p>
}
