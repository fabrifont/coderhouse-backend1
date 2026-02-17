// ----------------------------  Importación de dependencias  ---------------------------------------

import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import path from "node:path";
import mongoose from "mongoose";
import { Product, Cart } from "./models.js";

// ----------------------------  Configuración inicial del servidor  ---------------------------------------

const __dirname = import.meta.dirname;
const app = express();
const http = createServer(app);
const io = new Server(http);
const PORT = 8080;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
	req.io = io;
	next();
});
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ----------------------------  Mongoose: conexión con MongoDB  ---------------------------------------

async function connectToMongoDB() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-coderhouse");
		console.log("Conexión con MongoDB establecida");
	} catch (error) {
		console.error(error);
	}
}

connectToMongoDB();

// ----------------------------  API: Manejo de productos  ---------------------------------------

app.use("/api/products", productsRouter(Product));

// ----------------------------  API: Manejo de carritos  ---------------------------------------

app.use("/api/carts", cartsRouter(Cart));

// ----------------------------  Server Side Rendering (Handlebars)  ---------------------------------------

//app.use("/", viewsRouter(productManager));

// ----------------------------  API: Conexiones WebSockets  ---------------------------------------

io.on("connection", (socket) => {
	console.log(`Conexión WS iniciada: ${socket.id}`);
});

// ---------------------------------------------------------------------------------------------------------

http.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
