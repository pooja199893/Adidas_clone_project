import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Api from "../../axiosconfig";
import "../Cart/Cart.css"; // Reusing Cart styles

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/cart-wishlist/get-order-details");
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToCart = () => router("/cart");

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cartleft">
          <div className="username">
            <p>My Orders</p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id}>
                <div className="yourbag">
                  <p>ORDER ID: {order._id}</p>
                  <p>
                    <span>
                      TOTAL PAID ({order.products.length} item{order.products.length !== 1 && "s"}): ₹{order.totalPaidAmount}
                    </span>
                  </p>
                  <p>Thank you for shopping with us!</p>
                </div>

                {order.products.map((product) => (
                  <div className="product-card" key={product._id}>
                    <div className="product-card-left">
                      <img src={product.image} alt="product" />
                    </div>
                    <div className="product-card-right">
                      <div className="title-price-row">
                        <div className="product-title">
                          <p>{product.name}</p>
                          <div className="product-color">{product.title}</div>
                          <div className="product-size">Quantity: {product.quantity}</div>
                        </div>
                        <div className="price-cross-heart">
                          <div className="price">₹{product.price}</div>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="quantity">
                          <span>{product.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}

          <button
            onClick={goToCart}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              alignSelf: "flex-start"
            }}
          >
            Back to Cart
          </button>
        </div>

        <div className="cart-right">
          <p>ORDER HISTORY</p>
          <div className="order-summary">
            <div className="order-summary-left">
              <p>Total Orders</p>
              <p>Total Spent</p>
            </div>
            <div className="order-summary-right">
              <p>{orders.length}</p>
              <p>
                ₹{orders.reduce((sum, o) => sum + o.totalPaidAmount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
