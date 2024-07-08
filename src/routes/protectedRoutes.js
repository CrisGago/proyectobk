//rotues/protectedRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
    res.send({ message: 'Acceso permitido', user: req.user });
});

export default router;
