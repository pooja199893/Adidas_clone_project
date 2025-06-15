import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { PiHeartStraight } from "react-icons/pi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import "../Navbar/Navbar.css";
import LoginPopup from '../LoginPopup';
import { AuthContext } from '../../context/auth.context'; // Import your auth context

const Navbar = () => {
  const router = useNavigate();
  const location = useLocation();
  const { state: authState } = useContext(AuthContext); // Get auth state (assumed)
  const [showPopup, setShowPopup] = useState(false);

  const hideNavbar3Routes = ["/men", "/women", "/kids", "/sign-in","/cart"];
  const hideNavbar3 = hideNavbar3Routes.includes(location.pathname);

  const messages = [
  "FREE DELIVERY, RETURN & EXCHANGE",
  "EXTRA 5% OFF ON PREPAID ORDERS",
  "SIGN-UP & GET 10% OFF"
];
  const [index, setIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 5000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="Navbar">
        <div className="Navbar1">
          <div key={index} className="fade-message">
            {messages[index]} <FaAngleDown />
          </div>
        </div>
      </div>

      <div className="Navbar2">
        <div className="leftNavbar2">
          <div id='leftnavbarimg' onClick={() => router("/")}>
            <img
              alt="icon"
              src="https://static.vecteezy.com/system/resources/previews/010/994/239/non_2x/adidas-logo-black-symbol-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg"
            />
          </div>
          <div className='leftNavbar2_1'>
            <span>SHOES</span>
            <span onClick={() => router("/men")}>MEN</span>
            <span onClick={() => router("/women")}>WOMEN</span>
            <span onClick={() => router("/kids")}>KIDS</span>
            <span>SPORTS & LIFESTYLE</span>
            <span>OUTLET</span>
          </div>
        </div>

        <div className="rightNavbar2">
          <div className='rightNavbar2_1'>
            <span>help</span>
            <span>orders and returns</span>
            <span>sign up</span>
            {authState?.user ? (
              <span onClick={() => router("/profile")}>
                Welcome, <b>{authState.user.name || authState.user.email.split("@")[0]}</b>
              </span>
            ) : (
              <span onClick={() => router("/sign-in")}>log in</span>
            )}
          </div>
          <div className="rightNavbar2_2">
            <div className="search">
              <span>Search</span>
              <IoSearch style={{ color: "black", fontSize: "22px", fontWeight: "500px" }} />
            </div>
            <div className="cartprof">
              <div>
                <h3>
                  <RiUser3Line
                    onClick={() => setShowPopup(true)}
                    style={{ color: "black", fontSize: "22px", fontWeight: "500px", cursor: "pointer" }}
                  />
                </h3>
              </div>
              <div onClick={() => router("/wishlist")}><PiHeartStraight style={{ color: "black", fontSize: "22px", fontWeight: "500px" }} /></div>
              <div onClick={() => router("/cart")}><MdOutlineShoppingBag style={{ color: "black", fontSize: "22px", fontWeight: "500px" }} /></div>
            </div>
          </div>
        </div>
      </div>

      {!hideNavbar3 && (
        <div className="Navbar3">
          <div>Buy 2, Save an extra 20%! Exclusive Offer on Curated Picks this May!</div>
          <div>
            <span><HiArrowLongRight style={{ color: "black", fontSize: "26px", fontWeight: "500" }} /></span>
          </div>
        </div>
      )}

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Navbar;
