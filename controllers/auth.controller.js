import * as service from '../services/auth.service.js'

export const registrar = async (req, res, next) => {
  try {
    const datos = req.body

    const resultado = await service.registrar(datos)

    return res.status(201).json(resultado)
  } catch (error) {
    // Email duplicado
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'El email ya está registrado'
      })
    }

    // Datos faltantes o inválidos según el modelo
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Datos inválidos'
      })
    }

    // Cualquier otro error pasa al siguiente middleware
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y password son obligatorios'
      })
    }

    const resultado = await service.login(email, password)

    if (!resultado) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      })
    }

    return res.status(200).json(resultado)
  } catch (error) {
    next(error)
  }
}