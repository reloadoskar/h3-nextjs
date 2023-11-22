import {NextResponse} from "next/server"
import { adminConnection } from "@/utils/adminConnection"
import CompraItem from "@/models/compraitem"
import Cliente from '@/models/cliente'

export async function GET(request,{params}){
    const id = params.id
    // const data = await request.json()
    // // console.log(data)
    // if(!data.database){
    //     return NextResponse.json({message:"Datos incompletos"}, {status:400})
    // }
    try {
        await adminConnection() //falta el database
        let clientes = await Cliente.find({ubicacion: id}).populate('ubicacion').lean()
        return NextResponse.json({message:"Clientes encontrados", clientes:clientes}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron clientes "+error},{status:400})
    }
}