import mongoose from "mongoose";

const { MONGODB_URI_LOCAL } = process.env;

if (!MONGODB_URI_LOCAL) throw new Error("MONGO_URL is not defined.");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null };
}

export const dbConnect = async (dbName = null) => {
    if (cached.conn){
        console.log("Conexión guardada ✅")
        console.log("Conexiones: ["+mongoose.connections.length+"]")
        return cached.conn;
    } 
    console.log("Nueva conexión 🆕")
    cached.conn = await mongoose.connect(MONGODB_URI_LOCAL + dbName);
    console.log("Conexiones: ["+mongoose.connections.length+"]")

    return cached.conn;
};