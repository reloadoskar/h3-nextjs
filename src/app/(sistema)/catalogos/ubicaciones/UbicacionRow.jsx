import React from 'react'

export default function UbicacionRow({ubicacion}) {
  return (
    <div className='flex flex-row justify-between'>
        <div>{ubicacion.nombre}</div>
        <div>{ubicacion.tipo}</div>
        <div>{ubicacion.direccion}</div>
        <div>{ubicacion.telefono}</div>
    </div>
  )
}
