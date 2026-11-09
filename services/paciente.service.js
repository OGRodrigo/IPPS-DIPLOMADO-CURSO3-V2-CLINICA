import { Paciente } from '../models/paciente.model.js'

// Crear paciente.
// El médico siempre se toma desde el token, no desde el body.
export const crear = async (datos, medicoId) => {
  const {
    medico,
    ...datosPaciente
  } = datos

  return await Paciente.create({
    ...datosPaciente,
    medico: medicoId
  })
}

// Listar solo los pacientes del médico autenticado.
// Si llega previsión, se agrega al filtro.
export const listar = async (medicoId, prevision) => {
  const filtro = {
    medico: medicoId
  }

  if (prevision) {
    filtro.prevision = prevision
  }

  return await Paciente.find(filtro)
}

// Obtener cualquier paciente por ID.
// Cualquier médico autenticado puede verlo.
export const obtenerPorId = async (id) => {
  return await Paciente.findById(id)
}

// Actualizar paciente.
// Solo el médico tratante puede hacerlo.
export const actualizar = async (id, medicoId, datos) => {
  const paciente = await Paciente.findById(id)

  if (!paciente) {
    return {
      estado: 'no_encontrado'
    }
  }

  if (paciente.medico.toString() !== medicoId) {
    return {
      estado: 'prohibido'
    }
  }

  // Campos que sí permitimos modificar.
  const camposPermitidos = [
    'nombre',
    'rut',
    'fechaNacimiento',
    'prevision',
    'telefono',
    'email'
  ]

  for (const campo of camposPermitidos) {
    if (datos[campo] !== undefined) {
      paciente[campo] = datos[campo]
    }
  }

  // save() hace que se ejecuten nuevamente
  // las validaciones del modelo.
  await paciente.save()

  return {
    estado: 'ok',
    paciente
  }
}

// Eliminar paciente.
// Solo el médico tratante puede hacerlo.
export const eliminar = async (id, medicoId) => {
  const paciente = await Paciente.findById(id)

  if (!paciente) {
    return {
      estado: 'no_encontrado'
    }
  }

  if (paciente.medico.toString() !== medicoId) {
    return {
      estado: 'prohibido'
    }
  }

  await paciente.deleteOne()

  return {
    estado: 'ok'
  }
}