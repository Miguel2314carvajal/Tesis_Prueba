// Importar JWT y el Modelo
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

// Método para proteger rutas
const verificarAutenticacion = async (req,res,next)=>{
    if(!req.headers.authorization) 
        return res.status(401).json({msg:"No hay token en la petición"})  

    try {
        const {id} = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
        const usuario = await Usuario.findById(id).select("-password -status")
        
        if(!usuario)
            return res.status(401).json({msg:"Token no válido"})

        req.usuario = usuario
        next()
    } catch (error) {
        return res.status(401).json({msg:"Token no válido"})
    }
}

// Exportar el método
export default verificarAutenticacion