import { Folder } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Catalogos() {
  return (
    <section className='p-12 mx-auto'>
      <nav className='flex flex-col gap-6 text-center'>
        <Link className='botonborde px-16 flex gap-4' href="/catalogos/productors" ><Folder /> Productores</Link>
        <Link className='botonborde px-16 flex gap-4' href="/catalogos/productos" ><Folder /> Productos</Link>
        <Link className='botonborde px-16 flex gap-4' href="/catalogos/clientes" ><Folder /> Clientes</Link>
        <Link className='botonborde px-16 flex gap-4' href="/catalogos/empleados" ><Folder /> Empleados</Link>
        <Link className='botonborde px-16 flex gap-4' href="/catalogos/ubicaciones" ><Folder /> Ubicaciones</Link>
      </nav>
    </section>

  )
}
