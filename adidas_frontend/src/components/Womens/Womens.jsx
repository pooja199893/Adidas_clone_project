import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import "../Womens/Womens.css"
import { HiArrowLongRight } from "react-icons/hi2";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";

const ITEMS_PER_PAGE = 4;
const cardWidth = 330;
const scrollStep = cardWidth * 4;
const Womens = () => {
  const router = useNavigate();
  const { state } = useContext(AuthContext);

  const [whathotitem1, setWhathotitem1] = useState([
      { itemimg: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/tc_2_2_6857c6a386.jpg", title: "Play your best Padel", desc: "Get ready for your next Padel session with the best from adidas.", category: "SHOP NOW" },
      { itemimg: "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/TC_Gif_1050x1400_47a5f13a3c.gif", title: "Man Utd Bring Back", desc: "Wear the legacy of '91.", category: "Shop now" },
      { itemimg: "https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_600,w_600/global_the_original_originals_ss25_sustain_hp_superstar_teaser_carousel_asset_m_e6ae649ffa.mp4", title: "The Original Superstar", desc: "From the court to the street.", category: "Shop now" },
      { itemimg: "https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_600,w_600/global_move_for_the_planet_brand_ss25_introduce_onsite_tc_m_5f49084be2.mp4", title: "MOVE FOR THE PLANET", desc: "What places inspire you to move?", category: "Learn More" },
      { itemimg: "https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_600,w_600/global_motorsports_motorsports_ss25_sustain_hp_catlp_glp_navigation_card_teaser_6_m_46decc9dc4.mp4", title: "Show Your Passion", desc: "The adidas x Mercedes-AMG PETRONAS F1 Fanwear collection.", category: "SHOP NOW" }
  ]);

  const[adimertop2,setAdimertop2]=useState([])
  const [wishlistItems, setWishlistItems] = useState([]);

  const sliderRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(adimertop2.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleClothes = adimertop2.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
    const nextPage = () => {
      if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };
  
    const prevPage = () => {
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
  
    const handleScroll = (direction) => {
      if (!sliderRef.current) return;
      const container = sliderRef.current;
  
      const scrollAmount = direction === "right" ? scrollStep : -scrollStep;
  
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
  
      setShowLeftArrow(container.scrollLeft + scrollAmount > 0);
    };

    async function fetchWomenProducts() {
    try {
      const response = await Api.get("/product/women");
      if (response.data.success) {
        setAdimertop2(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleWishlist = async (productId) => {
  if (!state?.user?.userId) {
    toast.error("Please log in to use wishlist.");
    return;
  }

  const isWishlisted = wishlistItems.includes(productId);

  if (isWishlisted) {
    // Remove from wishlist
    try {
      const res = await Api.post("/cart-wishlist/delete-wishlist-product", { productId });
      if (res.data.success) {
        toast.success("Removed from wishlist");
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Error removing from wishlist");
    }
  } else {
    // Add to wishlist
    try {
      const res = await Api.post("/cart-wishlist/add-to-wishlist", {
        userId: state?.user?.userId,
        productId: productId,
      });
      if (res.data.success) {
        toast.success("Added to wishlist");
        setWishlistItems((prev) => [...prev, productId]);
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
    }
  }
};


const fetchWishlist = async () => {
  try {
    const res = await Api.get(`/cart-wishlist/user-wishlist/${state?.user?.userId}`);
    if (res.data.success) {
      setWishlistItems(res.data.products.map((p) => p._id));
    }
  } catch (error) {
    console.log("Failed to fetch wishlist", error);
  }
};
  useEffect(() => {
  fetchWomenProducts();
  fetchWishlist();
}, []);


  return (
    <div>
      <Navbar/>
      <div className='womensnav'>
          <p>BROWSE ALL PRODUCTS FOR WOMENS</p>
      </div>
      <div className='supernovarise2_1'>
        <img src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/global_supernova_running_ss25_early_access_fglp_banner_hero_d_1b2793ab1c.jpg' />
        <div id="supernovarise2_1text1">
          <p>SUPERNOVA RISE 2</p>
        </div>
        <div id="supernovarise2_1text2">
          <p>Running is never easy, but with the Supercomfort of</p>
        </div>
        <div id="supernovarise2_1text3">
          <p>Supernova, it's always nice.</p>
        </div>
        <div id="supernovarise2_1shopnow">
          <div><p>SHOP NOW</p></div>
          <div><HiArrowLongRight style={{ color: "black", fontSize: "26px", fontWeight: "500px" }} /></div>
        </div>
        <div id="supernovarise2_1shopnow2"></div>
      </div>

      <div className="whatshot3">
        <div className="whatshot3-header">
          <h2>WHAT'S HOT ?</h2>
        </div>

        <div
          className="whatshot3-slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showLeftArrow && isHovered && (
            <button className="slider-arrow4 left" onClick={() => handleScroll("left")}>
              <PiCaretLeftBold />
            </button>
          )}

          {isHovered && (
            <button className="slider-arrow4 right" onClick={() => handleScroll("right")}>
              <PiCaretRightBold />
            </button>
          )}

          <div className="whatshot3-slider-container" ref={sliderRef}>
            {whathotitem1.map((item, index) => (
              <div className="whatshot3-card" key={index}>
                <div className="whatshot3-hover-container">
                  <div className="whatshot3-media">
                    {index < 2 ? (
                      <img src={item.itemimg} alt={item.title} />
                    ) : (
                      <video
                        src={item.itemimg}
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    )}
                  </div>
                  <div className="whatshot3-details">
                    <div className="whatshot3-title">{item.title}</div>
                    <div className="whatshot3-desc">{item.desc}</div>
                    <div className="whatshot3-spacer"></div>
                    <div className="whatshot3-category">{item.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='pictureperfect2'>
        <img src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/MH_28c847a0d8.jpg'/>
        <div id="pictureperfect2text1">
          <p>PICTURE PERFECT</p>
        </div>
        <div id="pictureperfect2text2">
          <p>Wear these vacation looks on repeat.</p>
        </div>
        <div id="pictureperfect2shopnow">
          <div><p>SHOP NOW</p></div> <div><HiArrowLongRight  style={{color: "black", fontSize: "26px", fontWeight:"500px"}}/></div>
        </div>
        <div id="pictureperfect2shopnow2"></div>
      </div>

      <div className='carousel-section'>
        <div className='carousel-header'>
          <div className='carousel-title'>adidas x Mercedes-AMG PETRONAS F1</div>
          <div className='carousel-subtitle'>Top picks for you</div>
        </div>

        <div className='carousel-container'>
          <div className='carousel-wrapper'>
            <button onClick={prevPage} disabled={currentPage === 0} className='carousel-arrow left'>
              <PiCaretLeftBold />
            </button>

            <div className="carousel-list">
              {visibleClothes.map((item, index) => (
                <div className="carousel-card" key={index} onClick={() => router(`/single-product/${item._id}`)}>
                  <div className="card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="wishlist-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item._id);
                      }}
                    >
                      {wishlistItems.includes(item._id) ? (
                        <FaHeart
                          style={{ color: "black", fontSize: "22px", fontWeight: "500" }}
                        />
                      ) : (
                        <PiHeartStraight
                          style={{ color: "gray", fontSize: "22px", fontWeight: "500" }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="card-price">₹{item.price}</div>
                  <div className="card-title">{item.title}</div>
                  <div className="card-category">{item.category2}</div>
                </div>
              ))}
            </div>


            <button onClick={nextPage} disabled={currentPage === totalPages - 1} className='carousel-arrow right'>
              <PiCaretRightBold />
            </button>
          </div>

          <div className="carousel-progress-container">
            <div className="carousel-progress-bar" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className='womensclothdesc'>
        <h1>WOMEN’S CLOTHING & SHOES</h1>
        <p>In sport and in life, creators aren’t content on the sidelines. adidas women’s shoes and apparel are made for those who understand that rules can be negotiated; expectations, evolved. Reach for a new personal best in apparel made of specialized performance fabrics. Accentuate your personal style in sport-inspired sneakers for your day-to-day. Whether sport is your life or you’re an athleisure fashionista, women’s clothing and footwear from adidas exist to help you redefine what’s possible.</p>
      </div>

      <div className='womenscategories'>
          <div className='womenscategories2'>
            <div className='womens-shoes'>
              <p>WOMEN'S SHOES</p>
              <p>Women's Shoes</p>
              <p>Women's Sneakers</p>
              <p>Women's Flip Flops</p>
              <p>Women's White Sneakers</p>
              <p>Women's Black Sneakers</p>
            </div>
            <div className='womens-clothing'>
              <p>WOMEN'S CLOTHING</p>
              <p>Women's Sports Bra</p>
              <p>Women's Hoodies</p>
              <p>Women's Jackets</p>
              <p>Women's Tracksuits</p>
              <p>Women's T-Shirts</p>
            </div>
            <div className='womens-accessories'>
              <p>WOMEN'S ACCESSORIES</p>
              <p>Women's Backpacks</p>
              <p>Women's Bags</p>
              <p>Women's Socks</p>
              <p>Women's Hat</p>
              <p>Women's Training Bag</p>
            </div>
            <div className='womens-collections'>
              <p>WOMEN'S COLLECTIONS</p>
              <p>Women's Running Shoes</p>
              <p>Women's Football Shoes</p>
              <p>Women's Walking Shoes</p>
              <p>Women's Training Shoes</p>
              <p>Women's Cricket Shoes</p>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Womens