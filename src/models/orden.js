import mongoose, { Schema, model } from "mongoose";

var OrdenSchema = Schema({
    items:[],   
    total: {type: Number},
    mesa:{type:Number},
    cliente:{ type: Schema.ObjectId, ref: 'Cliente'},
    status: {type: String},
},{
    timestamps: true
});

export default mongoose.models.Orden || model("Orden", OrdenSchema);