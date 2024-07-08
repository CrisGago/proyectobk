import { Router } from "express";
//import ProductManagerFS from "../dao/ProductManagerFS.js";
import ProductController from "../controllers/ProductController.js";
import { uploader } from "../utils/multerUtil.js";
import productModel from "../models/productModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { handlePolices } from "../utils/authUtil.js";

const router = Router();

//const productManager = new ProductManagerfs("./src/productos.json");
const productManager = new ProductController();


router.get("/", async (req, res) => {
    try {
        let { limit = 10, page = 1, query = {}, sort = null } = req.query;
        const result = await productManager.paginate(limit, page, query, sort);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        console.error("Error al traer los productos:", error.message);
        res.status(500).send({ error: "Error al traer los productos" });
    }
});

router.get("/:pid", async (req, res) => {
    try {

        const result = await productManager.getProductById(req.params.id);
        res.send({
            status: 'sucess',
            payload: result
        });

    } catch (error) {
        console.error("Error al obtener el producto por ID:", error.message);
        res.status(500).send({ error: "Error al obtener el producto por ID" });
    }
});


router.post('/', verifyToken, handlePolices(['admin', 'premium']), uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }
    //agrego el atributo owner 3erintegra
    req.body.owner = req.user.role === 'premium' ? req.user.email : 'admin';
    try {
        const result = await productManager.createProduct(req.body);
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

router.put('/:pid', verifyToken, handlePolices(['admin', 'premium']), uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await productManager.updateProduct(req.params.pid, req.body);
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

router.delete('/:pid', verifyToken, handlePolices(['admin', 'premium']), async (req, res) => {

    try {
        //3era integradora
        const pid = req.params.pid;
        const email = req.user.email;
        let proceeDelete = true;

        if (req.user.role === 'premium') proceeDelete = await check(pid, email);

        if (proceeDelete) {
            const result = await productManager.deleteProduct(req.params.pid);
            res.send({
                status: 'success',
                payload: result
            });
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });

        }
        
    });

export default router;