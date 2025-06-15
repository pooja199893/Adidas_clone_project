import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Add to Cart
export const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ success: false, error: "User and Product ID required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, cartProducts: [productId] });
    } else {
      if (!cart.cartProducts.includes(productId)) {
        cart.cartProducts.push(productId);
      } else {
        return res.json({ success: true, message: "Product already in cart" });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Product added to cart" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Cart Products
export const GetAllCartProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.json({ success: true, cartProducts: [], totalPrice: 0 });

    const products = await Product.find({ _id: { $in: cart.cartProducts } });

    const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

    res.json({ success: true, cartProducts: products, totalPrice });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Product from Cart
export const DeleteCartProduct = async (req, res) => {
  try {
      const { productId } = req.body;
      console.log(productId)
      const deletedCartProduct = await Product.findByIdAndDelete(productId);
      if (!deletedCartProduct) {
          return res.json({ success: false, error: "Product not found." });
      }
      res.json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
      return res.json({ error, success: false });
  }
};

// Add to Wishlist
export const AddToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, wishlistProducts: [productId] });
    } else {
      if (!cart.wishlistProducts.includes(productId)) {
        cart.wishlistProducts.push(productId);
      } else {
        return res.json({ success: true, message: "Product already in wishlist" });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Product added to wishlist" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Cart Quantity
export const UpdateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, error: "Invalid product ID or quantity" });
    }

    // Check if the product exists in the cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || !cart.cartProducts.includes(productId)) {
      return res.status(404).json({ success: false, error: "Product not found in cart" });
    }

    // Update quantity in the Product collection
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    product.quantity = quantity;
    await product.save();

    res.json({ success: true, message: "Product quantity updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Wishlist Products
export const GetAllWishlistProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId });

    const products = await Product.find({ _id: { $in: cart?.wishlistProducts || [] } });

    res.json({ success: true, wishlistProducts: products });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const DeleteWishlistProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const wishlist = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { wishlistProducts: productId } },
      { new: true }
    );

    if (!wishlist) {
      return res.json({ success: false, message: "Wishlist not found" });
    }

    res.json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const buyProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate('cartProducts');

    if (!cart || cart.cartProducts.length === 0) {
      return res.json({ success: false, message: 'Your cart is empty.' });
    }

    // Calculate total price from populated products
    const totalPrice = cart.cartProducts.reduce((acc, product) => acc + product.price, 0);

    // Create new order
    const newOrder = new Order({
      user: userId,
      products: cart.cartProducts.map(prod => prod._id), // Store only product IDs
      totalPaidAmount: totalPrice,
    });

    await newOrder.save();

    // Clear the cart after purchase
    cart.cartProducts = [];
    await cart.save();

    return res.json({
      success: true,
      message: 'Your order has been placed successfully!',
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, error: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId }).populate('products');

    if (!orders || orders.length === 0) {
      return res.json({ success: false, message: 'No orders found.' });
    }

    return res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, error: error.message });
  }
};

