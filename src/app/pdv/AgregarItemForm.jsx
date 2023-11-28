import { useVentas } from "./VentaContext"

export default function AgregarItemForm() {
    const {
        item,
        itemCant, setItemCant,
        itemEmps, setItemEmps,
        itemPrec, setItemPrec,
        itemImpo, setItemImpo,
        limpiarItemSeleccionado,
        ventaItems, setVntaItms

    } = useVentas()

    const handleSubmit = (e) => {
        e.preventDefault()
        item.stock -= itemCant
        item.empaquesStock -= itemEmps
        setVntaItms([...ventaItems, {item: item, cantidad: itemCant, empaques: itemEmps, precio: itemPrec, importe: itemImpo}])
        limpiarItemSeleccionado()

    }   

    return (
        <form onSubmit={handleSubmit} className="bg-gray-500 p-6">
            
            <div className=" text-2xl font-bold text-center">{item.producto.descripcion} {item.empaquesStock.toFixed(1)}|{item.stock.toFixed(2)}</div>
            <div className="flex gap-2">
                <div className="basis-1/4">
                    <label htmlFor="empaques">Empaques</label>
                    <input name="empaques" id="empaques"
                        className="inputbasico my-0 mb-2"
                        autoFocus
                        required
                        type="number"
                        step="any"
                        // min={1}
                        max={item.empaquesStock}
                        value={itemEmps}
                        onChange={(e) => setItemEmps(e.target.value)}
                    />
                </div>
                <div className="basis-1/4">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input name="cantidad" id="cantidad"
                        className="inputbasico my-0 mb-2"
                        type="number"
                        step="any"
                        required
                        min={1}
                        max={item.stock}
                        value={itemCant}
                        onChange={(e) => setItemCant(e.target.value)}
                    />
                </div>
                <div className="basis-1/4">
                    <label htmlFor="precio">Precio</label>
                    <input name="precio" id="precio"
                        type="number"
                        step="any"
                        className="inputbasico my-0 mb-2"
                        required                        
                        value={itemPrec}
                        onChange={(e) => setItemPrec(e.target.value)}
                    />
                </div>
                <div className="basis-1/4">
                    <label htmlFor="importe">Importe</label>
                    <input name="importe" id="importe"
                        className="inputbasico my-0 mb-2"
                        type="number"
                        readOnly
                        value={itemImpo}
                        onChange={(e) => setItemImpo(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" className="botonrojo" onClick={() => limpiarItemSeleccionado()}>salir</button>
                <button type="submit" className="botonverde" >Agregar</button>
            </div>
        </form>
    )
}
