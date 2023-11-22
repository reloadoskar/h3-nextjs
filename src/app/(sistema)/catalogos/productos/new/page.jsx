'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
export default function NuevoProducto() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProducto, setNewProducto] = useState({
        descripcion: "",
        clave: "",
        costo: 0,
        precio1: 0
    })
    useEffect(() => {
        if (session) {
            setNewProducto({ ...newProducto, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {
        if(e.target.name==="descripcion" || e.target.name==="clave" ){
            let uppercased = e.target.value.toUpperCase()
            return setNewProducto({ ...newProducto, [e.target.name]: uppercased });
        }else{}
        setNewProducto({ ...newProducto, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await createProducto()
    }
    const createProducto = async () => {
        try {
            const res = await axios.post("/api/producto/", newProducto)
            toast.success("Guardado 👍")
            router.push("/catalogos/productos");
            router.refresh();

        } catch (error) {
            // setIsSubmitting(false)
            toast.error(error.message)
        }
    }
    return (
        <section className="sectionbasic">
            <form onSubmit={handleSubmit} className="form">
            <h1 className="titulo">+Nuevo Producto</h1>
                {isSubmitting ? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                    <>
                        <input
                            name="descripcion"
                            type="text"
                            placeholder="JITOMATE SALADETTE XL"
                            className="inputbasico"
                            value={newProducto.descripcion}
                            onChange={handleChange}
                            required
                        />
                        <input name="clave"
                            type="text"
                            placeholder="SLD-XL"
                            className="inputbasico"
                            value={newProducto.clave}
                            onChange={handleChange}
                            required
                        />
                        <input name="costo"
                            type="number"
                            placeholder="100"
                            className="inputbasico"
                            value={newProducto.costo}
                            onChange={handleChange}
                            required
                        />
                        <input name="precio1"
                            type="number"
                            placeholder="150"
                            className="inputbasico"
                            value={newProducto.precio1}
                            onChange={handleChange}
                            required
                        />

                        <button className="botonform" >Guardar</button>

                    </>
                }
            </form>
        </section>
    )
}
