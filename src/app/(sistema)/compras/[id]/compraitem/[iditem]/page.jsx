import { loadCompraItem } from "@/utils/loaders"

export default async function CompraItem({params}) {
  let res = await loadCompraItem(params.iditem)
  const item = JSON.parse(res)
  
  return (
    <div>
      <div>{item.compra}</div>
      <div>{item.producto.descripcion}</div>
      <div>{item.empaques}</div>
      <div>{item.cantidad}</div>
      <div>{item.precio}</div>
      <div>{item.importe}</div>
    </div>
  )
}
