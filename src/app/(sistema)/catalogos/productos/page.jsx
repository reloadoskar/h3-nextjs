
import { adminConnection } from "@/utils/adminConnection";
import Producto from "@/models/producto";
import ProductoRow from "./ProductoRow";
import Link from "next/link";
import { toast } from "sonner";

export async function loadProductos(userDb) {
  try {
    await adminConnection(userDb);
    const productos = await Producto.find();
    return productos;
  } catch (error) {
    return error
  }
}

export default async function Productos() {

  const productos = await loadProductos().catch(err => {
    toast(err.message)
  })
  return (
    <div className="contenedor px-12">
      <header className="flex justify-between mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {productos.length}
            </h2>
          </span>
          <p className="text-center">Productos</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..." />
        <Link className="boton basis-1/3" href="/catalogos/productos/new" >+Crear Producto</Link>
      </header>

      <div className='flex flex-row gap-2 justify-between items-center mx-auto bg-gray-700 px-2'>
        <span className="basis-1/4">Descripción</span>
        <span className="basis-1/4">Clave</span>
        <span className="basis-1/4 text-right">Costo</span>
        <span className="basis-1/4 text-right">Precio Lista</span>
        <span className="basis-1/4 text-right">Precio Mayoreo</span>
      </div>

      {productos.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron productos</h2> : productos.map(producto => (
        <ProductoRow producto={producto} key={producto._id} />
      ))}
    </div>
  )
}

