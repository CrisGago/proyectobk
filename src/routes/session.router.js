import { Router } from "express";
import  UserController   from "../controllers/userController.js";
import passport from "../config/passport.js";
import UserDto from "../dto/userDto.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { handlePolices } from "../utils/authUtil.js";
import { config } from "dotenv";

const router = Router();
const SessionService = new UserController();

//usuario premium 3er entrega rol

router.get('/premium/:uid', verifyToken, handlePolices(['admin']), async (req, res) =>{
    try{
        const uid = req.params.uid;
        const user = await UserController.getByID(uid);
        user.role = user.role === 'premium' ? 'user'  : 'premium';
        const update = await UserController.update({_id: uid}, user, {new: true});

        res.status(200).send({ origin: config.SERVER, payload: update });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const result = await SessionService.register(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Inicio de sesión (POST)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await SessionService.login(email, password);
        res.cookie("auth", token, { maxAge: 60 * 60 * 1000 }).json({
            status: 'success',
            token
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta protegida para obtener el usuario actual
router.get('/current', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const userDto = new UserDto(req.user);
    res.send({
        status: 'success',
        user: userDto
    });
});

// Ruta para obtener un usuario por su ID (requiere autenticación y privilegios de administrador)
router.get('/:uid', passport.authenticate("jwt", { session: false }), (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(403).send({
            status: "error",
            message: "Unauthorized"
        });
    }
}, async (req, res) => {
    try {
        const result = await SessionService.getUser(req.params.uid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error("Error al traer usuarios:", error.message);
        res.status(500).send({ error: "Error al traer los usuarios" });
    }
});

// Ruta para mostrar el usuario
router.get('/user/:uid', async (req, res) => {
    try {
        const user = await SessionService.getByID(req.params.uid).populate('cart.cart').exec();
        res.render('user', { user });
    } catch (error) {
        res.status(500).send('Error al obtener el usuario');
    }
});

export default router;

