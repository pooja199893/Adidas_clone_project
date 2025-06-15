import React, { useContext, useEffect, useState } from 'react';
import './SingleProduct.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { IoCheckmark } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { ImLoop } from "react-icons/im";
import { CiDiscount1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';
import { AuthContext } from '../../context/auth.context';

const SingleProduct = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [transformOrigin, setTransformOrigin] = useState('center');
  const [error, setError] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - left) / width) * 100;
    const yPercent = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${xPercent}% ${yPercent}%`);
  };

  const handleMouseLeave = () => setTransformOrigin('center');

  const getProduct = async () => {
  try {
    const res = await Api.post(`/product/get-single-product/${id}`);
    if (res.data.success) {
      setProduct(res.data.product);
    } else {
      setError(res.data.error || "Failed to fetch product");
    }
  } catch (error) {
    setError("Something went wrong");
    console.error(error);
  }
};

  const AddToCart = async () => {
    try {
      const res = await Api.post('/cart-wishlist/add-to-cart', {
        userId: state?.user?.userId,
        productId: id,
      });
      if (res.data.success) toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const AddToWishlist = async () => {
    try {
      const res = await Api.post('/cart-wishlist/add-to-wishlist', {
        userId: state?.user?.userId,
        productId: id,
      });
      if (res.data.success) toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  if (!product) return <div className="single-product-container"><h2>Loading...</h2></div>;

  return (
    <div>
      <Navbar />
      <div className="single-product-container">
        {/* Left Side */}
        <div className="product-left">
          <div className="product-image-grid">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="image-box"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ transformOrigin }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="product-right">
          <div className="product-summary">
            <p className="category">{product.category || "Lifestyle"}</p>
            <h2 className="title">{product.title}</h2>
            <h3 className="price">₹{product.price}</h3>
            <p className="tax-info">MRP in Indian currency per pair<br />Inclusive of all taxes</p>
            <p className="offer">
              Buy 2 or more & get an extra 20% off this item. Offer applies to selected products only. <a href="#">SHOP HERE</a>
            </p>
          </div>

          {/* Voucher */}
          <div className="voucher">
            <p className="section-heading">Your adiClub voucher</p>
            <p className="voucher-code">VOUCHER 10% OFF</p>
            <button className="copy-btn">Copy Code</button>
          </div>

          {/* Sizes */}
          <div className="sizes">
            <p className="section-heading">Sizes</p>
            <div className="size-grid">
              {["6", "7", "8", "9", "10", "11", "12"].map(size => (
                <div key={size} className="size-box">{size}</div>
              ))}
            </div>
            <p className="fit-info">True to size. We recommend ordering your usual size.</p>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className="add-to-bag" onClick={AddToCart}>Add To Bag</button>
            <button className="wishlist" onClick={AddToWishlist}>Add to Wishlist</button>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            <p><TbTruckDelivery /><strong> Free Delivery, Free Returns</strong></p>
            <p><TbTruckDelivery /> Delivery: Delhi, Gurgaon: 1-2 Days, Metro cities: 2-3 days, Others: 3-5 days</p>
            <p><IoCheckmark /> COD available for orders below ₹5000</p>
            <p><ImLoop /> Secure transactions with hassle free 14 days Exchange and Returns</p>
            <p><CiDiscount1 /> Save 5% on all Online Payments under Rs 5000/-</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
