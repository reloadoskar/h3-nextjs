import CompraForm from "./CompraForm"
import { loadProductors, loadUbicacions, loadProductos } from "@/utils/loaders"

export default async function NuevaCompra() {
  const productors = JSON.parse(await loadProductors())
  return (
    <section className="sectionbasic">
      <CompraForm productors={productors} />
    </section>
  )
}
