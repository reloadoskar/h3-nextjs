'use client'
import { toast } from 'sonner'
import { useInventario } from './InventarioContext'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useUbicacions } from '../catalogos/ubicaciones/UbicacionsContext'
import Switch from '@/components/Switch'
import CompraItemInventario from '../compras/[id]/compraitem/CompraItemInventario'

export default function Inventario() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const { ubicacions, setUbicacions, loadUbicacions } = useUbicacions()
  const { inventario, filtros, setFiltros, setInventario, loadInventarioGlobal, 
    inventarioFiltrado, } = useInventario()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      // console.log(user)
      // resetItems()
      return setUser(session.user)
    }
    return setUser(null)
  }, [session])

  useEffect(() => {
    setLoading(true)
    if (user) {
      loadInventarioGlobal(user.database)
        .then((res) => {
          // console.log(res)
          setInventario(res.data.inventario)
        })
        .catch(err => console.log(err))

      loadUbicacions(user.database).then((res) => {
        setUbicacions(res.data)
        setLoading(false)
      })
        .catch(err => console.log(err))
    }
    return setInventario([])
  }, [user, loadInventarioGlobal, loadUbicacions])

  return (
    <main className='p-6 w-full flex flex-col gap-4'>

      <section className='flex bg-gray-700 p-6 border-b border-gray-500 gap-4'>
        <div className='basis-1/4 flex flex-col'>
          <label htmlFor='ubicacion'>Selecciona ubicacion</label>
          <select id="ubicacion"
            className='inputbasico mt-0'
            value={filtros.ubicacion}
            onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
          >
            <option>TODO</option>
            {ubicacions.map(ub => (
              <option key={ub._id} value={ub._id}>{ub.nombre}</option>
            ))}
          </select>
        </div>
        <div className='basis-1/4 flex flex-col'>
          <label htmlFor='producto'>Selecciona producto</label>
          <select id="producto"
            className='inputbasico mt-0'
            value={filtros.producto}
            onChange={(e) => setFiltros({ ...filtros, producto: e.target.value })}
          >
            <option>TODO</option>
          </select>
        </div>
        <div className='basis-1/4 flex flex-col'>
          <label htmlFor='clasificacion'>Selecciona clasificación</label>
          <select id="clasificacion"
            className='inputbasico mt-0'
            value={filtros.clasificacion}
            onChange={(e) => setFiltros({ ...filtros, clasificacion: e.target.value })}
          >
            <option value="TODO">TODO</option>
            <option value="S/C">SIN CLASIFICAR</option>
            <option value="LINEA">LINEA</option>
            <option value="MAYOREO">MAYOREO</option>
            <option value="MENUDEO">MENUDEO</option>
            <option value="CASCADO">CASCADO</option>
          </select>
        </div>

        <div className="basis-1/4 flex flex-col items-center align-baseline my-auto">
          <label>Mostrar terminados</label>
          <Switch value={filtros.mostrarTerminados} action={()=>setFiltros({ ...filtros, mostrarTerminados: !filtros.mostrarTerminados}) } />
        </div>
      </section>

      <section className='flex flex-col gap-4 p-6'>
        {ubicacions.sort((a, b) => a.nombre < b.nombre ? -1 : 1).map(ub => {
          let invub = inventarioFiltrado[ub._id] || null
          if (invub) {
            return (
              <div key={ub._id} >
                <div className="border-b border-gray-500">
                  <h2 className="text-xl font-extrabold border-b border-gray-500 ">{ub.nombre}</h2>
                  {
                    invub.map(item => (
                      <CompraItemInventario key={item._id} itm={item} ubicacions={ubicacions} />
                    ))

                  }
                </div>
              </div>
            )
          }
        })}
      </section>

    </main>
  )
}
