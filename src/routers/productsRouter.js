import express from "express";
import console from "node:console";

export default function productsRouter(Product) {
	const router = express.Router();

	//    GET /products/
	//    Debe listar todos los productos de la base de datos.
	router.get("/", async (req, res) => {
		try {
			console.log("Petición GET /products/ recibida");
			const products = await Product.find({});
			res.send(products);
		} catch (error) {
			console.error(error);
		}
	});

	//    GET /products/:pid
	//    Debe traer solo el producto con el id proporcionado.
	router.get("/:pid", async (req, res) => {
		try {
			console.log("Petición GET /products/:pid recibida");
			const pid = req.params.pid;
			const requestedProduct = await Product.findById(pid);
			res.send(requestedProduct);
		} catch (error) {
			console.error(error);
		}
	});

	//    POST /products/
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
	router.post("/", async (req, res) => {
		try {
			console.log("Petición POST /products/ recibida");
			const newProduct = req.body;
			const productDocument = new Product();
			productDocument.title = newProduct.title;
			productDocument.description = newProduct.description;
			productDocument.price = newProduct.price;
			productDocument.thumbnails = newProduct.thumbnails;
			productDocument.code = newProduct.code;
			productDocument.stock = newProduct.stock;
			productDocument.status = newProduct.status;
			productDocument.category = newProduct.category;
			await productDocument.save();
			/* req.app.render(
				"index",
				{
					products: productManager.products,
				},
				(err, html) => {
					req.io.emit("update-list", html);
				},
			); */

			res.send();
		} catch (error) {
			res.send(error);
		}
	});
	//    PUT /products/:pid
	//    Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id al momento de hacer la actualización.

	router.put("/:pid", async (req, res) => {
		console.log(`Petición PUT /products/${req.params.pid} recibida`);
		try {
			const body = req.body;
			const pid = req.params.pid;
			await Product.findByIdAndUpdate(pid, body);
			/* req.app.render(
				"index",
				{
					products: productManager.products,
				},
				(err, html) => {
					req.io.emit("update-list", html);
				},
			); */
			res.send();
		} catch (error) {
			console.error(error);
			res.send(error);
		}
	});

	//    DELETE /products/:pid
	//    Debe eliminar el producto con el pid indicado.
	router.delete("/:pid", async (req, res) => {
		console.log(`Petición DELETE /products/${req.params.pid} recibida`);
		const pid = req.params.pid;
		await Product.findByIdAndDelete(pid);
		/* req.app.render(
			"index",
			{
				products: productManager.products,
			},
			(err, html) => {
				req.io.emit("update-list", html);
			},
		); */
		res.send();
	});

	return router;
}
