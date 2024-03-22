import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Plato from "@/models/plato"
import path from 'path';
import { writeFile } from "fs/promises";

export async function POST(request) {

    const data = await request.formData();

    const database = data.get('database')
    if (!database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    const file = data.get('file')

    if(file){
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filepath = path.join(process.cwd(), "public/images", file.name)
        writeFile(filepath, buffer)
        console.log("Imagen guardada en: ", filepath)
    }

    try {

        const platoInfo = {
            nombre: data.get('nombre'),
            categoria: data.get('categoria'),
            subcategoria: data.get('subcategoria'),
            descripcion: data.get('descripcion'),
            precio: data.get('precio'),
            filepath: "/images/"+file.name || ""
        }
        await dbConnect(data.database)
        let newPlato = await Plato.create(platoInfo)
        if (!newPlato) {
            return NextResponse.json({ message: "No se guardó el plato: "}, { status: 401 })
        }
        return NextResponse.json({ message: "Plato guardado.", plato: newPlato }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "No se guardo el plato: " + error }, { status: 400 })
    }
}