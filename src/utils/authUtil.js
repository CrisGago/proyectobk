// utils/authUtil.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";



 const generateToken = (user) => {
     const payload = {
         id: user._id,
         email: user.email
     };
     return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // 'your_jwt_secret' debe ser una clave secreta segura
};

//generar y enviar token
const generateResetToken = (user) => {
    const payload = { 
        id: user._id, 
        email: user.email
    };
    return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h'});
};

const validateResetToken = async (token) => {
    try {
        const decoded = jwr.verify(token, 'your_jwt_secret');
        return await userModel.findById(decoded.id);
    }catch (error) {
        return null;
    }
};
export { generateToken, generateResetToken, validateResetToken };
