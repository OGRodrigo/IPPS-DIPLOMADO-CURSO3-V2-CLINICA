import { Router } from 'express'

import { proteger } from '../middlewares/proteger.js'
import * as controller from '../controllers/medico.controller.js'

export const medicoRoutes = Router()

// Todas las rutas de médicos requieren token
medicoRoutes.use(proteger)

// IMPORTANTE:
// /perfil debe ir antes que /:id
medicoRoutes.get('/perfil', controller.perfil)

medicoRoutes.get('/', controller.listar)

medicoRoutes.get('/:id/pacientes', controller.obtenerPacientes)

medicoRoutes.get('/:id', controller.obtenerPorId)