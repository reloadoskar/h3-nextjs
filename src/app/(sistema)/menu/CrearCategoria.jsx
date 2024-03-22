import { useState } from "react"
import ModalDialog from "@/components/ModalDialog"
import { useCategorias } from "./CategoriasContext"

export default function CrearCategoria({ database, open, close }) {
    const [categoria, setCategoria] = useState("")
    const {crearCategoria} = useCategorias()
    const handleGuardar = () =>{        
        if(categoria!==""){
            let data = categoria
            crearCategoria(database, data).then(res=>{
                close()
            }).catch(err=>console.log(err))
        }
    }
    return (
        <ModalDialog open={open} close={close}>
            <div className="form">
                <h1 className="titulo">Nueva categoría</h1>
                <input name="nombre" className="inputbasico" value={categoria} onChange={(e)=>setCategoria(e.target.value)} />
                <div className="flex gap-2 justify-end">
                    <button type="button" className="botonrojo" onClick={()=>close()}>Cancelar</button>
                    <button type="button" className="botonverde" onClick={handleGuardar}>Guardar</button>
                </div>
            </div>
        </ModalDialog>
    )
}
