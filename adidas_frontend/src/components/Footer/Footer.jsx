import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import "../Footer/Footer.css"
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const hideFooter1Routes = ["/cart"];
  const hideFooter1 = hideFooter1Routes.includes(location.pathname);
  return (
    <div>
         {!hideFooter1 && (<div className='joinadidas'>
            <p>Join adidas and get 10% OFF</p>
            <div id="signupforfree">
                <div><p>SIGN UP FOR FREE</p></div> <div><HiArrowLongRight  style={{color: "white", fontSize: "26px", fontWeight:"500px"}}/></div>
            </div>
            <div id="signupforfree2"></div>
        </div>)}
        <div className='footer'>
            {!hideFooter1 && (<div className='footer1'>
                <div className='products'>
                    <p>PRODUCTS</p>
                    <p>Footwear</p>
                    <p>Clothing</p>
                    <p>Accessories</p>
                    <p>Outlet-Sale</p>
                    <p>New Arrivals</p>
                    <p>Flat 50% Off!</p>
                </div>
                <div className='sports'>
                    <p>SPORTS</p>
                    <p>CRICKET</p>
                    <p>Running</p>
                    <p>Football</p>
                    <p>Gym/Training</p>
                    <p>Tennis</p>
                    <p>Outdoor</p>
                    <p>Basketball</p>
                    <p>Swimming</p>
                    <p>Skateboarding</p>
                    <p>Motosport</p>
                </div>
                <div className='collections'>
                    <p>COLLECTIONS</p>
                    <p>Ultraboost</p>
                    <p>Superstar</p>
                    <p>NMD</p>
                    <p>Stan Smith</p>
                    <p>Sustainability</p>
                    <p>Predator</p>
                    <p>Parley</p>
                    <p>Adicolor</p>
                </div>
                <div className='support'>
                    <p>SUPPORT</p>
                    <p>Help</p>
                    <p>Customer Services</p>
                    <p>Returns & Exchanges</p>
                    <p>Shipping</p>
                    <p>Order Tracker</p>
                    <p>Store Finder</p>
                    <p>adiClub</p>
                    <p>adiclub Terms and conditions</p>
                </div>
                <div className='companyinfo'>
                    <p>COMPANY INFO</p>
                    <p>About Us</p>
                    <p>adidas stories</p>
                    <p>adidas Apps</p>
                    <p>Entity Details</p>
                    <p>Press</p>
                    <p>Careers</p>
                </div>
                <div className='folloeus'>
                    <p>FOLLOW US</p>
                    <div className='instagram'><FaInstagram style={{color:"white"}}/></div>
                </div>
            </div> )}
            <div className='footer2'>
                <p>Privacy Policy  |  Terms and Conditions  |  Cookies</p>
                <p>©2024 adidas India Marketing Pvt. Ltd</p>
            </div>
        </div>
    </div>
  )
}

export default Footer