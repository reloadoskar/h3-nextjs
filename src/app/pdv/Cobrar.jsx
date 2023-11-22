import ModalDialog from '@/components/ModalDialog'
import { useVentas } from './VentaContext'
import { usePdv } from './PdvContext'
import { toast } from 'sonner'
import { numeroFormateado } from '@/utils/tools'
import { useState } from 'react'

export default function Cobrar({ open, close }) {
    const { database, ubicacion, fecha, clientes } = usePdv()
    const { crearVenta, cliente, setCliente, tipoPago, setTipoPago, resetItems, importeTotal, efectivo, setEfectivo, cambio, resetVenta, ventaItems, comentario } = useVentas()
    const [guardando, setGuardando] = useState(false)

    const guardarVenta = async (e) => {
        e.preventDefault()
        setGuardando(true)
        let venta = {
            database: database,
            ubicacion: ubicacion,
            cliente: cliente,
            fecha: fecha,
            tipoPago: "CONTADO",
            importe: importeTotal,
            acuenta: importeTotal,
            saldo: 0,
            items: ventaItems,
            comentario: comentario
        }
        await crearVenta(venta).then(res => {
            // console.log(res)
            toast.success("Guardado correctamente 👍")
            resetVenta()
            setModalCobrar(false)
            setGuardando(false)
        }).catch(err => {

        })
    }
    return (
        <ModalDialog open={open}>
            <form onSubmit={guardarVenta} className="bg-slate-500 w-1/3 h-1/3 rounded-lg transition-all">
                {!guardando ?
                    <div >
                            <div className='flex flex-col px-6'>
                                <label htmlFor='cliente'>Cliente</label>
                                <select id="cliente" name="cliente"
                                    className="inputbasico mt-0"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                >
                                    <option value="60247712cc61c80004333be1">PUBLICO EN GENERAL</option>
                                    {clientes.length > 0 ?
                                        clientes.map(cliente => (
                                            <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
                                        ))
                                        : null}
                                </select>
                            </div>
                            {cliente === "60247712cc61c80004333be1" ? null :
                                <div className='flex flex-col px-6'>
                                    <label>Tipo de Pago</label>
                                    <select id="tipoPago" name="tipoPago"
                                        className="inputbasico mt-0"
                                        value={tipoPago}
                                        onChange={(e) => setTipoPago(e.target.value)}
                                    >
                                        <option>CONTADO</option>
                                        <option>CRÉDITO</option>
                                    </select>
                                </div>
                            }
                            <h2 className="text-2xl">${importeTotal}</h2>
                            <div className="flex flex-col px-6">
                                <label htmlFor="efectivo">Efectivo</label>
                                <input id="efectivo"
                                    name="efectivo"
                                    step="any"
                                    autoFocus
                                    required
                                    className="inputbasico mt-0"
                                    type="number"
                                    value={efectivo}
                                    min={importeTotal}
                                    onChange={(e) => setEfectivo(e.target.value)}
                                />

                            </div>
                            <button type="button" className="botonrojo w-full" onClick={() => close()}>salir</button>

                            {cambio >= 0 ?
                                <div>
                                    {cambio > 0 ? <h2>Cambio: { numeroFormateado(cambio)}</h2> : null}
                                    <button type="submit" className="botonverde rounded-none w-full p-4">guardar</button>
                                </div>
                                : null
                            }
                    </div>
                : <h2 className='text-2xl text-center font-bold p-24'>...Guardando...</h2>
                }
            </form>
        </ModalDialog>
    )
}
