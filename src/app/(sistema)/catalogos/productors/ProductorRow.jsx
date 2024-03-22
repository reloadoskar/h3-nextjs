import { useProductors } from './ProductorsContext'

export default function ProductorRow({ productor }) {
    const {setProductor, setVerP} = useProductors()
    const handleClick = () =>{
        setProductor(productor)
        setVerP(true)
    }
    return (
        <tr 
        className="odd:bg-gray-700 cursor-pointer hover:bg-gray-600"
            onClick={handleClick}
        >
            <td className="px-3 text-sm text-gray-400">{productor.nombre}</td>
            <td className="w-24 px-3 text-sm text-gray-400">{productor.clave}</td>
            <td className="w-32 px-3 text-sm text-gray-400">{productor.email}</td>
            <td className="w-32 px-3 text-sm text-gray-400">{productor.tel1}</td>
        </tr>
    )
}
