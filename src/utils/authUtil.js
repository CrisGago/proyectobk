// utils/authUtil.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import config from "../config/config.js";



 const generateToken = (user) => {
     const payload = {
         id: user._id,
         email: user.email
     };
     return jwt.sign(payload, config.jwt_secret, { expiresIn: '1h' }); // 'your_jwt_secret' Usa la clave secreta desde el archivo de configuración
};


const createHash = (password) => {
    const saltRounds = 10; //Número de ronda para generar la sal
    return bcrypt.hashSync(password, saltRounds);
};

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

//generar y enviar token
const generateResetToken = (user) => {
    const payload = { 
        id: user._id, 
        email: user.email
    };
    return jwt.sign(payload, config.jwt_secret, { expiresIn: '1h'});
};

const validateResetToken = async (token) => {
    try {
        const decoded = jwr.verify(token, config.jwt_secret);
        return await userModel.findById(decoded.id);
    }catch (error) {
        return null;
    }
};

export const handlePolices = policies =>{
    return async (req, res, next) => {
        console.log (req.user);
        if(!req.user) return res.status(401).send({ origin: config.SERVER, payload: 'Usuario no autenticado' });
        if (policies.includes(req.user.role)) return next();
        res.status(400).send({ origin: config.SERVER, payload: 'No tiene permisos'});
    }
}
export { generateToken, createHash, isValidPassword, generateResetToken, validateResetToken };
