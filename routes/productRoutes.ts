import { Router } from "express";
import passport from 'passport';
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, getProductsBySearch } from "../controller/product.controller";


const router: Router = Router();

router.get("/get-product/:id", passport.authenticate("jwt", { session: false }), getProduct);
router.get("/get-products", passport.authenticate("jwt", { session: false }), getProducts);
router.post("/create", passport.authenticate("jwt", { session: false }), createProduct);
router.put("/update", passport.authenticate("jwt", { session: false }), updateProduct);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deleteProduct);
router.get("/search", passport.authenticate("jwt", { session: false }), getProductsBySearch);


export { router };

