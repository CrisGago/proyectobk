// routes/auth.js
import { Router } from "express";
import passport from "passport";
import { generateToken, validateResetToken } from "../utils/authUtil.js";
import { sendPasswordResetEmail } from "../services/emailService.js";
import { generateResetToken } from "../utils/authUtil.js";
import userModel from "../models/userModel.js";
import { isValidPassword } from "../utils/cryptoUtil.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    
    //res.json({ token });
    const token = generateToken(user);
    res.cookie("auth", token, { maxAge: 60 * 60 * 1000 }).json({
        status: 'success',
        token
    });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Ruta protegida accesible solo con un token válido' });
});

//Recuperación de contraseña
router.post('/forgot-password', async (req, res) =>{
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'Usuario np encontrado' });
    }

    const token = generateResetToken(user);
    await sendPasswordResetEmail(user, email, token);

    res.status(200).json({ message: 'email de recuperación enviado'});
});
//restablecer contraseña
router.post('/reset-password', async (req, res) =>{
    const { token, newPassword } = req.body;
    const user = await validateResetToken(token);

    if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
});

export default router;
