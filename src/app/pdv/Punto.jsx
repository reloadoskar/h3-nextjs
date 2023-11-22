'use client'
import { useState, useEffect } from 'react'
import Reloj from '@/utils/Reloj'
import moment from 'moment'
import axios from 'axios'
import PdvInventario from './PdvInventario'

import Loading from '../loading'
import { usePdv } from './PdvContext'
import Nota from './Nota'
import { Settings } from 'lucide-react'
import Configuracion from './Configuracion'
export default function Punto({ user, ubicacions }) {
  const { ubicacion, fecha, inventario, setInventario, setClientes } = usePdv()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (user && ubicacion) {
      axios.post('/api/inventario/ubicacion', { database: user.database, ubicacion: ubicacion })
        .then((res) => {
          setLoading(false)
          setInventario(res.data.inventario)
        })
        .catch(err => console.log(err))

      axios.get('/api/cliente/ubicacion/' + ubicacion._id)
        .then(res => {
          return setClientes(res.data.clientes)
        })
    }
    setLoading(false)
    return setInventario([])
  }, [user, ubicacion])

  if (isLoading) return <Loading />
  if (!inventario) return <p>No profile data</p>
  return (

    <main className=''>

      <section className='flex bg-gray-950 text-gray-400 px-6 border-b border-gray-500'>
        <div className="basis-1/3">
          <span className='text-2xl'>
            {moment(fecha).format("dddd DD MMM YYYY")}
          </span>
        </div>
        <div className="basis-1/3 flex justify-center">
          <Reloj />
        </div>
        <div className="basis-1/3 flex justify-end items-center gap-2">
          <span className='text-2xl text-right'>
            {ubicacion?.nombre}
          </span>
          
            <input type="checkbox" id="menu" className="peer hidden" />
            <label htmlFor="menu" className="bg-open-menu w-6 h-4 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50">
              {/* <Settings /> */} 
            </label>
            <Configuracion ubicacions={ubicacions} />
          
        </div>
      </section>

      <PdvInventario />

      <Nota />
    </main>

  )
}
