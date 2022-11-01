import { Request, Response } from "express";
import { ProductModel } from "../database/products/product.model";




export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, category, image, createdBy } = req.body;
        // check if all fields are filled

        if (!name || !price || !description || !category || !image || !createdBy) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide all required fields",
            });
        }
        const product = await ProductModel.create({ createdBy, name, price, description, category, image });
        return res.status(201).json({ product });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, category, image, id } = req.body;
        // check if all fields are filled
        if (!name || !price || !description || !category || !image) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide all required fields",
            });
        }
        const product = await ProductModel.findByIdAndUpdate(id, { name, price, description, category, image }, { new: true });
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        return res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export const getProductsBySearch = async (req: Request, res: Response) => {
    try {
        const { searchQuery } = req.query;
        const products = await ProductModel.find({ $search: searchQuery as string });
        console.log(products);
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error });
    }
}