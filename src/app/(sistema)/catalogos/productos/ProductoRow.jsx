export default function ProductoRow({ producto }) {
    return (
        <div className='flex flex-row gap-2 justify-between items-center mx-auto px-2'>
            <span className="basis-1/4">{producto.descripcion}</span>
            <span className="basis-1/4">{producto.clave}</span>
            <span className="basis-1/4 text-right">{producto.costo}</span>
            <span className="basis-1/4 text-right">{producto.precio1}</span>
            <span className="basis-1/4 text-right">{producto.precio2}</span>
        </div>
    )
}
