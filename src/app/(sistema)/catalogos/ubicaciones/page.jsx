
import { adminConnection } from "@/utils/adminConnection";
import Ubicacion from "@/models/ubicacion";
import UbicacionRow from "./UbicacionRow";
import Link from "next/link";
import { toast } from "sonner";

export async function loadUbicacions(userDb) {
  try {
    await adminConnection(userDb);
    const ubicacions = await Ubicacion.find();
    return ubicacions;
  } catch (error) {
    return error
  }
}

export default async function Ubicacions() {

  const ubicacions = await loadUbicacions().catch(err=>{
    toast(err.message)
  })
  return (
    <div className="contenedor">
      <header className="flex justify-between p-4 mt-5 items-center gap-2">
      <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {ubicacions.length}
            </h2>
          </span>
          <p className="text-center">Ubicaciones</p>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..."/>
        <Link className="boton basis-1/3" href="/catalogos/ubicaciones/new" >+Crear Ubicacion</Link>
      </header>

      {ubicacions.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron ubicaciones</h2>: ubicacions.map(ubicacion=>(
        <UbicacionRow ubicacion={ubicacion} key={ubicacion._id} />
      ))}
    </div>
  )
}

