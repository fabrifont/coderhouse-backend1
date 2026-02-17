import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	thumbnails: { type: [String], default: [] },
	code: { type: String, required: true, unique: true },
	stock: { type: Number, required: true },
	status: { type: Boolean, default: true },
	category: { type: String, required: true },
});

export const Product = mongoose.model("Product", productsSchema);

const cartsSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: { type: Number, required: true, default: 1 },
		},
	],
});

cartsSchema.methods.addProduct = async function (productId) {
	const existingProductIndex = this.products.findIndex(
		(p) => p.product.toString() === productId,
	);
	if (existingProductIndex !== -1) {
		this.products[existingProductIndex].quantity += 1;
	} else {
		this.products.push({ product: productId, quantity: 1 });
	}
	await this.save();
};

export const Cart = mongoose.model("Cart", cartsSchema);
