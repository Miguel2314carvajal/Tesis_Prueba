import Usuario from "../models/Usuario.js"
import generarJWT from "../helpers/crearJWT.js"

const login = async(req,res)=>{
    const {email,password} = req.body
    
    if (Object.values(req.body).includes("")) 
        return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const usuarioBDD = await Usuario.findOne({email})
    
    if(!usuarioBDD) 
        return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    
    const verificarPassword = await usuarioBDD.matchPassword(password)
    
    if(!verificarPassword) 
        return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})

    const token = generarJWT(usuarioBDD._id,"usuario")
    
    res.status(200).json({
        token,
        nombre: usuarioBDD.nombre,
        email: usuarioBDD.email,
        _id: usuarioBDD._id
    })
}

const registro = async (req,res)=>{
    const {email,password} = req.body
    
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const verificarEmailBDD = await Usuario.findOne({email})
    
    if(verificarEmailBDD) 
        return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    
    await nuevoUsuario.save()
    
    res.status(200).json({msg:"Usuario registrado correctamente"})
}

const perfil = async (req,res)=>{
    const {usuario} = req
    res.status(200).json(usuario)
}

export {
    login,
    registro,
    perfil
} 