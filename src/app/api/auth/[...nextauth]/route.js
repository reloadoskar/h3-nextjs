import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminConnection } from "@/utils/adminConnection";
import User from "@/models/user";
// import Compra from "@/models/compra";
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label:"Email", type:"text", placeholder:"mail@mail.com"}, 
                password: {label:"password", type:"password", placeholder:"******"},
                dbname:{label:"db name", type:"text", placeholder:"dbname/number"}
            },
            async authorize(credentials, req){
                try {
                    await adminConnection(credentials.dbname)
                                                           
                    const userFound = await User.findOne({email: credentials?.email}).select('+password')
                    if (!userFound) throw new Error("Credenciales no validas")
    
                    const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
                    if(!passwordMatch) throw new Error("Credenciales no validas")
                    return userFound
                } catch (error) {
                    console.log(error)
                    return null
                }

            },
        })
    ],
    callbacks: {
        jwt({account,token,user,session}){
            if (user) token.user = user
            return token
        },
        session({session,token}){
            session.user = token.user
            return session
        }

    },
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }