import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import  session  from "express-session";
//import mongoStore from "connect-mongo";
import mongoose from "mongoose";
import mongosePaginate from "mongoose-paginate-v2";
import websocket from "./websocket.js";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import sessionRouter from "./src/routes/session.router.js";
import viewsRouter from "./src/routes/views.Router.js";
import __dirname from "./src/utils/utilsConst.js";
import productModel from "./src/models/productModel.js";
import  passport   from "./src/config/passport.js";
import authRoutes from "./src/routes/auth.js";
import config from "./src/config/config.js";
console.log(config);
import ticketRoutes from "./src/routes/ticketRoutes.js";
import logger from "./src/utils/logger.js";
import loggerTestRouter from "./src/routes/LoggerTestRouter.js";
import errorHandler from "./src/middlewares/errorHandler.js";


//import websocket from "./websocket.js";
// import ProductManager from "./dao/CartManagerFS.js";
// import CartManager from "./dao/ProductManagerFS.js";

//productModel.paginate = mongosePaginate;

const app = express();

//Mongo connection

// const uri = "mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(uri);

const conexion = async() =>{
    try{
        await mongoose.connect("mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectando con la bbdd MongoAtlas");
    }catch (error){
        console.log("Fallo la conexión");
    }
}
conexion();


//handlebars
app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('views', __dirname + '/../views');
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(errorHandler);

app.use('/loggerTest', loggerTestRouter);

//passaport
//passport();

app.use(passport.initialize());


//const PM = new ProductManager("./src/productos.json");
//const CM = new CartManager("./src/carrito.json");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", viewsRouter)
app.use("/products", viewsRouter);
app.use("/carts", viewsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/", sessionRouter);
app.use("/api/auth", authRoutes);
app.use("/api/messages", viewsRouter);

//app.use("/api/ticket", ticketRoutes);
//app.use('/api', ticketRoutes);
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación sistema AdoptMe',
            description: 'Esta documentación cubre toda la API habilitada para AdoptMe',
        },
    },
    apis: ['./src/docs/**/*.yaml'], // todos los archivos de configuración de rutas estarán aquí
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


//Local connection 
const PORT = 8080;
const httpServer = app.listen(PORT, () =>{
    console.log(`Start server PORT ${PORT}`);
});
//websocket
const io = new Server(httpServer);
websocket(io);

