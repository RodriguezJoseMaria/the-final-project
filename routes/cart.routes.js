const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get(
    "/cart", isAuthenticated, async (req, res, next) => {
         try {
          res.json(req.payload)
         } catch (error) {
            next (error)
         }
    }
)

module.exports = router;