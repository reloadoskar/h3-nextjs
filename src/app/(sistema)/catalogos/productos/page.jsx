"use client"
import { useState, useEffect } from "react";
import ProductoRow from "./ProductoRow";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useProductos } from "./ProductosContext";

export default function Productos() {
  const { data: session, status } = useSession()
  const [database, setDb] = useState(null)
  const { productos, loadProductos } = useProductos()

  useEffect(() => {
    if (status === 'authenticated') {
      return setDb(session.user.database)
    }
    return setDb(null)
  }, [session, status])


  useEffect(() => {
    if (database) {
      loadProductos(database)
        .catch(err => {
          console.log(err)
          // toast(err.data.message)
        })
    }
  }, [database, loadProductos])

  const handleClick = () =>{
    
  }

  return (
    <div className="mx-6">
      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {productos.length}
            </h2>
          </span>
          <p className="text-center">Productos</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..." />
        <Link className="botonborde w-full basis-1/3" href="/catalogos/productos/new" >+Crear Producto</Link>
      </header>

      {/* <div className='flex flex-row gap-2 justify-between items-center mx-auto bg-gray-700 px-2'>
        <span className="basis-1/4">Descripción</span>
        <span className="basis-1/4">Clave</span>
        <span className="basis-1/4 text-right">Costo</span>
        <span className="basis-1/4 text-right">Precio Lista</span>
        <span className="basis-1/4 text-right">Precio Mayoreo</span>
      </div> */}

      <div className="overflow-auto rounded-lg ">
        <table className="w-full">
          <thead className="bg-gray-950 border-b border-gray-800">
            <tr>
              <th className="px-3 text-sm tracking-wide text-left">Descripción</th>
              <th className="px-3 text-sm tracking-wide text-left">Clave</th>
              <th className="px-3 text-sm tracking-wide text-left">Costo</th>
              <th className="px-3 text-sm tracking-wide text-left">Precio Lista</th>
              <th className="px-3 text-sm tracking-wide text-left">Precio Mayoreo</th>
            </tr>
          </thead>
          <tbody>
            {productos.length <= 0 ? null : productos.map(producto => (
              <tr key={producto._id} className="odd:bg-gray-700 cursor-pointer hover:bg-gray-600" onClick={(e) => handleClick(producto)}>
                <td className="px-3 text-sm text-gray-400">{producto.descripcion}</td>
                <td className="px-3 text-sm text-gray-400">{producto.clave}</td>
                <td className="px-3 text-sm text-gray-400">{producto.costo}</td>
                <td className="px-3 text-sm text-gray-400">{producto.precio1}</td>
                <td className="px-3 text-sm text-gray-400">{producto.precio2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <ProductoRow producto={producto} key={producto._id} /> */}

    </div>
  )
}

