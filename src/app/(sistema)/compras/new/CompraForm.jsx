
'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
export default function CompraForm({ productors = [], ubicacions = [] }) {
  const { data: session, status } = useSession();
  const [newCompra, setNewCompra] = useState({
    fecha: moment().format("mm/dd/yyyy") ,
    productor: { nombre: "" },
    ubicacion: { nombre: "" }
  })
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (session) {
      setNewCompra({ ...newCompra, database: session.user.database })
    }
  }, [session])
  const handleChange = (e) => setNewCompra({ ...newCompra, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    toast("Enviando...")
    await createCompra()
  }
  const createCompra = async () => {
    try {
      const res = await axios.post("/api/compra/", newCompra)
      toast.success("Guardado 👍")
      // console.log(res)
      router.push("/compras/"+res.data._id);
      // router.refresh();

    } catch (error) {
      setIsSubmitting(false)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">+Nueva compra</h2>
      {!isSubmitting ?
        <>
          <select name="productor"
            className="inputbasico"
            id="productor"
            placeholder="Selecciona un productor"
            value={newCompra.productor.nombre}
            onChange={handleChange}
          >
            <option>--</option>
            {productors.length > 0 ?
              productors.sort().map((productor) => (
                <option key={productor._id} value={productor._id}>{productor.nombre}</option>
              )) :
              null
            }
          </select>
          {/* <select name="ubicacion"
            className="inputbasico"
            id="ubicacion"
            placeholder="Selecciona una ubicación"
            value={newCompra.ubicacion.nombre}
            onChange={handleChange}
          >
            <option>--</option>
            {ubicacions.length > 0 ?
              ubicacions.map((ubicacion) => (
                <option key={ubicacion._id} value={ubicacion._id} >{ubicacion.nombre}</option>
              )) :
              null
            }
          </select> */}
          <input name="remision"
            type="text"
            placeholder="No. Remisión"
            onChange={handleChange}
            value={newCompra.remision}
            className="inputbasico"
          />          
          <input name="fecha"
            type="date"
            placeholder="Fecha "
            onChange={handleChange}
            value={newCompra.fecha}
            className="inputbasico"
          />
          <button className="botonform">Crear</button>
        </>
        : <p className="subtitulo">...Creando...</p>
      }

    </form>
  )
}
