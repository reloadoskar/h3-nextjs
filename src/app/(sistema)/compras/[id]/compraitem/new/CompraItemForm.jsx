'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import axios from 'axios';
export default function CompraItemForm({ productos, compra, ubicacions }) {
    const { data: session, status } = useSession()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [item, setItem] = useState({ producto: "", precio: 0, compra: compra, clasificacion: "S/C" })
    useEffect(() => {
        if (session) {
            setItem({ ...item, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {

        if (e.target.name === "cantidad") {
            let importe = item.precio * e.target.value
            return setItem({ ...item, cantidad: e.target.value, importe: importe })
        }
        if (e.target.name === "precio") {
            let importe = item.cantidad * e.target.value
            return setItem({ ...item, precio: e.target.value, importe: importe })
        }
        setItem({ ...item, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await crearCompraItem()
    }
    const crearCompraItem = async () => {
        try {
            const res = await axios.post("/api/compraitem/", item)
            // console.log(res)
            toast.success("Guardado 👍")
            router.push("/compras/" + compra);
            router.refresh();
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <form className='p-12' onSubmit={handleSubmit}>
            <h1 className='titulo'>+Agregar producto</h1>
            {isSubmitting ? <h2 className='subtitulo'>...guardando...</h2> :
                <>
                    <label>Selecciona un producto</label>
                    <select name="producto"
                        className="inputbasico"
                        value={item.producto}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--</option>
                        {productos.length === 0 ? null :
                            productos.map(producto => (
                                <option key={producto._id} value={producto._id}>{producto.descripcion}</option>
                            ))
                        }
                    </select>
                    <select name="ubicacion"
                        className="inputbasico"
                        id="ubicacion"
                        placeholder="Selecciona una ubicación"
                        value={item.ubicacion}
                        onChange={handleChange}
                    >
                        <option>--</option>
                        {ubicacions.length > 0 ?
                            ubicacions.map((ubicacion) => (
                                <option key={ubicacion._id} value={ubicacion._id} >{ubicacion.nombre}</option>
                            )) :
                            null
                        }
                    </select>
                    {!item.producto ? null :
                        <>
                            <label htmlFor='empaques'>Empaques</label>
                            <input name="empaques" id="empaques"
                                className="inputbasico"
                                type='number'
                                value={item.empaques}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='cantidad'>Cantidad</label>
                            <input name="cantidad" id="cantidad"
                                className="inputbasico"
                                type='number'
                                value={item.cantidad}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='precio'>Precio</label>
                            <input name="precio" id="precio"
                                className="inputbasico"
                                type='number'
                                value={item.precio}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='importe'>Importe</label>
                            <input name="importe" id="importe" readOnly
                                className="inputbasico"
                                type='number'
                                value={item.importe}
                            // onChange={handleChange}
                            />
                            <button className='botonform'>Guardar</button>
                        </>
                    }
                </>
            }
        </form>
    )
}
