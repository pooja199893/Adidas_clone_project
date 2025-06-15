import { Router } from "express";
import { LoginAdmin, LogoutAdmin, RegisterAdmin, YourAddedProducts } from "../controllers/admin.controller.js";

const router=Router();

router.post("/register-admin", RegisterAdmin);
router.post("/login-admin", LoginAdmin);
router.post("/logout-admin", LogoutAdmin);
router.post("/your-added-products", YourAddedProducts);

export default router;