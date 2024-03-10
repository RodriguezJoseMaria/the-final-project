const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      unique: false,
    },
    gender: {
      type: String,
      required: true,
      unique: false,
    },
    sizes: [
      {
        size: String,
        stock: Number,
      },
    ],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
