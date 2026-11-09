import mongoose from 'mongoose'
import * as service from '../services/paciente.service.js'

// POST /pacientes
export const crear = async (req, res, next) => {
  try {
    const paciente = await service.crear(
      req.body,
      req.medico.id
    )

    return res.status(201).json(paciente)
  } catch (error) {
    // RUT duplicado
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'El RUT ya está registrado'
      })
    }

    // Datos requeridos faltantes, previsión inválida, etc.
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Datos de paciente inválidos'
      })
    }

    next(error)
  }
}

// GET /pacientes
// GET /pacientes?prevision=Isapre
export const listar = async (req, res, next) => {
  try {
    const { prevision } = req.query

    const pacientes = await service.listar(
      req.medico.id,
      prevision
    )

    return res.status(200).json(pacientes)
  } catch (error) {
    next(error)
  }
}

// GET /pacientes/:id
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID de paciente inválido'
      })
    }

    const paciente = await service.obtenerPorId(id)

    if (!paciente) {
      return res.status(404).json({
        error: 'Paciente no encontrado'
      })
    }

    return res.status(200).json(paciente)
  } catch (error) {
    next(error)
  }
}

// PUT /pacientes/:id
export const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID de paciente inválido'
      })
    }

    const resultado = await service.actualizar(
      id,
      req.medico.id,
      req.body
    )

    if (resultado.estado === 'no_encontrado') {
      return res.status(404).json({
        error: 'Paciente no encontrado'
      })
    }

    if (resultado.estado === 'prohibido') {
      return res.status(403).json({
        error: 'No eres el médico tratante de este paciente'
      })
    }

    return res.status(200).json(resultado.paciente)
  } catch (error) {
    // Por ejemplo, intentar cambiar el RUT por uno ya existente
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'El RUT ya está registrado'
      })
    }

    // Enum de previsión inválido, fecha inválida, campos requeridos, etc.
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({
        error: 'Datos de paciente inválidos'
      })
    }

    next(error)
  }
}

// DELETE /pacientes/:id
export const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'ID de paciente inválido'
      })
    }

    const resultado = await service.eliminar(
      id,
      req.medico.id
    )

    if (resultado.estado === 'no_encontrado') {
      return res.status(404).json({
        error: 'Paciente no encontrado'
      })
    }

    if (resultado.estado === 'prohibido') {
      return res.status(403).json({
        error: 'No eres el médico tratante de este paciente'
      })
    }

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}