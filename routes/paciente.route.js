import { Router } from 'express'

import { proteger } from '../middlewares/proteger.js'
import * as controller from '../controllers/paciente.controller.js'

export const pacienteRoutes = Router()

// Todas las rutas de pacientes requieren token
pacienteRoutes.use(proteger)

// Crear paciente
pacienteRoutes.post('/', controller.crear)

// Listar pacientes del médico autenticado
pacienteRoutes.get('/', controller.listar)

// Obtener cualquier paciente por ID
pacienteRoutes.get('/:id', controller.obtenerPorId)

// Actualizar paciente
pacienteRoutes.put('/:id', controller.actualizar)

// Eliminar paciente
pacienteRoutes.delete('/:id', controller.eliminar)