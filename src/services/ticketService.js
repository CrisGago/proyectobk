// services/ticketService.js
import TicketRepository from "../repository/ticketRepository.js";


//const TicketRepository = new TicketRepository();

class TicketService {
  async createTicket(ticketData) {
    return await TicketRepository.create(ticketData);
  }

  async getTicketById(id) {
    return await TicketRepository.findById(id);
  }

  async getAllTickets() {
    return await TicketRepository.findAll();
  }

  async deleteTicketById(id) {
    return await TicketRepository.deleteById(id);
  }
}

export default TicketService;