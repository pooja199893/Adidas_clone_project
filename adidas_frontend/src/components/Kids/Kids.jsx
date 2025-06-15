import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import "../Kids/Kids.css"
import { HiArrowLongRight } from "react-icons/hi2";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/auth.context';
import { FaHeart } from "react-icons/fa";

const ITEMS_PER_PAGE = 4;
const cardWidth = 330;
const scrollStep = cardWidth * 4;
const Kids = () => {
  const router = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
      const { state } = useContext(AuthContext);
    const [whathotitem1, setWhathotitem1] = useState([
          { itemimg: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/global_zne_sportswear_ss25_launch_kglp_navigation_card_teaser_1_d_c07c100d10.jpg", title: "ADIDAS Z.N.E.", desc: "The lines that connect us.", category: "Shop now" },
          { itemimg: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/global_franchise_toolkit_samba_q1_originals_ss25_launch_navigation_card_teaser_kids_glp_d_626a27dbc1.jpg", title: "Samba", desc: "Iconic style in every step.", category: "SHOP NOW" },
          { itemimg: "https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_600,w_600/Global_Disney_Marvel_Superheroes_Commercial_SS_25_Launch_Navigation_Card_Teaser_1_Hp_Glp_m_20fa9d3402.mp4", title: "adidas | Marvel: Avengers", desc: "Assemble for your new adventure.", category: "SHOP NOW" },
          { itemimg: "https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_600,w_600/Horizontal_FW_24_disney_starwars_global_launch_HP_teaser_m_6b9ca8a685.mp4", title: "adidas | Star Wars", desc: '"The dark side" has never been this fun."', category: "SHOP NOW" },
          { itemimg: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/Horizontal_FW_24_disney_lionking_global_launch_HP_and_kids_LP_carousel_mini_lookbook1_d_e12b29aa80.jpg", title: "adidas | Disney: The Lion King", desc: "For every brave adventure.", category: "SHOP NOW" }
    ]);

    const[adimertop3,setAdimertop3]=useState([])
    
    
    const sliderRef = useRef(null);
        const [showLeftArrow, setShowLeftArrow] = useState(false);
        const [isHovered, setIsHovered] = useState(false);
      
        const [currentPage, setCurrentPage] = useState(0);
        const totalPages = Math.ceil(adimertop3.length / ITEMS_PER_PAGE);
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const visibleClothes = adimertop3.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
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

  const fetchKidsProducts = async () => {
    try {
      const response = await Api.get("/product/kids");
      if (response.data.success) {
        setAdimertop3(response.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch kids products:", error);
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

const toggleWishlist = async (productId) => {
  if (!state?.user?.userId) {
    toast.error("Please log in to use wishlist.");
    return;
  }

  const isWishlisted = wishlistItems.includes(productId);

  if (isWishlisted) {
    try {
      const res = await Api.post("/cart-wishlist/delete-wishlist-product", { productId });
      if (res.data.success) {
        toast.success("Removed from wishlist");
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error) {
      toast.error("Error removing from wishlist");
    }
  } else {
    try {
      const res = await Api.post("/cart-wishlist/add-to-wishlist", {
        userId: state?.user?.userId,
        productId,
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

  useEffect(() => {
  fetchKidsProducts();
  fetchWishlist();
}, []);


  return (
    <div>
        <Navbar/>
        <div className='kidsnav'>
            <p>BROWSE ALL PRODUCTS FOR KIDS</p>
        </div>
        
        <div className="whatsnew3">
        <div className="whatsnew3-header">
          <h2>WHAT'S HOT ?</h2>
        </div>

        <div
          className="whatsnew3-slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showLeftArrow && isHovered && (
            <button className="slider-arrow5 left" onClick={() => handleScroll("left")}>
              <PiCaretLeftBold />
            </button>
          )}

          {isHovered && (
            <button className="slider-arrow5 right" onClick={() => handleScroll("right")}>
              <PiCaretRightBold />
            </button>
          )}

          <div className="whatsnew3-slider-container" ref={sliderRef}>
            {whathotitem1.slice(0, 5).map((item, index) => {
              // Show 2 images, then 2 videos, then 1 image (based on index)
              const shouldShowImage = index < 2 || index === 4

              return (
                <div className="whatsnew3-card" key={index}>
                  <div className="whatsnew3-hover-container">
                    <div className="whatsnew3-media">
                      {shouldShowImage ? (
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
                    <div className="whatsnew3-details">
                      <div className="whatsnew3-title">{item.title}</div>
                      <div className="whatsnew3-desc">{item.desc}</div>
                      <div className="whatsnew3-spacer"></div>
                      <div className="whatsnew3-category">{item.category}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='kids-carousel-section'>
        <div className='kids-carousel-header'>
            <div className='kids-carousel-title'>adidas x Mercedes-AMG PETRONAS F1</div>
            <div className='kids-carousel-subtitle'>TOP PICKS FOR YOU</div>
        </div>

        <div className='kids-carousel-container'>
            <div className='kids-carousel-wrapper'>
            <button onClick={prevPage} disabled={currentPage === 0} className='kids-carousel-arrow left'>
                <PiCaretLeftBold />
            </button>

            <div className="kids-carousel-list">
              {visibleClothes.map((item, index) => (
                <div className="kids-carousel-card" key={index} onClick={() => router(`/single-product/${item._id}`)}>
                  <div className="kids-card-image">
                    <img src={item.image} alt={item.title} />
                    <div
                      className="kids-wishlist-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item._id);
                      }}
                    >
                      {wishlistItems.includes(item._id) ? (
                        <FaHeart style={{ color: "black", fontSize: "22px", fontWeight: "500" }} />
                      ) : (
                        <PiHeartStraight style={{ color: "black", fontSize: "22px", fontWeight: "500" }} />
                      )}
                    </div>

                  </div>
                  <div className="kids-card-price">₹{item.price}</div>
                  <div className="kids-card-title">{item.title}</div>
                  <div className="kids-card-category">{item.category2}</div>
                </div>
              ))}
            </div>

            <button onClick={nextPage} disabled={currentPage === totalPages - 1} className='kids-carousel-arrow right'>
                <PiCaretRightBold />
            </button>
            </div>

            <div className="kids-carousel-progress-container">
            <div
                className="kids-carousel-progress-bar"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            ></div>
            </div>
        </div>
        </div>

        <div className='kidsclothdesc'>
            <h1>ADIDAS KIDS CLOTHING & KIDS SHOES</h1>
            <p>Whether they’re big kids playing in a weekend tournament or little ones mastering the monkey bars, being a young creator is all about having fun while playing hard. Find girls’ and boys’ shoes to support both their game and their style. Boys’ and girls’ clothing and shoes from adidas are built to give kids of every age and stage comfort and confidence for everything from first steps to personal bests.</p>
        </div>

        <div className='kidscategories'>
          <div className='kidscategories2'>
            <div className='kids-shoes'>
              <p>KID'S SHOES</p>
              <p>Kid's Shoes</p>
              <p>Kid's Football Shoes</p>
              <p>Kid's Sneaker Shoes</p>
              <p>Kid's Slides & Sandals</p>
              <p>Kid's Shoes Sale</p>
            </div>
            <div className='kids-clothing'>
              <p>KID'S CLOTHING</p>
              <p>Kid's Clothing</p>
              <p>Kid's Jerseys</p>
              <p>Kid's Tracksuits</p>
              <p>Kid's Jackets</p>
              <p>Kid's Clothing Sale</p>
            </div>
            <div className='kids-accessories'>
              <p>KID'S ACCESSORIES</p>
              <p>Kid's Bag</p>
              <p>Kid's Caps</p>
              <p>Kid's Socks</p>
              <p>Kid's Football</p>
              <p>Kid's Accessories Sale</p>
            </div>
            <div className='kids-collections'>
              <p>SHOP BY AGE</p>
              <p>8 to 16 - Youth</p>
              <p>4 to 8 - Kids</p>
              <p>0 to 4 - Toddlers</p>
              <p>8 to 16 - Boy Shoes</p>
              <p>8 to 16 - Girls Shoes</p>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Kids