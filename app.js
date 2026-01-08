const classes = require("./classes.js");
const express = require("express");
const app = express();
const port = 8080;
let products = [];
let carts = [];

const productManager = classes("ProductManager");
const cartManager = classes("CartManager");
