//here we will create our product Schema
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
  },
  price: { type: Number, required: true },
  images: [{ type: String }],
});

export const Product = models.Product || model("Product", ProductSchema);
