'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
export default function NuevoProductor() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [newProducer, setNewProducer] = useState({
        nombre: "",
        clave: "",
        email: ""
    })
    useEffect(()=>{
        if(session){
            setNewProducer({...newProducer, database:session.user.database})
        }
    },[session])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        if(e.target.name==="nombre" || e.target.name==="clave"){
            let uppercased = e.target.value.toUpperCase()
            return setNewProducer({ ...newProducer, [e.target.name]: uppercased });
        }
        setNewProducer({ ...newProducer, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await createProducer()
    }
    const createProducer = async ()=>{
        try {
            const res = await axios.post("/api/productor/", newProducer)               
            toast.success("Guardado 👍")
            router.push("/catalogos/productors");
            router.refresh();
            
        } catch (error) {
            setIsSubmitting(false)
            toast.error(error.message)
        }
    }
    return (
        <section className='sectionbasic'>
            <form onSubmit={handleSubmit} className='form'>
                <h1 className="titulo">+Nuevo Productor</h1>
                {isSubmitting? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                <>
                    <input name="database" value={newProducer.database} onChange={handleChange} hidden />
                    <input
                        name="nombre"
                        type='text'
                        className="bg-gray-800 border-1 w-full p-3 rounded-lg my-4"
                        placeholder='Mario Campos'
                        value={newProducer.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="clave"
                        type='text' 
                        placeholder='MC' 
                        className="inputbasico"
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='email' 
                        placeholder='mariocamps@mail.com' 
                        name="email"
                        className="bg-gray-800 border-1 w-full p-3 rounded-lg my-4"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="botonform">Guardar</button>
                </>
                }
            </form>
        </section>
    )
}
