'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { numeroFormateado } from '@/utils/tools'
import { useState } from 'react'
import CompraItemEditable from './CompraItemEditable'
export default function CompraItem(props) {
    const { item } = props
    const [editMode, setEditMode] = useState(false)
    return !item ? null :
        !editMode ?

            <div className='flex flex-row cursor-pointer hover:bg-gray-500 px-2 transition duration-700 ease-in-out' onClick={() => setEditMode(true)}>
                <p className='basis-2/6 break-inside-avoid-column'>{item.producto?.descripcion}</p>
                <p className='basis-1/6 text-right'>{item.empaques}</p>
                <p className='basis-1/6 text-right'>{item.cantidad}</p>
                <p className='basis-1/6 text-right'>{numeroFormateado(item.precio)}</p>
                <p className='basis-1/6 text-right'>{numeroFormateado(item.importe)}</p>
            </div> 
            
            :
            <CompraItemEditable item={item} close={()=>setEditMode(false)} {...props}/>

}
