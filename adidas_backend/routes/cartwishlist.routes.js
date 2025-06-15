import { Router } from "express";
import {
  AddToCart,
  AddToWishlist,
  buyProducts,
  DeleteCartProduct,
  DeleteWishlistProduct,
  GetAllCartProducts,
  GetAllWishlistProducts,
  getOrderDetails,
  UpdateCartQuantity
} from "../controllers/cartwishlist.controller.js";
import { checkIsUserValid } from "../middlewares/all.middlewares.js";

const router = Router();

//Cart Routes
router.get("/get-all-cart-products", checkIsUserValid, GetAllCartProducts);
router.post("/add-to-cart", checkIsUserValid, AddToCart);
router.post("/delete-cart-product", checkIsUserValid, DeleteCartProduct);
router.post("/buy-products", checkIsUserValid, buyProducts);
router.post("/update-cart-quantity", checkIsUserValid, UpdateCartQuantity);


//Orders
router.get("/get-order-details", checkIsUserValid, getOrderDetails);

// Wishlist Routes
router.get("/get-all-wishlist-products", checkIsUserValid, GetAllWishlistProducts);
router.post("/add-to-wishlist", checkIsUserValid, AddToWishlist);
router.post("/delete-wishlist-product", checkIsUserValid, DeleteWishlistProduct);

export default router;
