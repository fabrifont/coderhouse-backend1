import express from "express";
import mongoose from "mongoose";

export default function cartsRouter(Cart) {
	const router = express.Router();

	//    POST /carts/
	/*    Debe crear un nuevo carrito con la siguiente estructura:
            id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).
            products: Array que contendrá objetos que representen cada producto.
*/

	router.post("/", async (req, res) => {
		console.log(`Petición POST /carts/ recibida`);
		const newCart = new Cart();
		newCart.save();
		res.send();
	});

	//    GET /carts/:cid
	//    Debe listar los productos que pertenecen al carrito con el cid proporcionado.
	router.get("/:cid", async (req, res) => {
		console.log(`Petición GET /carts/${req.params.cid} recibida`);
		const cid = req.params.cid;
		const cart = await Cart.findById(cid);
		res.send(cart);
	});

	//    POST /carts/:cid/product/:pid
	/*    Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
            product: Solo debe contener el ID del producto.
            quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).

    Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

*/
	router.post("/:cid/product/:pid", async (req, res) => {
		try {
			const cid = req.params.cid;
			const pid = req.params.pid;
			const cart = await Cart.findById(cid);
			await cart.addProduct(pid);
			res.send();
		} catch (error) {
			console.error(error);
		}
	});

	return router;
}
