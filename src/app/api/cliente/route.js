import {NextResponse} from "next/server"
import { adminConnection } from "@/utils/adminConnection"
import Cliente from "@/models/cliente"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await adminConnection(data.database)
        let clientes = await Cliente.find({})
        return NextResponse.json({message:"Clientes encontrados",clientes: clientes}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron clientes"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await adminConnection(data.database)
        let clienteExiste = await Cliente.findOne({ email: data.email })
        // console.log(productorExiste)
        if(clienteExiste) return NextResponse.json({message:"Cliente existente"}, {status:400})
        let newCliente = await Cliente.create(data)
        if(!newCliente) return NextResponse.json({message:"No se pudo guardar el cliente, intente más tarde"})
        return NextResponse.json({message:"Guardado correctamente",cliente: newCliente}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}