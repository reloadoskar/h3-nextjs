'use client'
import { useEffect, useState } from "react";
import Punto from "./Punto";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { useVentas } from "./VentaContext";
import { usePdv } from "./PdvContext";
import moment from "moment";
import { useUbicacions } from "../(sistema)/catalogos/ubicaciones/UbicacionsContext";

export default function Pdv() {
  const { resetItems } = useVentas()
  const { database, setDatabase, setUbicacion, setFecha } = usePdv()
  const { ubicacions, loadUbicacions, setUbicacions } = useUbicacions([])
  const { data: session, status } = useSession()
  const [user, setUser] = useState(false)
  const [isLoading, setLoading] = useState(false)
  let fecha = moment().format("YYYY-MM-DD")

  useEffect(() => {
    if (status==="authenticated") {
      // console.log(status)
      // console.log(session.user)
      // setDatabase(session.user.database)
      // setUbicacion(session.user.ubicacion)
      // setFecha(fecha)
      return setUser(session.user)
    }
    return setUser(false)
  }, [session, status])

  useEffect(()=>{
    if(user){
      setDatabase(user.database)
      setFecha(fecha)
      setUbicacion(user.ubicacion || ubicacions[0])
    }
  },[user])

  useEffect(() => {
    setLoading(true)
    if (database) {
      loadUbicacions(database)
        .then((res) => {
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
    return setUbicacions([])
  }, [database, loadUbicacions])


  // let ubicacionUser = user.ubicacion || ubicacions[0]
  // console.log(ubicacionUser)

  return !user ? <Loading /> :
    <Punto user={user} ubicacions={ubicacions} />
}
