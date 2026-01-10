class ProductManager {
	constructor() {
		this.products = [];
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		try {
			this.products.push({
				id: this.products.length + 1,
				title: title,
				description: description,
				price: price,
				thumbnail: thumbnail,
				code: code,
				stock: stock,
			});
		} catch (error) {
			console.error(error);
		}
	}

	getProducts() {
		return this.products;
	}

	getProductById(id) {
		const id_list = this.products.map((product) => product.id);
		const productIndex = id_list.indexOf(id);
		return this.products[productIndex];
	}

	deleteProduct(id) {
		const id_list = this.products.map((product) => product.id);
		const productIndex = id_list.indexOf(id);
		this.products.remove(productIndex);
	}
}

class CartManager {
	constructor() {}
}

modules.export = { ProductManager, CartManager };
