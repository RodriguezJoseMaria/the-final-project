const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");

router.get(
    "/products", async (req, res, next) => {
         try {
           const products = await Product.find()
           res.json(products);
         } catch (error) {
            next (error)
         }
    }
)

router.post(
    "/products", async (req, res, next) => {
        try {
            const {nameProduct, description, price, category, gender, sizes} = req.body;
            const newProduct = await Product.create({nameProduct, description, price, category, gender, sizes});
            res.status(201).json(newProduct);
        } catch (error) {
            next (error)
        }
    }
)

router.get (
    "/products/:id", async (req, res, next) => {
        try {
            const productId = req.params.id
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({message: "Product not found"})
            } 
            res.json(product);
        } catch (error) {
            next (error)
        }
    }
)

router.put (
    "/products/:id", async (req, res, next) => {
        try {
            const productId = req.params.id
            const {size, quantity} = req.body

            const product = await Product.findById(productId);
            
            const sizeIndex = product.sizes.findIndex(s => s.size === size)
            if (sizeIndex !== -1) {
                product.sizes[sizeIndex].stock -= quantity
                await product.save()
                res.json(product)
            } else {
                return res.status (404).json({message: "Size not found"})
            }
        } catch (error) {
            next (error)
        }
    } 
)







module.exports = router;