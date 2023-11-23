import Link from "next/link";
import { useCompras } from "./ComprasContext";

export default function MenuCompras() {
  const {mesAnio, setMesAnio} = useCompras()
  return (
    <div className="flex mx-auto gap-3">
      <input className="basis-1/3 rounded-md p-2 text-black" type="month" value={mesAnio} onChange={(e)=>setMesAnio(e.target.value)}/>
      <Link href="/compras/new" className="basis-1/3 botonborde">
        +Nueva compra
      </Link>
      <input className="basis-1/3 rounded-md" placeholder='buscar...' type="text" />
    </div>
  )
}
