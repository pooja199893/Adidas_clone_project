import React, { useContext, useState } from 'react';
import { MdCheck } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import './Login.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();

  const [step, setStep] = useState('email');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (userData.email.trim()) {
      setStep('password');
    } else {
      toast.error("Please enter your email or phone number");
    }
  };

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    if (userData.email && userData.password) {
      const response = await Api.post("/auth/login", userData); // ✅ FIXED
      console.log("Login Response:", response.data); // ✅ DEBUGGING

      if (response.data.success) {
        dispatch({ type: "LOGIN", payload: response.data.userData });
        setUserData({ email: "", password: "" });
        router("/");
        toast.success(
          typeof response.data.message === "string"
            ? response.data.message
            : "Login successful!"
        );
      } else {
        toast.error(
          typeof response?.data?.error === "string"
            ? response.data.error
            : "Login failed. Please try again."
        );
      }
    } else {
      toast.error("All fields are mandatory.");
    }
  } catch (error) {
    console.log(error?.response?.data, "Login error"); // ✅ Extra log
    toast.error(
      typeof error?.response?.data?.error === "string"
        ? error.response.data.error
        : "Something went wrong. Please try again."
    );
  }
}



  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className='login-left'>
          <img src="https://www.adidas.co.in/glass/react/ad3ce49/assets/img/account-portal-page-inline.png" alt="adiclub visual" />
          <div className='join-club'>
            <h1>JOIN THE CLUB. GET REWARDED.</h1>
            <p>JOIN ADICLUB. GET REWARDED TODAY.</p>
            <ul>
              <li><MdCheck /> Free delivery</li>
              <li><MdCheck /> A 10% off voucher for your next purchase</li>
              <li><MdCheck /> Access to Members Only products and sales</li>
              <li><MdCheck /> Access to adidas Running</li>
              <li><MdCheck /> Special offers and promotions</li>
            </ul>
            <p className="join-description">
              Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
            </p>
          </div>
        </div>

        <div className='login-right'>
          <img className='adiclub-logo' src="https://account-frontends.adidas.com/_astro/adiclub-blue-desktop.CG118tV1.svg" alt="adiclub logo" />
          <h2>YOUR ADICLUB BENEFITS AWAIT</h2>
          <p className="subtext">Get free shipping, discount vouchers and members only products when you're in adiClub.</p>
          <div className="login-row-info">
            <strong>Log in or sign up (it’s free)</strong>
            <span className="login-create-link">Don’t have an account? <span onClick={() => router("/sign-up")}>Create account</span></span>
          </div>

          {step === 'email' && (
            <div className='social-icons'>
              <button><FcGoogle /></button>
              <button><FaFacebook /></button>
              <button><BsApple /></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 'email' ? (
              <input
                type="text"
                className='input-field'
                placeholder="EMAIL ADDRESS or PHONE NUMBER *"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            ) : (
              <input
                type="password"
                className='input-field'
                placeholder="ENTER PASSWORD"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            )}

            {step === 'email' && (
              <>
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox' required/>
                    <span>
                      I would like to stay up to date with adidas. I agree to receive personalised marketing messages from adidas India Marketing Pvt. Ltd. <a href="#">Read more</a>
                    </span>
                  </label>
                  <label>
                    <input type='checkbox' required/>
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

                <div id="continue" onClick={handleContinue}>
                  <div><p>CONTINUE</p></div>
                  <div><HiArrowLongRight style={{ color: "white", fontSize: "26px", fontWeight: "500" }} /></div>
                </div>

                <div id="continue2"></div>
              </>
            )}

            {step === 'password' && (
              <>
                <button id="signin-btn" type="submit">
                  <div><p>SIGN IN</p></div>
                  <div><HiArrowLongRight style={{ color: "white", fontSize: "26px", fontWeight: "500" }} /></div>
                </button>

                <div id="signin2"></div>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
