import { useClientes } from "./ClientesContext";

export default function ClienteRow({ cliente }) {
  const {setCliente, setVerCliente} = useClientes()
  const handleClick = () =>{
    setCliente(cliente)
    setVerCliente(true)
  }
  return (
      <div className='flex px-2 gap-2 justify-between items-center mx-auto odd:bg-gray-800 cursor-pointer hover:bg-gray-600 ' onClick={handleClick}>
          <span className="basis-2/5">{cliente.nombre} - {cliente.clave}</span>          
          <span className="basis-1/5">{cliente.tel1}</span>
          <span className="basis-1/5">{cliente.email}</span>
          <span className="basis-1/5">{cliente.ubicacion?.nombre}</span>    
      </div>
  )
}
