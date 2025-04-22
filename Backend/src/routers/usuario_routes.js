import {Router} from 'express'
import {
    login,
    registro,
    perfil
} from "../controllers/usuario_controller.js"
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router()

// Rutas públicas
router.post("/login", login)
router.post("/registro", registro)

// Rutas privadas
router.get("/perfil", verificarAutenticacion, perfil)

export default router 