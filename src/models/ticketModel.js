// models/ticketModel.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Usa import en lugar de require

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: uuidv4, // Genera un UUID único para el código
  },
  purchase_datetime: {
    type: Date,
    default: Date.now, // Asigna la fecha y hora actuales por defecto
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Validación básica de correo electrónico
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
