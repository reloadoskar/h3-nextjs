import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectDb } from "@/utils/mongoose";
import UserSchema from "@/schemas/user";
// import User from '@/models/user'

const curDate = new Date()
let curDateISO = curDate.toISOString()
let tryPeriod = curDate.setDate(curDate.getDate() + 30)
tryPeriod = new Date(tryPeriod).toISOString()

export async function POST(request) {
    try {
        const conn = await connectDb()
        const data = await request.json()
        // console.log(data)
        // const userExist = await conn.model('User',UserSchema).findOne({ email: data.email })
        // if (userExist) {
        //     return NextResponse.json({ message: "El correo ya ha sido registrado."}, { status: 400 })
        // }
        // const hashedPassword = await bcrypt.hash(data.password, 12)
        // const newUser = new User({
        //     nombre: data.nombre,
        //     email: data.email,
        //     telefono: data.telefono,
        //     database: "@" + data.nombre, //mejorar el nombre de la base de datos con el nombre solo se va a repetir pronto
        //     level: 1,
        //     fechaInicio: curDateISO,
        //     tryPeriodEnds: tryPeriod,
        //     paidPeriodEnds: tryPeriod,
        //     password: hashedPassword
        // })
        // const userSaved = await newUser.save()

        // return NextResponse.json(userSaved)
    } catch (error) {
        return NextResponse.json({message:error?.message},{status:400})
    }
}