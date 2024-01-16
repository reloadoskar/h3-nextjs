import ModalDialog from '@/components/ModalDialog'
import { useClientes } from './ClientesContext'
import { useUbicacions } from '../ubicaciones/UbicacionsContext'
import { toast } from 'sonner'

export default function ClienteEditable({ open, database }) {
    const { cliente, setVerCliente, setCliente, updateCliente } = useClientes()
    const { ubicacions } = useUbicacions()
    const handleClose = () => {
        setVerCliente(false)
        setCliente(null)
    }
    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCliente(database, cliente).then(res=>{
            toast.success("Actualizado correctamente")
            handleClose()
        }).catch(()=>{
            toast.error("Algo salió mal")
        })
    }
    return !cliente ? null :
        <ModalDialog open={open} close={handleClose}>
            <form className='form mx-2 md:mx-24 w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold'>Nombre</label>
                    <input name="nombre" className='inputbasico mt-0' value={cliente.nombre} onChange={handleChange} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold'>Teléfono</label>
                    <input name="telefono" className='inputbasico mt-0' value={cliente.tel1} onChange={handleChange} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold'>email</label>
                    <input name="email" className='inputbasico mt-0' value={cliente.email} onChange={handleChange} />
                </div>
                <div>
                    <label className='text-sm font-bold'>clave</label>
                    <input name="clave" className='inputbasico mt-0' value={cliente.clave} onChange={handleChange} />
                </div>
                <div>
                    <label className='text-sm font-bold'>ubicacion</label>
                    <select name="ubicacion" className='inputbasico mt-0' value={cliente.ubicacion} onChange={handleChange} >
                        <option>{cliente.ubicacion?.nombre}</option>
                        {ubicacions.map(ub => (
                            <option value={ub._id} key={ub._id}>{ub.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='text-sm font-bold'>Dias de crédito</label>
                    <input name="dias_de_credito" type="number" className='inputbasico mt-0' value={cliente.dias_de_credito} onChange={handleChange} />
                </div>
                <div>
                    <label className='text-sm font-bold'>Límite de crédito</label>
                    <input name="limite_de_credito" type="number" className='inputbasico mt-0' value={cliente.limite_de_credito} onChange={handleChange} />
                </div>
                <div>
                    <label className='text-sm font-bold'>Crédito disponible</label>
                    <input name="credito_disponible" type="number" className='inputbasico mt-0' value={cliente.credito_disponible} onChange={handleChange} />
                </div>
                <div className='flex justify-center gap-2'>
                    <button type="button" className='botonrojo' onClick={handleClose}>salir</button>
                    <button type="submit" className='botonverde'>Guardar</button>
                </div>
            </form>
        </ModalDialog>
}
