import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "../Home/Home.css"
import { HiArrowLongRight } from "react-icons/hi2";
import { PiHeartStraight } from "react-icons/pi";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import Footer from '../Footer/Footer';
import Api from '../../axiosconfig';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";

const ITEMS_PER_PAGE = 4;
const cardWidth = 330; // width of one card
const scrollStep = cardWidth * 4;
const Home = () => {
  const router = useNavigate();
    const { state } = useContext(AuthContext);
    const {id}=useParams();
  const[buyshoes,setBuyshoes]=useState([])
  const [wishlistItems, setWishlistItems] = useState([]);


const[whathotitem,setWhathotitem]=useState([{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/tc_ZNE_37ef896079.jpg",title:" Z.N.E. TANK SIGNED BY DECLAN RICE",desc:"Win a women's tee or tank from the new ADIDAS Z.N.E. range signed by Declan Rice.",category:"SIGN UP NOW"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/100_thives_tc_beb7dbad84.jpg",title:"adidas x 100 Thieves",desc:"Digital Explorer, Analog World.",category:"Shop now"},
{itemimg:"https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_800,w_800/global_move_for_the_planet_brand_ss25_launch_sustain_Onsite_TC_d_695263252d.mp4",title:"MOVE FOR THE PLANET",desc:"Track your movement to make an impact.",category:"Join challenge"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/t_C_5_1_39e8a83c13.jpg",title:"WIN THE NEW SS25 SUPERNOVA!",desc:"Redeem your points and enter the raffle for a chance to own your piece. Don’t miss out!",category:"Enter now"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/tc_2_2_6857c6a386.jpg",title:"Play your best Padel",desc:"Get ready for your next Padel session with the best from adidas.",category:"SHOP NOW"},
{itemimg:"https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_800,w_800/global_the_original_originals_ss25_sustain_hp_superstar_teaser_carousel_asset_d_61d87fb8e0.mp4",title:"The Original Superstar",desc:"From the court to the street.",category:"Shop now"},
{itemimg:"https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_800,w_800/global_motorsports_motorsports_ss25_sustain_hp_catlp_glp_navigation_card_teaser_6_d_e388143ea8.mp4",title:"Show Your Passion",desc:"The adidas x Mercedes-AMG PETRONAS F1 Fanwear collection.",category:"SHOP NOW"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/TC_Never_out_of_style_2_282e2aa284.gif",title:"Never Out Of Style",desc:"Shop the best of adidas",category:"SHOP NOW"}])

const[selectsportitem,setSelectsportitem]=useState([{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/cricket_TC_eb127c1142.jpg",title:"CRICKET"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/running_d_79c8219795_6bcee20cc4.jpg",title:"RUNNING"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/training_d_a5c2eb1789.jpg",title:"TRAINING"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/football_d_6dd2ca489e.jpg",title:"FOOTBALL"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/basketball_d_3c3c58f008.jpg",title:"BASKETBALL"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/tennis_d_84458b28fe.jpg",title:"TENNIS"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/golf_d_8f6a5ceae9.jpg",title:"GOLF"},
{itemimg:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/swimming_d_13c2016e02.jpg",title:"SWIMMING"}])

const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef2 = useRef(null);
  const [showLeftArrow2, setShowLeftArrow2] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(buyshoes.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleShoes = buyshoes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const [slideIndex, setSlideIndex] = useState(0);

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

const handleScroll2 = (direction) => {
  if (!sliderRef2.current) return;
  const container = sliderRef2.current;

  const scrollAmount2 = direction === "right" ? scrollStep : -scrollStep;

  container.scrollBy({
    left: scrollAmount2,
    behavior: "smooth",
  });

  setShowLeftArrow2(container.scrollLeft + scrollAmount2 > 0);
};

const fetchHomeProducts = async () => {
    try {
      const response = await Api.get("/product/home");
      if (response.data.success) {
        setBuyshoes(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching home products:", error);
    }
  };

  const fetchWishlist = async () => {
    if (!state?.user?.userId) return; // Don't fetch if no user

    try {
      const res = await Api.get(`/cart-wishlist/user-wishlist/${state.user.userId}`);
      if (res.data.success) {
        // Store only product IDs for quick check
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
          userId: state.user.userId,
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
  fetchHomeProducts();
  if (state?.user?.userId) {
    fetchWishlist();
  }
}, []);


  return (
    <div>
        <Navbar/>
        <div className='findyoursummerlook'>
            <img src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/HP_MH_1_10ebaf5c6d.jpg'/>
            <div id="summercolltext1">
              <p>SUMMER COLLECTION</p>
            </div>
            <div id="summercolltext2">
              <p>Amp Your Style - It's Time to Shine</p>
            </div>
            <div id="summercollshopnow">
              <div><p>SHOP NOW</p></div> <div><HiArrowLongRight  style={{color: "black", fontSize: "26px", fontWeight:"500px"}}/></div>
            </div>
            <div id="summercollshopnow2"></div>
        </div>

        <div id="shopbestofsum">
          <div id="shopbestofsumtext1">
            <p>Shop Best of Summer</p>
          </div>
          <div id="shopbestofsumimgs">
            <div class="shopbestofsumimg-wrapper">
              <div class="shopbestofsumimg" id="shopbestofsumimg1"></div>
              <div class="shopbestofsumimgtext1">Shorts</div>
            </div>
            <div class="shopbestofsumimg-wrapper">
              <div class="shopbestofsumimg" id="shopbestofsumimg2"></div>
              <div class="shopbestofsumimgtext2">T-Shirts</div>
            </div>
            <div class="shopbestofsumimg-wrapper">
              <div class="shopbestofsumimg" id="shopbestofsumimg3"></div>
              <div class="shopbestofsumimgtext3">Slides</div>
            </div>
          </div>
        </div>

        <div className='buytwoormoreshoes'>
          <div className='buytwoormoreshoestext'>
            <div className='buytwoormoreshoestext1'>BUY 2 OR MORE, SAVE AN EXTRA 20%!</div>
            <div className='buytwoormoreshoestext2'>See all</div>
          </div>
          <div className='shoeclothaccess'>
            <div className='shoes'>SHOES</div>
            <div className='clothing'>CLOTHING</div>
            <div className='accessories'>ACCESSORIES</div>
          </div>
          <div className='slider-container'>
            <div className='shoe-slider-wrapper'>
              <button onClick={prevPage} disabled={currentPage === 0} className='nav-arrow left'>
                <PiCaretLeftBold />
              </button>

              <div className="shoelist-wrapper">
              {visibleShoes.map((buymoreshoes, index) => (
                <div className="differentshoes" key={index} onClick={() => router(`/single-product/${buymoreshoes._id}`)}>
                  <div className="diffrentshoesimg">
                    <img src={buymoreshoes.image} alt={buymoreshoes.title} />
                    <div id="heart"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(buymoreshoes._id);
                      }}
                    >
                      {wishlistItems.includes(buymoreshoes._id) ? (
                        <FaHeart
                          style={{ color: "black", fontSize: "22px", fontWeight: "500" }}
                        />
                      ) : (
                        <PiHeartStraight
                          style={{ color: "black", fontSize: "22px", fontWeight: "500" }}
                        />
                      )}
                    </div>

                  </div>
                  <div className="differentshoesprice">₹{buymoreshoes.price}</div>
                  <div className="differentshoestitle">{buymoreshoes.title}</div>
                  <div className="differentshoescategory">{buymoreshoes.category}</div>
                </div>
              ))}
            </div>

              <button onClick={nextPage} disabled={currentPage === totalPages - 1} className='nav-arrow right'>
                <PiCaretRightBold />
              </button>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className='supernovarise'>
            <img src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/global_supernova_running_ss25_early_access_hp_catlp_banner_hero_d_e43a8f24a0.jpg'/>
            <div id="supernovarisetext1">
              <p>Supernova Rise 2</p>
            </div>
            <div id="supernovarisetext2">
              <p>Running is never easy, but with the Supercomfort of</p>
            </div>
            <div id="supernovarisetext3">
              <p>Supernova, it's always nice.</p>
            </div>
            <div id="supernovarisewomen">
              <div><p>Women</p></div> <div><HiArrowLongRight  style={{color: "black", fontSize: "26px", fontWeight:"500px"}}/></div>
            </div>
            <div id="supernovarisemen">
              <div><p>Men</p></div> <div><HiArrowLongRight  style={{color: "black", fontSize: "26px", fontWeight:"500px"}}/></div>
            </div>
        </div>

        <div className="whatshot">
          <div className="whatshot-header">
            <h2>WHAT'S HOT ?</h2>
          </div>

          <div
            className="whatshot-slider-wrapper"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            {showLeftArrow2 && isHovered2 && (
              <button className="slider-arrow2 left" onClick={() => handleScroll2("left")}>
                <PiCaretLeftBold />
              </button>
            )}

            {isHovered2 && (
              <button className="slider-arrow2 right" onClick={() => handleScroll2("right")}>
                <PiCaretRightBold />
              </button>
            )}

            <div className="whatshot-slider-container" ref={sliderRef2}>
              {whathotitem.map((item, index) => {
                const isVideo = item.itemimg.endsWith(".mp4");
                return (
                  <div className="whatshot-card" key={index}>
                    <div className="hover-container">
                      <div className="whatshot-media">
                        {isVideo ? (
                          <video src={item.itemimg} muted autoPlay loop playsInline />
                        ) : (
                          <img src={item.itemimg} alt={item.title} />
                        )}
                      </div>
                      <div className="whatshot-details">
                        <div className="whatshot-title">{item.title}</div>
                        <div className="whatshot-desc">{item.desc}</div>
                        <div className="whatshot-spacer"></div> 
                        <div className="whatshot-category">{item.category}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      <div className='pictureperfect'>
            <img src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/MH_28c847a0d8.jpg'/>
            <div id="pictureperfecttext1">
              <p>PICTURE PERFECT</p>
            </div>
            <div id="pictureperfecttext2">
              <p>Wear these vacation looks on repeat.</p>
            </div>
            <div id="pictureperfectshopnow">
              <div><p>SHOP NOW</p></div> <div><HiArrowLongRight  style={{color: "black", fontSize: "26px", fontWeight:"500px"}}/></div>
            </div>
            <div id="pictureperfectshopnow2"></div>
        </div>

        <div className='selectsport'>
          <div className="selectsport-header">
            <h2>SELECT YOUR SPORT, FIND YOUR GEAR, AND GET IN THE GAME !</h2>
          </div>

          <div
            className="selectsport-slider-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {showLeftArrow && isHovered && (
              <button className="slider-arrow2 left" onClick={() => handleScroll("left")}>
                <PiCaretLeftBold />
              </button>
            )}

            {isHovered && (
              <button className="slider-arrow2 right" onClick={() => handleScroll("right")}>
                <PiCaretRightBold />
              </button>
            )}

            <div className="selectsport-slider-container" ref={sliderRef}>
              {selectsportitem.map((item, index) => (
                <div className="selectsport-card" key={index}>
                  <div className="hover-container">
                    <div className="selectsport-media">
                      <img src={item.itemimg} alt={item.title} />
                    </div>
                    <div className="selectsport-details">
                      <div className="selectsport-title">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='popularrightnow'>
          <p>Popular right now</p>
          <div className="popularrightnow-flex">
            <div className='popularrightnowtext'>samba</div>
            <div className='popularrightnowtext'>adizero</div>
            <div className='popularrightnowtext'>spezial</div>
            <div className='popularrightnowtext'>shoes</div>
            <div className='popularrightnowtext'>bag</div>
            <div className='popularrightnowtext'>cap</div>
          </div>
        </div>

        <div className='adidasdesc'>
          <h1>ADIDAS SPORTS SHOP FOR PERFORMANCE, STYLE & INNOVATION – SINCE 1949</h1>
          <p>Sport keeps us fit. Keeps you mindful. Brings us together. Through sport, we have the power to change lives—through stories of inspiring athletes, innovative technology, and by helping you get up and move.</p>
          <p>Find high-performance activewear and sportswear built with the latest technology to help you push your limits. Whether you’re a runner, a basketball player, a footballer, or someone who just loves to stay active, our sports shop is your home. We’re here to help you train harder, run faster, and go further, with products that keep up with your movement and support your goals.</p>
          <p>Explore our online store for the latest adidas collections, where innovation meets style. From the yoga teacher spreading the joy of movement to the weekend hiker escaping the city, we support everyone striving to be their best. The sports shop at adidas offers performance gear for all levels—whether you’re an elite athlete, a fitness enthusiast, or just starting your journey. Our online store ensures that wherever you are, you can access the latest gear designed for movement.</p>
          <p>The adidas sports store is more than just a place to shop—it’s a space for creators to elevate their game and redefine what’s possible. Every item in our sports shop is crafted with performance, durability, and attention to detail in mind, helping you move with confidence. At adidas, we partner with the best in the industry to co-create, ensuring every piece of apparel supports movement, self-expression, and an active lifestyle. Wherever your sport takes you, our sports shop has you covered—helping you take every step toward greatness.</p>
          <img src='https://cdn.hyprop.co.za/image/2023/7/25/e6282914-7b4a-4a7a-9112-33abe479dd5a/e0803ee7-cdd8-4cde-ad38-a297e330ff75.jpg'/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home