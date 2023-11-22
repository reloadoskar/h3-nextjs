'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Punto from "./Punto";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { useVentas } from "./VentaContext";
import { usePdv } from "./PdvContext";
import moment from "moment";

export default function Pdv() {
  const { resetItems } = useVentas()
  const { setDatabase, setUbicacion, setFecha } = usePdv()
  const { data: session, status } = useSession()
  const [user, setUser] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [ubicacions, setUbicacions] = useState([])
  let fecha = moment().format("YYYY-MM-DD")

  useEffect(() => {
    if (session) {
      // console.log(user)
      resetItems()
      return setUser(session.user)
    }
    return setUser(false)
  }, [session])

  useEffect(() => {
    setLoading(true)
    if (user) {
      axios.post('/api/ubicacion/s', { database: user.database })
        .then((res) => {
          setUbicacions(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
    return setUbicacions([])
  }, [user])

  useEffect(() => {
    if (ubicacions) {
      setDatabase(user.database)
      setUbicacion(user.ubicacion || ubicacions[0])
      setFecha(fecha)
    }
  }, [ubicacions])

if (status === "loading") {
  return <Loading />
}

// let ubicacionUser = user.ubicacion || ubicacions[0]
// console.log(ubicacionUser)

return !user ? <Loading /> :
  <Punto user={user} ubicacions={ubicacions} />
}
