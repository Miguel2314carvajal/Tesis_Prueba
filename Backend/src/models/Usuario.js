import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

// Método para cifrar el password
usuarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// Método para verificar el password
usuarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

export default model('Usuario', usuarioSchema)