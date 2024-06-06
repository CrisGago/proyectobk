// controllers/ticketController.js
import ticketService from "../services/ticketService.js";

class TicketController {
  async create(req, res) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
      }
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const result = await ticketService.deleteTicketById(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TicketController;

