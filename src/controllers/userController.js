// userController.js
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import UserDao from "../dao/userDao.js";
import { isValidPassword } from '../utils/cryptoUtil.js';
import UserDto from "../dto/userDto.js";

class UserController {
    async getAllUsers() {
        try {
            const userDao = new UserDao();
            const users = await userDao.getAllUsers();
            return users.map(user => new UserDto(user));
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al traer los usuarios');
        }
    }

    async getByID(uid) {
        try {
            const userDao = new UserDao();
            const user = await userDao.getByID(uid);
            return new UserDto(user);
        } catch (error) {
            console.error(error.message);
            throw new Error('El usuario no existe');
        }
    }

    async register(user) {
        const { first_name, last_name, email, age, password } = user;

        if (!first_name || !last_name || !email || !age || !password) {
            throw new Error('Todos los campos son obligatorios para registrar el usuario');
        }

        try {
            const userDao = new UserDao();
            const existingUser = await userDao.getByEmail(email);
            
            if (existingUser) {
                throw new Error ('El mail ya está registrado.');
            }

            await userDao.register({ first_name, last_name, email, age, password });            
            return "El Usuario se ha registrado correctamente";
        } catch (error) {
            console.error('Error al registrar el usuario:', error.message);
            throw error;
        }
    }

    async login(email, password) {
        const errorMessage = 'Email y/o password incorrectas';

        if (!email || !password) {
            throw new Error(errorMessage);
        }
        try {
            const userDao = new UserDao();
            const user = await userDao.getByEmail(email);

            if (!user) throw new Error(errorMessage);

            if (isValidPassword(user, password)) {
                const userDto = new UserDto(user);
                return jwt.sign({ user: userDto }, "your_jwt_secret", { expiresIn: "1h" });
            }
            throw new Error(errorMessage);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export default UserController;
