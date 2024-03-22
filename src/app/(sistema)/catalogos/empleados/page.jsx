'use client'
import { useEffect, useState } from "react";
import EmpleadoRow from "./EmpleadoRow";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useEmpleados } from "./EmpleadosContext";

export default function Empleados() {
  const { data: session, status } = useSession()
  const [database, setDb] = useState(null)
  const {empleados, loadEmpleados} = useEmpleados()
  useEffect(() => {
    if (status === 'authenticated') {
      return setDb(session.user.database)
    }
    return setDb(null)
  }, [session, status])
  useEffect(()=>{
    if(database){
      loadEmpleados(database)
    }
  },[database, loadEmpleados])
  return (
    <div className="mx-6">
      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
      <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {empleados.length}
            </h2>
          </span>
          <p className="text-center">Empleados</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..."/>
        <Link className="boton basis-1/3" href="/catalogos/empleados/new" >+Crear Empleado</Link>
      </header>

      {empleados.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron empleados</h2>: empleados.map(empleado=>(
        <EmpleadoRow empleado={empleado} key={empleado._id} />
      ))}
    </div>
  )
}

