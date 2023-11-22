import { adminConnection } from "@/utils/adminConnection";
import Productor from "@/models/productor";
import ProductorRow from "./ProductorRow";
import Link from "next/link";
import { toast } from "sonner";

export async function loadProductors(userDb) {
  try {
    await adminConnection(userDb);
    const productors = await Productor.find();
    return productors;
  } catch (error) {
    return error
  }
}

export default async function Productors() {

  const productors = await loadProductors().catch(err=>{
    toast(err.message)
  })
  return (
    <div className="contenedor px-12">
      <header className="flex justify-between mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {productors.length}
            </h2>
          </span>
          <p className="text-center">Productores</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..."/>
        <Link className="botonborde text-center basis-1/3" href="/catalogos/productors/new" >+Crear Productor</Link>
      </header>
      {productors.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron productores</h2>: productors.map(productor=>(
        <ProductorRow productor={productor} key={productor._id} />
      ))}
    </div>
  )
}
