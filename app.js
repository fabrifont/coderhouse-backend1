import { ProductManager, CartManager } from "./classes.mjs";
import express from "express";

const app = express();
const PORT = 3000;
let products = [];
let carts = [];

const productManager = new ProductManager();
const cartManager = new CartManager();

//Rutas para Manejo de Productos (/api/products/)
//    GET /:
//    Debe listar todos los productos de la base de datos.
app.get("/", (req, res) => {
	res.send(productManager.products);
	console.log("Petición GET / recibida");
});

//    GET /:pid:
//    Debe traer solo el producto con el id proporcionado.

//    POST /:
/*    Debe agregar un nuevo producto con los siguientes campos:
        id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).

        title: String

        description: String

        code: String

        price: Number

        status: Boolean

        stock: Number

        category: String

        thumbnails: Array de Strings (rutas donde están almacenadas las imágenes del producto).
*/

//    PUT /:pid:
//    Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el idal momento de hacer la actualización.

//    DELETE /:pid:
//    Debe eliminar el producto con el pid indicado.

//Rutas para Manejo de Carritos (/api/carts/)

//    POST /:
/*    Debe crear un nuevo carrito con la siguiente estructura:
        id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

        products: Array que contendrá objetos que representen cada producto.
*/

//    GET /:cid:
//    Debe listar los productos que pertenecen al carrito con el cid proporcionado.

//    POST /:cid/product/:pid:
/*    Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
        product: Solo debe contener el ID del producto.

        quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).

    Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

*/
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
