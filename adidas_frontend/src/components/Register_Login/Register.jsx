import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { MdCheck } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import './Register.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Api from '../../axiosconfig';

const Register = () => {
  const router = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  console.log(userData)

  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (userData.email && userData.password) {
        const response = await Api.post("/auth/register", { userData });
        if (response.data.success) {
          setUserData({
            email: "",
            password: "",
          });
          router("/sign-in");
          toast.success(response.data.message);
        }
      } else {
        toast.error("All fields are mandatory.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed.");
    }
  }

  useEffect(() => {
    const errorsArray = [];
    if (!userData.email) errorsArray.push("Email is required.");
    if (!userData.password) errorsArray.push("Password is required.");
    setErrors(errorsArray);
    setDisable(errorsArray.length > 0);
  }, [userData]);

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className='register-left'>
          <img src="https://www.adidas.co.in/glass/react/ad3ce49/assets/img/account-portal-page-inline.png" alt="adiclub visual" />
          <div className='register-join-club'>
            <h1>JOIN THE CLUB. GET REWARDED.</h1>
            <p>JOIN ADICLUB. GET REWARDED TODAY.</p>
            <ul>
              <li><MdCheck /> Free delivery</li>
              <li><MdCheck /> A 10% off voucher for your next purchase</li>
              <li><MdCheck /> Access to Members Only products and sales</li>
              <li><MdCheck /> Access to adidas Running</li>
              <li><MdCheck /> Special offers and promotions</li>
            </ul>
            <p className="register-join-description">
              Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
            </p>
          </div>
        </div>

        <div className='register-right'>
          <img className='register-adiclub-logo' src="https://account-frontends.adidas.com/_astro/adiclub-blue-desktop.CG118tV1.svg" alt="adiclub logo" />
          <h2>CREATE YOUR ADICLUB ACCOUNT</h2>
          <p className="register-subtext">Enjoy free shipping, discounts, and member-only products with adiClub.</p>
          <strong>Sign up with your email or social account</strong>

          <div className='register-social-icons'>
            <button><FcGoogle /></button>
            <button><FaFacebook /></button>
            <button><BsApple /></button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='register-input-field'
              placeholder="EMAIL ADDRESS or PHONE NUMBER *"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              className='register-input-field'
              placeholder="CREATE PASSWORD *"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />

            <div className='register-checkbox-group'>
              <label>
                <input type='checkbox' />
                <span>
                  I would like to stay up to date with adidas. I agree to receive personalised marketing messages from adidas India Marketing Pvt. Ltd. <a href="#">Read more</a>
                </span>
              </label>
              <label>
                <input type='checkbox' />
                <span>
                  I have read and accepted the <a href="#">Terms & Conditions</a>, the <a href="#">adiClub Terms & Conditions</a> and the adidas <a href="#">Privacy Policy</a>. *
                </span>
              </label>
              <label>
                <input type='checkbox' defaultChecked />
                <span>
                  Keep me logged in. Applies to all options. <br />
                  <a href="#">More info</a>
                </span>
              </label>
            </div>

            <button id="register-btn" type="submit" disabled={disable}>
              <div><p>REGISTER</p></div>
              <div><HiArrowLongRight style={{ color: "white", fontSize: "26px", fontWeight: "500" }} /></div>
            </button>
          </form>

          <div id="register2"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
