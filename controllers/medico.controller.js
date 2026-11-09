import mongoose from 'mongoose'
import * as service from '../services/medico.service.js'

// GET /medicos
// GET /medicos?especialidad=Pediatría
export const listar = async (req, res, next) => {
  try {
    const { especialidad } = req.query

    const medicos = await service.listar(especialidad)

    return res.status(200).json(medicos)
  } catch (error) {
    next(error)
  }
}

// GET /medicos/perfil
export const perfil = async (req, res, next) => {
  try {
    const medico = await service.obtenerPerfil(req.medico.id)

    if (!medico) {
      return res.status(404).json({
        error: 'Médico no encontrado'
      })
    }

    return res.status(200).json(medico)
  } catch (error) {
    next(error)
  }
}

// GET /medicos/:id
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params

    // Evitamos enviar un ObjectId mal formado a MongoDB
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID de médico inválido'
      })
    }

    const medico = await service.obtenerPorId(id)

    if (!medico) {
      return res.status(404).json({
        error: 'Médico no encontrado'
      })
    }

    return res.status(200).json(medico)
  } catch (error) {
    next(error)
  }
}

// GET /medicos/:id/pacientes
export const obtenerPacientes = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID de médico inválido'
      })
    }

    const pacientes = await service.obtenerPacientes(id)

    // El service devuelve null si el médico no existe
    if (pacientes === null) {
      return res.status(404).json({
        error: 'Médico no encontrado'
      })
    }

    return res.status(200).json(pacientes)
  } catch (error) {
    next(error)
  }
}