import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { Trash2 } from 'lucide-react';
export default function CompraItemEditable({item, close, productos}) {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [cambios, setCambios] = useState(false)
    const [itemEditable, setItemEditable] = useState(item)

    useEffect(() => {
        if (session) {
            setItemEditable({ ...itemEditable, database: session.user.database })
        }
    }, [session])

    const handleChange = (e) => {
        setCambios(true)
        if (e.target.name === "cantidad") {
            let importe = item.precio * e.target.value
            return setItemEditable({ ...itemEditable, cantidad: e.target.value, importe: importe })
        }
        if (e.target.name === "precio") {
            let importe = item.cantidad * e.target.value
            return setItemEditable({ ...itemEditable, precio: e.target.value, importe: importe })
        }
        setItemEditable({ ...itemEditable, [e.target.name]: e.target.value });
    }

    const guardarCambios = async ()=>{
        toast.message("Guardando cambios")
        try {
            // console.log(itemEditable)
            const res = await axios.put("/api/compraitem/", itemEditable)
            toast.success("Actualizado 👍")
            router.push("/compras/" + item.compra);
            router.refresh();
            close()
        } catch (error) {
            toast.error(error)
        }
    }

    const handleTrash =  () =>{
        toast("¿Está seguro de eliminar el item?",{
            position:"bottom-center",
            duration: 10000,
            action: {
                label: "Si",
                onClick: async (e)=>{
                    // e.preventDefault()
                    await eliminarItem()
                }
            },
            cancel:{
                label: "No",
                onClick: ()=>close()
            }
        })
    }

    const eliminarItem = async () =>{
        try {
            let res = await axios.delete("/api/compraitem/", { data: itemEditable })
            .then(()=>{
                toast.success("Eliminado correctamente. 👍")
                close()
                router.push("/compras/" + item.compra);
                router.refresh();
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-gray-800">
            <div className='flex flex-row'>
                <div className='basis-2/6 p-2'>
                    <select name="producto" 
                        className='inputbasico' 
                        value={itemEditable.producto?.descripcion}
                        onChange={handleChange}
                    >
                        <option>{itemEditable.producto.descripcion}</option>
                        {productos?.sort((a,b)=>a.descripcion < b.descripcion ? -1 : 1).map(producto=>(
                            <option key={producto._id} value={producto._id}>{producto.descripcion}</option>
                        ))}
                    </select>
                </div>
                <div className='basis-1/6 p-2'>
                    <input name="empaques" 
                        type="number"
                        className='inputbasico' 
                        value={itemEditable.empaques} 
                        onChange={handleChange}
                    />
                </div>
                <div className='basis-1/6 p-2'>
                    <input name="cantidad" 
                        type="number"
                        className='inputbasico'
                        value={itemEditable.cantidad} 
                        onChange={handleChange}
                    />
                </div>
                <div className='basis-1/6 p-2'>
                    <input name="precio" 
                        type="number"
                        className='inputbasico' 
                        value={itemEditable.precio} 
                        onChange={handleChange}
                    />
                </div>
                <div className='basis-1/6 p-2'>
                    <input name="importe" 
                        readOnly
                        className='inputbasico' 
                        value={itemEditable.importe} 
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='flex flex-row justify-center gap-2'>
                <button className='' onClick={handleTrash}><Trash2 /></button>
                <button className='botonrojo' onClick={close}>salir</button>
                {!cambios ? null :
                    <button className="botonverde" onClick={guardarCambios}>guardar</button>
                }
            </div>
        </div>
    )
}
