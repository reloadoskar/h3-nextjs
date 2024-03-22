'use client'
import { useEffect, useState } from 'react'
import Platos from './Platos'
import CrearPlato from './CrearPlato'
import { useMenu } from './MenuContext'
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useCategorias } from './CategoriasContext'
import { useSubcategorias } from './SubcategoriasContext'
import Buscador from './Buscador'

export default function Menu() {
  const { data: session, status } = useSession();
  const [database, setDatabase] = useState(null)
  const { menu, loadMenu } = useMenu()
  const { categorias, loadCategorias } = useCategorias()
  const { loadSubcategorias } = useSubcategorias()
  useEffect(() => {
    if (session) {
      return setDatabase(session.user.database)
    }
    return setDatabase(null)
  }, [session])

  useEffect(() => {
    if (database) {

      const loadAll = async () => {
        const res = await Promise.all([
            loadMenu(database),
            loadCategorias(database),
            loadSubcategorias(database)
        ])
        return res
    }
        loadAll()
    }
  }, [database])
  return (
    <div className='p-6 w-full flex flex-col gap-4'>
      <CrearPlato database={database} />
      <Buscador />
      <Platos platos={menu} />
    </div>
  )
}
