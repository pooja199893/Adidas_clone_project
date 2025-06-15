import { Router } from "express";
import AuthRoutes from "../routes/auth.routes.js"
import AdminRoutes from "./admin.routes.js";
import ProductRoutes from "../routes/product.routes.js"
import CartWishlistRoutes from "../routes/cartwishlist.routes.js"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/product", ProductRoutes);
router.use("/cart-wishlist", CartWishlistRoutes);

export default router;