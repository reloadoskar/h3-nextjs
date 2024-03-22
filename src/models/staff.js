import mongoose, { Schema, model } from "mongoose";

var StaffSchema = Schema({
    nombre: {type: String, unique: true},
    puesto: {type: String, uppercase: true},
    email:{type:String},
    telefono:{type:Number},
    sueldo:{type:Number},
},{
    timestamps: true
});

export default mongoose.models.Staff || model("Staff", StaffSchema);