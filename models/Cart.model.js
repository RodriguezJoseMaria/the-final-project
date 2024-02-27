const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number
      }
    ]
  },
  {
    timestamps: true // This second object adds extra properties: `createdAt` and `updatedAt`
  }
);

const Cart = model("Cart", cartSchema); // Corrected the model name to "Cart"

module.exports = Cart; // Export the corrected model

