import { Router } from "express";
import { router as userRoutes } from "./userRoutes";
import { router as productRoutes } from "./productRoutes";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
export { router };