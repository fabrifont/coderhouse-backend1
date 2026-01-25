import { promises as fs } from "fs";

export class ProductManager {
	constructor() {
		this.products = [];
		this.productAttributes = [
			"id",
			"title",
			"description",
			"price",
			"thumbnails",
			"status",
			"code",
			"stock",
			"category",
		].sort();
	}

	addProduct(product) {
		try {
			let receivedKeys = Object.keys(product);
			receivedKeys.push("id");
			receivedKeys.sort();

			// since in js you can't compare two arrays using == or ===,
			// using JSON.stringify in each is the easiest alternative
			if (
				JSON.stringify(receivedKeys) != JSON.stringify(this.productAttributes)
			)
				throw new Error("Invalid received attributes in request body");

			this.products.push({
				id: this.products.length + 1,
				title: product.title,
				description: product.description,
				price: product.price,
				thumbnails: product.thumbnail,
				code: product.code,
				stock: product.stock,
				status: product.status,
				category: product.category,
			});
		} catch (error) {
			console.error(error);
		}
	}

	getProducts() {
		return this.products;
	}

	getProductById(stringId) {
		try {
			const id = Number(stringId);
			const idList = this.products.map((product) => product.id);
			const productIndex = idList.indexOf(id);
			if (productIndex === -1) throw new Error("Product not found");
			return this.products[productIndex];
		} catch (error) {
			console.error(error);
		}
	}

	deleteProduct(idString) {
		try {
			const id = Number(idString);
			const id_list = this.products.map((product) => product.id);
			const productIndex = id_list.indexOf(id);
			if (productIndex < 0) throw new Error(`Product with ID ${id} not found`);
			this.products.splice(productIndex, 1);
		} catch (error) {
			console.error(error);
		}
	}

	updateProduct(idString, attribute, value) {
		try {
			const id = Number(idString);
			const id_list = this.products.map((product) => product.id);
			const productIndex = id_list.indexOf(id);
			if (productIndex < 0) throw new Error(`Product with ID ${id} not found`);
			if (attribute === "id") throw new Error("ID is not modifiable");
			if (!this.products.length) throw new Error("No products available");
			if (!this.productAttributes.includes(attribute)) {
				throw new Error(`Invalid attribute: ${attribute}`);
			}
			this.products[productIndex][attribute] = value;
		} catch (error) {
			console.error(error);
		}
	}

	async save(file) {
		try {
			const products = this.products;
			const data = JSON.stringify(products, null, 2);
			await fs.writeFile(file, data);
		} catch (error) {
			throw error;
		}
	}

	async load(file) {
		try {
			const data = await fs.readFile(file);
			this.products = JSON.parse(data);
		} catch (error) {
			throw error;
		}
	}
}

export class CartManager {
	constructor() {
		this.carts = [];
	}

	addCart() {
		this.carts.push({
			id: this.carts.length + 1,
			products: [],
		});
	}

	getCart(id) {
		const id_list = this.carts.map((cart) => cart.id);
		const cartIndex = id_list.indexOf(id);
		return this.carts[cartIndex].products;
	}

	addProductToCart(cart_id, product_id) {
		try {
			const id_list = this.carts[cart_id].map((product) => product.id);
			const productIndex = id_list.indexOf(product_id);
			if (productIndex === -1) {
				this.carts[cart_id].push({
					id: product_id,
					quantity: 1,
				});
			} else {
				this.carts[cart_id][productIndex].quantity += 1;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async save(file) {
		try {
			const products = this.carts;
			const data = JSON.stringify(products, null, 2);
			await fs.writeFile(file, data);
		} catch (error) {
			throw error;
		}
	}

	async load(file) {
		try {
			const data = await fs.readFile(file);
			this.products = JSON.parse(data);
		} catch (error) {
			throw error;
		}
	}
}

// modules.export = { ProductManager, CartManager };
