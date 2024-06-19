import { Router } from 'express';
//import { ProductManagerFS } from '../dao/ProductManagerFS.js';
import  ProductController  from "../controllers/ProductController.js";
import { uploader } from '../utils/multerUtil.js';
import productModel from '../models/productModel.js';
import { MessageController } from '../controllers/messageController.js';




const router = Router();
//const productManager = new ProductManagerFS('products.json');
const productManager = new ProductController();
const messageManager  = new MessageController();
const messages = [];

//prueba paginado desde aqui
router.get("/", async (req, res) => {
    try {
        // Obtener parámetros de consulta
        let {page = 1} = parseInt(req.query.page);
       
        // Obtener productos paginados
        const result = await productModel.paginate({}, {page, limit: 10, lean: true});
        console.log(result);

        const baseURL = "http://localhost:8080";
        result.title= "CoderHousePr";
        result.style= "index.css";
        result.prevLink = result.hasPrevPage ? `${baseURL}?page=${result.PrevPage}` : "";
        result.nextLink = result.hasNextPage ? `${baseURL}?page=${result.nextPage}` : "";
        result.isValid = !(page <= 0 || page > result.totalPages);

        res.render("index", result);

    } catch (error) {
        console.error("Error al traer los productos:", error.message);
        res.status(500).send({ error: "Error al traer los productos" });
    }
});

// Ruta para renderizar la vista de productos
router.get('/', async (req, res) => {
    res.render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: await productManager.getAllProducts()
        }
    )
});

// Ruta para renderizar la vista de productos en tiempo real
router.get('/realTimeProducts', async (req, res) => {
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: await productManager.getAllProducts()
        }
    )
});

// Ruta para renderizar la vista del chat
router.get('/messages', async (req, res) => {
    res.render(
        'message',
        {
            title: 'Chat Contacto',
            style: 'message.css',
            messages: await messageManager.getMessages()
        }
    )
});

export default router;
