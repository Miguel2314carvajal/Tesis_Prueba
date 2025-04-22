// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import routerUsuarios from './routers/usuario_routes.js'


// Inicializaciones
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())  // Simplificamos CORS temporalmente

// Configuraciones 
app.set('port', process.env.PORT || 3000)

// Variables globales

// Rutas sin /api
app.use('/', routerUsuarios)
// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ msg: 'API funcionando' })
})

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).json({msg: "Endpoint no encontrado"}))



// Exportar la instancia de express por medio de app
export default  app