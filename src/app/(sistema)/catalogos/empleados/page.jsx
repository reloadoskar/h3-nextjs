
import { adminConnection } from "@/utils/adminConnection";
import User from "@/models/user";
import EmpleadoRow from "./EmpleadoRow";
import Link from "next/link";
import { toast } from "sonner";

export async function loadEmpleados(userDb) {
  try {
    await adminConnection(userDb);
    const empleados = await User.find();
    return empleados;
  } catch (error) {
    return error
  }
}

export default async function Empleados() {

  const empleados = await loadEmpleados().catch(err=>{
    toast(err.message)
  })
  return (
    <div className="contenedor">
      <header className="flex justify-between p-4 mt-5 items-center gap-2">
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

