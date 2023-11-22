import { connect, connection } from "mongoose";
const conn = {
    isConnected: false,
};
const options = {
    maxPoolSize: 10,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 35000
}
export async function adminConnection(userDb) {

    if (conn.isConnected) {
        console.log("USANDO CONEXION GUARDADA")
        return
    }

    if(!userDb){
        return false
    }

    console.log("Nueva conexion con user db: " + userDb)
    try {
        let con = await connect(`mongodb://0.0.0.0:27017/${userDb}`, options)
        conn.isConnected = con.connections[0].readyState
        conn.connection = con

        return con
    } catch (error) {
        console.log(error)
    }
    
}

// connection.on("connected", () => console.log("Mongodb connected to db"));

// connection.on("error", (err) => console.error("Mongodb Errro:", err.message));