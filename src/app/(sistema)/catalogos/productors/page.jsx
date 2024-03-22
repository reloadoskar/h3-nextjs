'use client'
import { useState, useEffect } from "react";
import ProductorRow from "./ProductorRow";
import Link from "next/link";
import { toast } from "sonner";
import { useProductors } from "./ProductorsContext";
import { useSession } from "next-auth/react";
import ProductorCard from "./ProductorCard";

export default function Productors() {
  const { data: session, status } = useSession()
  const [database, setDb] = useState(null)
  const { productors, loadProductors, verProductor, setVerP } = useProductors()

  useEffect(() => {
    if (status === 'authenticated') {
      return setDb(session.user.database)
    }
    return setDb(null)
  }, [session, status])

  useEffect(() => {
    if (database) {
      loadProductors(database)
    }
  }, [database, loadProductors])
  return (
    <div className="mx-6">
      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {productors.length}
            </h2>
          </span>
          <p className="text-center">Productores</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..." />
        <Link className="botonborde w-full text-center basis-1/3" href="/catalogos/productors/new" >Nuevo productor</Link>
      </header>

      <div className="overflow-auto rounded-lg ">
        <table className="w-full">
          <thead className="bg-gray-950 border-b border-gray-800">
            <tr>
              <th className="px-3 text-sm tracking-wide text-left">Nombre</th>
              <th className="px-3 text-sm tracking-wide text-left">Clave</th>
              <th className="px-3 text-sm tracking-wide text-left">eMail</th>
              <th className="px-3 text-sm tracking-wide text-left">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {productors.length <= 0 ? null : productors.map(productor => (
                <ProductorRow productor={productor} key={productor._id} />
            ))}
          </tbody>
        </table>
      </div>
      <ProductorCard open={verProductor} close={() => setVerP(false)} />
    </div>
  )
}
