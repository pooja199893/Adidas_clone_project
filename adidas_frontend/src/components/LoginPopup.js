import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { RxCross2 } from 'react-icons/rx';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Api from '../axiosconfig';
import { AuthContext } from '../context/auth.context';

const LoginPopup = ({ onClose }) => {
  const router = useNavigate();
  const [step, setStep] = useState('email');
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.email && userData.password) {
        const response = await Api.post("/auth/login", userData);
        if (response.data.success) {
          dispatch({ type: "LOGIN", payload: response.data.userData });
          toast.success(response.data.message || "Login successful!");
          onClose();
          navigate("/");
        } else {
          toast.error(response.data.error || "Login failed.");
        }
      } else {
        toast.error("All fields are mandatory.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="login-popup">
        <button className="popup-close-btn" onClick={onClose}><RxCross2 size={24} /></button>
        <div className="popup-content">
          <img
            src="https://account-frontends.adidas.com/_astro/adiclub-blue-desktop.CG118tV1.svg"
            alt="adiClub"
            className="popup-adiclub-logo"
          />
          <h2 className="popup-heading">YOUR ADICLUB BENEFITS AWAIT</h2>
          <p className="popup-subtext">Get free shipping, discount vouchers and members only products when you’re in adiClub.</p>
          <p className="popup-signin-text"><strong>Log in or sign up (it’s free)</strong></p>
          <span className="popup-login-create-link">Don’t have an account? <span onClick={() => router("/sign-up")}>Create account</span></span>

          {step === 'email' && (
            <div className="popup-social-icons">
              <button><FcGoogle size={24} /></button>
              <button><FaFacebook size={24} /></button>
              <button><BsApple size={24} /></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 'email' ? (
              <>
                <input
                  type="text"
                  name="email"
                  className="popup-email-input"
                  placeholder="EMAIL ADDRESS or PHONE NUMBER *"
                  value={userData.email}
                  onChange={handleChange}
                />
                <label className="popup-checkbox-container">
                  <input type="checkbox" />
                  <span>
                    I would like to stay up to date with adidas. I agree to receive personalised marketing messages from adidas India Marketing Pvt. Ltd. <a href="#">Read more</a>
                  </span>
                </label>

                <label className="popup-checkbox-container">
                  <input type="checkbox" />
                  <span>
                    I have read and accepted the <a href="#">Terms & Conditions</a>, the <a href="#">adiClub Terms & Conditions</a> and the adidas <a href="#">Privacy Policy</a>. *
                  </span>
                </label>

                <label className="popup-checkbox-container">
                  <input type="checkbox" checked readOnly />
                  <span>Keep me logged in. Applies to all options. <a href="#">More info</a></span>
                </label>

                <button type="button" className="popup-continue-btn" onClick={handleContinue}>
                  CONTINUE <HiArrowLongRight />
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  name="password"
                  className="popup-email-input"
                  placeholder="ENTER PASSWORD"
                  value={userData.password}
                  onChange={handleChange}
                />
                <button type="submit" className="popup-continue-btn">
                  SIGN IN <HiArrowLongRight />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
