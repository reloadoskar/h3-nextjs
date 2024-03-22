import React from 'react'
import Image from 'next/image'
export default function Plato({ plato }) {
  return (
    <div className='odd:bg-gray-800 p-3 md:bg-gray-800'>
      <div className='font-bold text-2xl'>{plato.nombre}</div>
      <div className='font-semibold text-sm text-gray-600'>{plato.categoria}</div>
      <Image src={plato.filepath} alt={plato.nombre} width={300} height={250}
        // style={{ maxWidth: '300px', maxHeight: '300px' }} 
        className='w-full rounded-lg max-h-56 text-center '
      />
      <div>{plato.descripcion}</div>
      <div className='text-right'>$ {plato.precio}</div>
    </div>
  )
}
