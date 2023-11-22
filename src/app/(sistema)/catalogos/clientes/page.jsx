
import { adminConnection } from "@/utils/adminConnection";
import Cliente from "@/models/cliente";
import ClienteRow from "./ClienteRow";
import Link from "next/link";
import { toast } from "sonner";

export async function loadClientes(userDb) {
  try {
    await adminConnection(userDb);
    const clientes = await Cliente.find();
    return clientes;
  } catch (error) {
    return error
  }
}

export default async function Clientes() {

  const clientes = await loadClientes().catch(err=>{
    toast(err.message)
  })
  return (
    <div className="contenedor">
      <header className="flex justify-between p-4 mt-5 items-center gap-2">
      <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {clientes.length}
            </h2>
          </span>
          <p className="text-center">Clientes</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..."/>
        <Link className="boton basis-1/3" href="/catalogos/clientes/new" >+Crear Cliente</Link>
      </header>

      {clientes.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron clientes</h2>: clientes.map(cliente=>(
        <ClienteRow cliente={cliente} key={cliente._id} />
      ))}
    </div>
  )
}

