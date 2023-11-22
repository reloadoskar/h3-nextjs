import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";

const clasificacions = [
    { _id: 1, nombre: "LINEA" },
    { _id: 2, nombre: "MAYOREO" },
    { _id: 3, nombre: "MENUDEO" },
    { _id: 4, nombre: "CASCADO" },
]

export default function CompraItemInventario(props) {
    const { itm, ubicacions } = props
    const initMov = {
        fecha: moment().format("YYYY-MM-DD"),
        origen: itm.ubicacion,
        item: { _id: itm._id, producto: itm.producto, empaques: itm.empaques, cantidad: itm.cantidad, compra: itm.compra },
        empaques: 0,
        cantidad: 0,
        comentario: ""
    }
    const { data: session, status } = useSession()
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [movimientoMode, setMovimientoMode] = useState(false)
    const [cambios, setCambios] = useState(false)
    const [itemEditable, setItemEditable] = useState(itm)
    const [nuevoMovimiento, setNuevoMovimiento] = useState(initMov)
    const router = useRouter();
    const menuRef = useRef(itm._id)

    useEffect(() => {
        if (session) {
            setItemEditable({ ...itemEditable, database: session.user.database })
            setNuevoMovimiento({ ...nuevoMovimiento, database: session.user.database })
        }
    }, [session])

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    const closeEditMode = () => {
        setEditMode(false)
    }

    const openMovimientoMode = () => {
        console.log("abriendo modo movimiemto")
        setMovimientoMode(true)
    }
    const closeMovimientoMode = () => {
        setNuevoMovimiento(initMov)
        setMovimientoMode(false)
    }

    const handleItemChange = (e) => {
        setCambios(true)
        setItemEditable({ ...itemEditable, [e.target.name]: e.target.value })
    }

    const handleMovChange = (e) => {
        setCambios(true)
        if (e.target.name === "destino") {
            return setNuevoMovimiento({ ...nuevoMovimiento, destino: ubicacions.filter(ub => ub._id === e.target.value)[0] })
        }
        if (e.target.name === "empaques" || e.target.name === "cantidad") {
            return setNuevoMovimiento({ ...nuevoMovimiento, [e.target.name]: parseInt(e.target.value) })
        }
        return setNuevoMovimiento({ ...nuevoMovimiento, [e.target.name]: e.target.value })
    }

    const guardarCambios = async () => {
        toast.message("Guardando cambios")
        try {
            // console.log(itemEditable)
            const res = await axios.put("/api/compraitem/", itemEditable)
            toast.success("Actualizado 👍")
            router.push("/compras/" + itm.compra);
            router.refresh();
            setEditMode(false)
            setCambios(false)
        } catch (error) {
            toast.error(error)
        }
    }

    const guardarMovimiento = async (e) => {
        e.preventDefault()
        // console.log(nuevoMovimiento)
        toast.message("Guardando movimiento")
        try {
            await axios.post("/api/compraitem/movimiento/", nuevoMovimiento)
                .then(res => {                    
                    toast.success(res.data.message)
                    closeMovimientoMode()
                    setCambios(false)
                    router.refresh();
                })
                .catch(err => {
                    toast.error(err.message)
                })
        } catch (error) {
            console.log(error)
        }

    }
    return editMode ?
        <div className="bg-gray-800">
            <div className="flex flex-row items-center  px-2">
                <div className="basis-2/4">{itm.producto.descripcion}</div>
                <div className="basis-1/4">
                    <input name="empaques"
                        type="number"
                        className="inputmini"
                        value={itemEditable.empaques}
                        onChange={handleItemChange}
                    />
                </div>
                <div className="basis-1/4">
                    <input name="cantidad"
                        type="number"
                        className="inputmini"
                        value={itemEditable.cantidad}
                        onChange={handleItemChange}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-2">
                <button className='botonrojo' onClick={() => setEditMode(false)}>salir</button>
                {!cambios ? null :
                    <button className="botonverde" onClick={guardarCambios}>guardar</button>
                }
            </div>
        </div>
        :
        <div>
            <div
                ref={menuRef}
                className="flex flex-row px-2 hover:cursor-pointer hover:bg-gray-500 transition duration-700 ease-in-out"
                onClick={() => { setOpen(!open) }}
            >
                <div className="basis-2/4">{itm.producto.descripcion}-{itm.clasificacion}</div>
                <div className="basis-1/4 text-right">{itm.empaquesStock.toFixed(1)}</div>
                <div className="basis-1/4 text-right">{itm.stock.toFixed(2)}</div>
                <MenuItem open={open} closeEditMode={closeEditMode} openEditMode={() => setEditMode(true)} openMovimientoMode={openMovimientoMode} {...props}/>
            </div>
            {!movimientoMode ? null :
                <div className="flex flex-col bg-gray-700 border border-gray-500 p-4">
                    <form onSubmit={guardarMovimiento}>


                        <h2 className="text-center font-semibold">+ NUEVO MOVIMIENTO</h2>
                        <div className="flex flex-col">
                            <label htmlFor="destino">Destino</label>
                            <select id="destino"
                                className="inputbasico my-0 mb-2"
                                name="destino"
                                value={nuevoMovimiento.destino}
                                onChange={handleMovChange}
                            >
                                <option>{nuevoMovimiento.destino?.nombre}</option>
                                {ubicacions.map(ub => (
                                    <option key={ub._id} value={ub._id}>{ub.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="clasificacion">Clasificación</label>
                            <select id="clasificacion"
                                name="clasificacion"
                                className="inputbasico my-0 mb-2"
                                value={nuevoMovimiento.clasificacion}
                                onChange={handleMovChange}
                            >
                                <option></option>
                                {clasificacions.map(clasf => (
                                    <option key={clasf._id} value={clasf.nombre}>{clasf.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button className="botonborde">agregar pesadas</button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="empaques">Empaques</label>
                            <input name="empaques" id="empaques"
                                min={1}
                                max={itm.empaques}
                                className="inputbasico my-0 mb-2"
                                type="number"
                                value={nuevoMovimiento.empaques}
                                onChange={handleMovChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cantidad">Cantidad</label>
                            <input name="cantidad" id="cantidad"
                                className="inputbasico my-0 mb-2"
                                type="number"
                                min={1}
                                max={itm.cantidad}
                                value={nuevoMovimiento.cantidad}
                                onChange={handleMovChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="comentario">Comentario</label>
                            <input name="comentario" id="comentario"
                                className="inputbasico my-0 mb-2"
                                type="text"
                                value={nuevoMovimiento.comentario}
                                onChange={handleMovChange}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="botonrojo" onClick={closeMovimientoMode}>salir</button>
                            {!cambios ? null :
                                <button className="botonverde" >mover</button>
                            }
                        </div>
                    </form>
                </div>
            }
        </div>
}
