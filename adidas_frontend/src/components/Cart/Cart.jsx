import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PiHeartStraight } from "react-icons/pi";
import { GoCheckCircle } from "react-icons/go";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa6";
import "../Cart/Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Api from "../../axiosconfig";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    getAllCartProducts();
  }, []);

  async function getAllCartProducts() {
    setLoading(true);
    try {
      const res = await Api.get("/cart-wishlist/get-all-cart-products");
      if (res.data.success) {
        setProducts(res.data.cartProducts);
        setTotalPrice(res.data.totalPrice);
      }
    } catch (err) {
      toast.error("Failed to fetch cart products");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (productId) => {
  // Optimistically update the UI
  setProducts((prev) => prev.filter((p) => p._id !== productId));

  try {
    const res = await Api.post("/cart-wishlist/delete-cart-product", { productId });
    if (!res.data.success) {
      toast.error("Failed to delete");
      // Re-fetch in case something went wrong
      getAllCartProducts();
    } else {
      toast.success("Deleted product");
    }
  } catch (error) {
    toast.error("Error deleting");
    getAllCartProducts(); // restore correct state on error
  }
};

const handleQuantityChange = async (productId, newQuantity) => {
  // Optimistically update the UI
  setProducts(prevProducts =>
    prevProducts.map(product =>
      product._id === productId ? { ...product, quantity: newQuantity } : product
    )
  );

  try {
    const res = await Api.post("/cart-wishlist/update-cart-quantity", { productId, quantity: newQuantity });
    if (res.data.success) {
      toast.success("Cart updated successfully");
      getAllCartProducts(); // Re-fetch cart products to reflect the changes
    } else {
      toast.error(res.data.error);
    }
  } catch (err) {
    toast.error("Failed to update cart");
    getAllCartProducts(); // Restore correct state on error
  }
};


  const BuyProducts = async () => {
    try {
      const res = await Api.post("/cart-wishlist/buy-products");
      if (res.data.success) {
        toast.success("Order placed successfully!");
        router("/order-details");
      }
    } catch (err) {
      toast.error("Order failed");
    }
  };


  useEffect(() => {
    getAllCartProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        {/* Left Section */}
        <div className="cartleft">
          <div className="username">
            <p>User name from database</p>
          </div>

          <div className="yourbag">
            <p>YOUR BAG</p>
            <p>
              <span>
                TOTAL ({products.length} item{products.length !== 1 && "s"}) ₹{" "}
                {totalPrice}
              </span>
            </p>
            <p>
              Items in your bag are not reserved — check out now to make them
              yours.
            </p>
          </div>

          <div className="buy2getextra">
            <p>BUY 2 GET EXTRA 20% OFF!</p>
            <p>
              Get an extra 20% off when you buy 2 or more selected items{" "}
              <u>SHOP HERE</u>
            </p>
          </div>

          {/* Cart Products */}
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-card-left" onClick={() => router(`/single-product/${product._id}`)}>
                <img src={product.image} alt="product" />
              </div>
              <div className="product-card-right">
                <div className="title-price-row">
                  <div className="product-title">
                    <p>{product.name}</p>
                    <div className="product-color">{product.title}</div>
                  </div>
                  <div className="price-cross-heart">
                    <div className="price">₹{product.price}</div>
                    <div className="cross-heart">
                      <RxCross2
                        size={24}
                        onClick={() => handleDelete(product._id)}
                        style={{ cursor: "pointer" }}
                      />
                      <PiHeartStraight
                        style={{
                          color: "black",
                          fontSize: "22px",
                          fontWeight: "500",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <div className="quantity">
  <button onClick={() => handleQuantityChange(product._id, product.quantity - 1)}>-</button>
  <span>{product.quantity}</span>
  <button onClick={() => handleQuantityChange(product._id, product.quantity + 1)}>+</button>
</div>
                </div>
              </div>
            </div>
          ))}

          <div className="freedelretsafe">
            <p>
              <GoCheckCircle />
              <span>Free Delivery</span>
            </p>
            <p>
              <GoCheckCircle />
              <span>14 Days Free Returns & Exchange</span>
            </p>
            <p>
              <GoCheckCircle />
              <span>Safe & Secure Payment Options</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="cart-right">
          <p>ORDER SUMMARY</p>
          <div className="order-summary">
            <div className="order-summary-left">
              <p>{products.length} item(s)</p>
              <p>Delivery</p>
              <p>Total</p>
              <p>(Inclusive of all taxes)</p>
            </div>
            <div className="order-summary-right">
              <p>₹{totalPrice}</p>
              <p>Free</p>
              <p>₹{totalPrice}</p>
            </div>
          </div>

          <div className="promo-code">
            <img
              src="https://www.adidas.co.in/static/checkout/react/7235cad/assets/img/illustrations/promo-code.svg"
              alt="Promo"
            />
            <span>USE A PROMO CODE</span>
          </div>

          <div id="checkout" onClick={BuyProducts}>
            <div>CHECKOUT</div>
            <div>
              <HiArrowLongRight style={{ fontSize: "26px" }} />
            </div>
          </div>

          <div className="payment">
            <div className="payments-text">
              <p>Accepted payment methods</p>
            </div>
            <div className="payment-methods">
              <img
                src="https://www.adidas.co.in/static/checkout/react/7235cad/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"
                alt="MasterCard"
              />
              <img
                src="https://www.adidas.co.in/static/checkout/react/7235cad/assets/img/accepted-payment-methods/icon-adidas-visa.svg"
                alt="Visa"
              />
              <img
                src="https://www.adidas.co.in/static/checkout/react/7235cad/assets/img/accepted-payment-methods/icon-adidas-upi.svg"
                alt="UPI"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
