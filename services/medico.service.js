import { Medico } from '../models/medico.model.js'
import { Paciente } from '../models/paciente.model.js'

// Obtener todos los médicos.
// Si llega especialidad, filtra por ella.
export const listar = async (especialidad) => {
  const filtro = {}

  if (especialidad) {
    filtro.especialidad = especialidad
  }

  return await Medico.find(filtro)
}

// Obtener el médico autenticado usando el id que viene en el token.
export const obtenerPerfil = async (id) => {
  return await Medico.findById(id)
}

// Obtener un médico por su id.
export const obtenerPorId = async (id) => {
  return await Medico.findById(id)
}

// Obtener los pacientes asignados a un médico.
// Primero comprobamos que el médico exista.
export const obtenerPacientes = async (id) => {
  const medico = await Medico.findById(id)

  if (!medico) {
    return null
  }

  const pacientes = await Paciente.find({
    medico: id
  })

  return pacientes
}
