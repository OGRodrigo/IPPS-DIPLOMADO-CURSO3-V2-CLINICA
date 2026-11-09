import mongoose from 'mongoose'

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    rut: {
      type: String,
      required: true,
      unique: true
    },

    fechaNacimiento: {
      type: Date,
      required: true
    },

    prevision: {
      type: String,
      enum: ['Fonasa', 'Isapre', 'Particular'],
      default: 'Fonasa'
    },

    telefono: {
      type: String
    },

    email: {
      type: String,
      lowercase: true
    },

    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medico',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Paciente = mongoose.model(
  'Paciente',
  pacienteSchema,
  'pacientes'
)