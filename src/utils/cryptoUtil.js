import bcrypt from "bcrypt";
import config from "../config/config.js";



const createHash = (password) => {
    const saltRounds = 10; // Número de rondas para generar la sal
    return bcrypt.hashSync(password, saltRounds);
};

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

export { createHash, isValidPassword };
