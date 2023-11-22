'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
export default function NuevoEmpleado() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newEmpleado, setNewEmpleado] = useState({
        nombre: "",
        email: "",
        tel1: 0,
        sueldo: 0
    })
    useEffect(() => {
        if (session) {
            setNewEmpleado({ ...newEmpleado, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {
        if(e.target.name==="nombre" ){
            let uppercased = e.target.value.toUpperCase()
            return setNewEmpleado({ ...newEmpleado, [e.target.name]: uppercased });
        }else{

            return setNewEmpleado({ ...newEmpleado, [e.target.name]: e.target.value });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await createEmpleado()
    }
    const createEmpleado = async () => {
        try {
            const res = await axios.post("/api/users/", newEmpleado)
            toast.success("Guardado 👍")
            router.push("/catalogos/empleados");
            router.refresh();

        } catch (error) {
            setIsSubmitting(false)
            toast.error(error.message)
        }
    }
    return (
        <section className="sectionbasic">
            <form onSubmit={handleSubmit} className="form">
            <h1 className="titulo">+Nuevo Empleado</h1>
                {isSubmitting ? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                    <>
                        <input name="nombre"
                            type="text"
                            placeholder="ALEXIS LOPEZ"
                            className="inputbasico"
                            value={newEmpleado.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input name="email"
                            type="email"
                            placeholder="suemail@mail.com"
                            className="inputbasico"
                            value={newEmpleado.email}
                            onChange={handleChange}
                        />
                        <input name="telefono"
                            type="text"
                            placeholder="55 -2558 5959"
                            className="inputbasico"
                            value={newEmpleado.telefono}
                            onChange={handleChange}
                            required
                        />
                        <input name="sueldo"
                            type="number"
                            placeholder="150"
                            className="inputbasico"
                            value={newEmpleado.sueldo}
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
