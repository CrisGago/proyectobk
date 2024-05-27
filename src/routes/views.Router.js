import { Router } from 'express';
//import { ProductManagerFS } from '../dao/ProductManagerFS.js';
import { ProductController } from "../controllers/ProductController.js";
import { MessageController } from '../controllers/messageController.js';




const router = Router();
//const productManager = new ProductManagerFS('products.json');
const productManager = new ProductController();
const messageManager  = new MessageController();
const nessage = [];


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
router.get('/realtimeproducts', async (req, res) => {
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
