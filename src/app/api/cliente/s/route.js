import { NextResponse } from "next/server"
import { adminConnection } from "@/utils/adminConnection"
import Cliente from "@/models/cliente"
export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await adminConnection(data.database)
        let clientes = await Cliente.find().populate('ubicacion').lean()
        if(!clientes) return NextResponse.json({message:"No se encontraron clientes"}, {status:401})
        return NextResponse.json({message:"Se encontraron clientes",clientes: clientes}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}