import { model } from "mongoose";
import productSchema from "./product.schema";

export const ProductModel = model("product", productSchema);