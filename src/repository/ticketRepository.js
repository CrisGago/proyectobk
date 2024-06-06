// repositories/ticketRepository.js
import Ticket from "../models/ticketModel.js";


class TicketRepository {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }

  async findById(id) {
    return await Ticket.findById(id);
  }

  async findAll() {
    return await Ticket.find();
  }

  async deleteById(id) {
    return await Ticket.findByIdAndDelete(id);
  }
}

export default new TicketRepository();

