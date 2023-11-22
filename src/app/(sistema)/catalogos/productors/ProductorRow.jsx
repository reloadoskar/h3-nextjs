import React from 'react'

export default function ProductorRow({ productor }) {
    return (
        <div className='flex flex-row gap-2 justify-between items-center mx-auto'>
            <span className='basis-1/4'>{productor.nombre}</span>
            <span className='basis-1/4'>{productor.clave}</span>
            <span className='basis-1/4'>{productor.email}</span>
            <span className='basis-1/4'>{productor.tel1}</span>
        </div>
    )
}
