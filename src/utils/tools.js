export function numeroFormateado(numero){
    return new Intl.NumberFormat("es-MX", { minimumIntegerDigits:2 }).format(numero)
}
export function agruparPor(arreglo, filtro){
    let reduce = arreglo.reduce((grupo, item)=>{
        let guardado = grupo.find(itm=> itm._id === item[filtro]._id)
        if(guardado){
            guardado.stockGlobal += parseFloat(item.stock)
            guardado.empaquesStockGlobal += parseFloat(item.empaquesStock)
            guardado.cantidadGlobal += parseFloat(item.cantidad)
            guardado.empaquesGlobal += parseFloat(item.empaques)

            let existeItem = guardado.items.find(itm=> itm._id === item._id)
            if(existeItem && existeItem.compra === item.compra){
                existeItem.stock += item.stock
                existeItem.empaquesStock += item.empaquesStock
            }else{
                guardado.items.push(item)
            }
        }else{
            grupo.push({
                _id: item[filtro]._id,
                [filtro] : item[filtro],
                items: [item],
                stockGlobal:item.stock,
                empaquesStockGlobal: item.empaquesStock,
                cantidadGlobal:item.cantidad,
                empaquesGlobal: item.empaques,
                producto: item.producto,
                compra: item.compra
            })
        }
        return grupo
    },[])
    return Object.keys(reduce).map(key => reduce[key])
}