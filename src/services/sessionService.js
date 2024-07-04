// sessionService.js
import UserModel from '../models/userModel.js'; 
import ProductDto from "../dto/userDto.js";
import bcrypt from 'bcrypt'; 

class SessionService {
    static async register(userData) {
        const { email, password } = userData;

        // Validar que el correo no exista ya
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('El correo ya está registrado.');
            error.isValidationError = true;
            throw error;
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el nuevo usuario
        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Devolver el usuario registrado (sin la contraseña)
        return {
            email: newUser.email,
            id: newUser._id,
        };
    }
}

export default SessionService;
