import { Router } from 'express';
//import ProductManagerFS from "../dao/ProductManagerFS.js";
import { ProductController } from "../controllers/ProductController.js";
import { uploader } from "../utils/multerUtil.js";

const router = Router();

//const productManager = new ProductManagerfs("./src/productos.json");
const productManager = new ProductController();


router.get("/", async (req, res) => {
    try {
        // Obtener parámetros de consulta
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'asc';
        const query = req.query.query || '';

        
        // Obtener productos paginados
       const result = await productManager.getAllProducts(page, limit, sort, query);

        res.send({
            status: 'success',
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


router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await productManager.addProduct(req.body);
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

router.put('/:pid', uploader.array('thumbnails', 3), async (req, res) => {

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

router.delete('/:pid', async (req, res) => {

    try {
        const result = await productManager.deleteProduct(req.params.pid);
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

export default router;