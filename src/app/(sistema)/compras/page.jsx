'use client'
import { useSession } from "next-auth/react";
import InfoCompras from "./InfoCompras";
import ListaCompras from "./ListaCompras";
import MenuCompras from "./MenuCompras";
// import { loadCompras} from '@/utils/loaders'
// import moment from "moment/moment";
import { useCompras } from "./ComprasContext";
import { useState, useEffect } from "react";

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function Compras() {
  // const session = await getServerSession(authOptions)
  const [user, setUser] = useState(false)
  const { data: session, status } = useSession()
  const {compras, mesAnio, loadCompras} = useCompras()
  // const mesAnio = moment().format("YYYY-MM")
  useEffect(() => {
    if (session) {
      return setUser(session.user)
    }
    return setUser(false)
  }, [session])

  useEffect(()=>{
    if(user){
      // console.log(user.database)
      try {
        const res = loadCompras(user.database, mesAnio)
        // console.log(res)
        if(res){
          // compras = JSON.parse(res)
        }
        
      } catch (error) {
        console.log(error) //ARREGLAR EL AVISO AL USUARIO DE QUE NO SE PUDIERON CARGAR LAS COMPRAS
      }
    }

  },[user, mesAnio])

  return (
    <div className='contenedor'>
      <section>
        <MenuCompras />
      </section>
      <section className="mb-6 mt-6">
        <InfoCompras compras={compras} />
      </section>
      <section className="mbt-6">
        <ListaCompras compras={compras} />
      </section>
    </div>
  )
}