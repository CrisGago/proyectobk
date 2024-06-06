// routes/ticketRoutes.js

import { Router } from "express";

//import express from "express";
import ticketController from "../controllers/ticketController.js";

const router = Router();

router.get('/tickets/:id', async (req, res) => {
    try {
        const result = await ticketController.getAll();
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.error("Error al obtener el ticket por ID:", error.message);
        res.status(500).send({ error: "Error al obtener el ticket" });
    }
});


router.post("/tickets", async (req, res) => {
    try {
        let status = await ticketController.create(req.params.id);
        res.send({
            status: 'sucess',
            payload: result
        });
    } catch (error) {
        console.error("Error al emitir el ticket por ID:", error.message);
        res.status(500).send({ error: "Error al emitir el ticket" });
    }
});

router.post("/", async (req, res) => {
    try {
        let status = await ticketController.create(req.params.id);
        res.send({
            status: 'sucess',
            payload: result
        });
    } catch (error) {
        console.error("Error al emitir el ticket por ID:", error.message);
        res.status(500).send({ error: "Error al emitir el ticket" });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const result = await ticketController.getById(req.params.id);
        res.send({
            status: 'sucess',
            payload: result
        });
    } catch (error) {
        console.error("Error al emitir el ticket por ID:", error.message);
        res.status(500).send({ error: "Error al emitir el ticket" });
    }
});


router.delete('/tickets/:id', async (req, res) => {
    try {
        const result = await ticketController.deleteById(req.params.id);
        res.send({
            status: 'sucess',
            payload: result
        });
    } catch (error) {
        console.error("Error al eliminar el ticket por ID:", error.message);
        res.status(500).send({ error: "Error al eliminar el ticket" });
    }
});




export default router;
