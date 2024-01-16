import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import ModalDialog from '@/components/ModalDialog';
import { toast } from 'sonner';
import { useClientes } from './ClientesContext';
export default function ClienteCreate({db, open, close}) {
    const { data: session, status } = useSession();
    const {createCliente} = useClientes()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCliente, setNewCliente] = useState({
        nombre: "",
        email: "",
        tel1: "",
    })
    useEffect(() => {
        if (session) {
            setNewCliente({ ...newCliente, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {
        if (e.target.name === "nombre") {
            let uppercased = e.target.value.toUpperCase()
            return setNewCliente({ ...newCliente, [e.target.name]: uppercased });
        }
        setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await createCliente(db, newCliente).then(res=>{
            toast(res.data.message)
            setIsSubmitting(false)
        }).catch(()=>{
            toast.error("Algo salió mal.")
            setIsSubmitting(false)
        })
    }

    return (
        <ModalDialog open={open} close={close}>
            <form onSubmit={handleSubmit} className="form mx-auto">
                <h1 className="titulo">+Nuevo Cliente</h1>
                {isSubmitting ? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                    <>
                        <input
                            name="nombre"
                            type="text"
                            placeholder="Cliente Nuevo"
                            className="inputbasico"
                            value={newCliente.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input name="email"
                            type="email"
                            placeholder="mail@cliente.com"
                            className="inputbasico"
                            value={newCliente.email}
                            onChange={handleChange}
                            required
                        />
                        <input name="tel1"
                            type="text"
                            placeholder="55 5555-5555"
                            className="inputbasico"
                            value={newCliente.tel1}
                            onChange={handleChange}
                            required
                        />

                        <button className="botonform" >Guardar</button>

                    </>
                }
            </form>
        </ModalDialog>
    )
}
