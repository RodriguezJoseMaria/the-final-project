const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get(
    "/cart", isAuthenticated, async (req, res, next) => {
         try {
          const userId = req.payload._id
          
          const cart = await Cart.findOne({userId}).populate('userId');
          if (!cart){
            const newCart = new Cart({ userId });
            await newCart.save();
            res.status(201).json(newCart);
          } else {
            res.status(200).json(cart);
          }
        
        } catch (error) {
            next (error)
         }
    }
)

router.post( "/cart/add-product", isAuthenticated, async (req, res, next) => {
            try {
            const userId = req.payload._id;
            const { productId, quantity } = req.body;
            
            const cart = await Cart.findOne({ userId });
            if (cart) {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex !== -1) {
          // Si el producto ya está en el carrito, actualizar la cantidad
            cart.products[productIndex].quantity += quantity;
            } else {
          // Si el producto no está en el carrito, agregarlo
          cart.products.push({ product: productId, quantity });
            }

            await cart.save();
            res.status(200).json(cart);
            } else {
            // Si no existe un carrito, crear uno nuevo y agregar el producto
            const newCart = new Cart({ userId, products: [{ product: productId, quantity }] });
            await newCart.save();
            res.status(201).json(newCart);
            }
        } catch (error) {
            next (error)
        }
    }
)

router.delete( "/cart/delete-product/:productId", isAuthenticated, async (req, res, next) => {
            try { const userId = req.payload._id;
            const productId = req.params.productId;

            const cart = await Cart.findOne({ userId });
            if (cart) {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex !== -1) {
            // Si el producto está en el carrito, eliminarlo
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.status(200).json(cart);
            } else {
            res.status(404).json({ message: "Product not found" });
            }
            } else {
            res.status(404).json({ message: "Cart not found" });
            }
    
        } catch (error) {
            next (error)
        }
    }
)

router.put( "/cart/update-product/:productId", isAuthenticated, async (req, res, next) => {
        try {
            const userId = req.payload._id;
            const productId = req.params.productId; const { quantity } = req.body;
        
            const cart = await Cart.findOne({ userId });
      if (cart) {
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex !== -1) {
          // Si el producto está en el carrito, actualizar la cantidad
          cart.products[productIndex].quantity = quantity;
          await cart.save();
          res.status(200).json(cart);
        } else {
          res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
      } else {
        res.status(404).json({ message: "Carrito no encontrado" });
      }
    
    } catch (error) {
        next (error)
        }
    }
)

module.exports = router;