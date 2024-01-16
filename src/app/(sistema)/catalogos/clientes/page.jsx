'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useClientes } from "./ClientesContext";
import { useSession } from "next-auth/react";
import ClienteCreate from "./ClienteCreate";
import ClienteEditable from "./ClienteEditable";
import { useUbicacions } from "../ubicaciones/UbicacionsContext";
import ClientesList from "./ClientesList";

export default function Clientes() {
  const { data: session, status } = useSession()
  const [database, setDb] = useState(null)
  const { clientes, cliente, loadClientes, verCliente } = useClientes()
  const { loadUbicacions } = useUbicacions()
  const [dialogCrear, setDialogCrear] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      return setDb(session.user.database)
    }
    return setDb(null)
  }, [session, status])

  useEffect(() => {
    if (database) {
      loadClientes(database)
        .catch(err => {
          toast(err.data.message)
        })
      loadUbicacions(database).catch(err => toast.error("ocurrió un error"))
    }
  }, [database, loadClientes, loadUbicacions])



  return (
    <div className="contenedor mx-4 w-full">
      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {clientes.length}
            </h2>
          </span>
          <p className="text-center">Clientes</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..." />
        <button className="boton basis-1/3" onClick={() => setDialogCrear(true)} >+Crear Cliente</button>
        <ClienteCreate open={dialogCrear} close={() => setDialogCrear(false)} db={database} />
      </header>

      {clientes.length <= 0 ? 
        <h2 className="text-bold text-xl text-center">No se encontraron clientes</h2> 
        : 

        <ClientesList clientes={clientes} />  
      }

      <ClienteEditable cliente={cliente} open={verCliente} database={database} />
    </div>
  )
}

