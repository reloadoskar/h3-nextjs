'use client'

import Switch from "@/components/Switch"
import { usePdv } from "./PdvContext"
import { useEffect, useRef } from "react"

export default function Configuracion({ ubicacions, expanded, salir }) {
    const ref = useRef(null)
    const { ubicacion, fecha, setUbicacion, setFecha } = usePdv()
    const handleChange = (e) => {
        setUbicacion(ubicacions[e.target.value])
    }

    useEffect(()=>{
        const handleOutsideClick = (e) =>{
            if(!ref.current?.contains(e.target)){
                salir()
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    },[ref])
    return (
        <div className={`fixed inset-0 bg-gradient-to-b items-end w-1/4
            from-black/90 to-black/40 
            -translate-x-full ${expanded?"translate-x-0" :""}
            transition-transform duration-500 ease-in-out`} ref={ref}>
            <div className="w-2/3 mx-auto py-20">
                <h1 className="text-2xl font-bold text-center">Configuración</h1>

                <div>
                    <label>Ubicación</label>
                    <select name="ubicacion" className="inputbasico mt-0" value={ubicacion} onChange={handleChange}>
                        <option>{ubicacion?.nombre}</option>
                        {ubicacions.length === 0 ? null : ubicacions.sort((a, b) => a.nombre < b.nombre ? -1 : 1).map((ub, i) => (
                            <option key={i} value={i}>{ub.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Fecha</label>
                    <input className="inputbasico mt-0" name="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div>
                    <Switch />
                </div>

            </div>
        </div>
    )
}
