import { loadProductos, loadUbicacions } from "@/utils/loaders";
import CompraItemForm from "./CompraItemForm";

export default async function page({ params }) {
  const productos = JSON.parse(await loadProductos())
  const ubicacions = JSON.parse(await loadUbicacions())
  return (
    <div className="sectionbasic w-[70%]">
      <CompraItemForm productos={productos} ubicacions={ubicacions} compra={params.id} />
    </div>
  )
}
