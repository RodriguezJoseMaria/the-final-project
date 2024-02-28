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
            const {nameProduct, price, category, gender} = req.body;
            const newProduct = await Product.create({nameProduct, price, category, gender});
            res.status(204).json(newProduct);
        } catch (error) {
            next (error)
        }
}
)







module.exports = router;