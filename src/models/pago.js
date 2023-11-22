import { Schema, model, models } from "mongoose";

var PagoSchema = Schema({
    fecha: String,
    folio: Number,
    cliente: {type:Schema.ObjectId, ref: 'Cliente'},
    ubicacion: {type: Schema.ObjectId, ref: 'Ubicacion'},
    credito:{type: Schema.ObjectId, ref: 'Credito'},
    importe: Number
},{
    timestamps: true
});

export default models.Pago || model("Pago", PagoSchema);