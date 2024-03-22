import React from 'react'
import { useCategorias } from './CategoriasContext'

export default function Buscador() {
    const {categorias} = useCategorias()
  return (
    <div className='inputbasico flex gap-2'>
        <input type="text" className="w-full bg-transparent focus:border-none focus:outline-none" placeholder='buscar...'  />
        <select name="categoria" className="bg-transparent focus:outline-none">
          {categorias.length>0?
          categorias.map(categoria=>(
            <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
          ))
          :null}
        </select>
      </div>
  )
}
