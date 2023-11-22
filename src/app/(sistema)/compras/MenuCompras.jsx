import Link from "next/link";
import { useCompras } from "./ComprasContext";

export default function MenuCompras() {
  const {mesAnio, setMesAnio} = useCompras()
  return (
    <div className="contenedor flex mx-auto gap-3 p-4 justify-between">
      <input className="rounded-md p-2 text-black" type="month" value={mesAnio} onChange={(e)=>setMesAnio(e.target.value)}/>
      <Link href="/compras/new" className="botonborde">
        +Nueva compra
      </Link>
      <input className="rounded-md p-2" placeholder='buscar...' type="text" />
    </div>
  )
}
