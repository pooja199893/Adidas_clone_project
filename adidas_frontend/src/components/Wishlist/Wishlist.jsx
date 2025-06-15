import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";
import { PiHeartStraightFill } from "react-icons/pi";
import "./Wishlist.css"; // NEW CSS
import Api from "../../axiosconfig";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await Api.get("/cart-wishlist/get-all-wishlist-products");
      if (res.data.success) {
        setWishlistItems(res.data.wishlistProducts);
      }
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems((prev) => prev.filter((p) => p._id !== productId));
    try {
      const res = await Api.post("/cart-wishlist/delete-wishlist-product", { productId });
      if (!res.data.success) {
        toast.error("Failed to remove");
        fetchWishlist(); // restore
      } else {
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Error removing");
      fetchWishlist();
    }
  };

  return (
    <div>
      <Navbar />
        <div className="wishlist-container">
        <div className="wishlist-header">
            <h2 className="wishlist-title">MY WISHLIST</h2>
            <p className="wishlist-count">{wishlistItems.length} ITEM{wishlistItems.length > 1 && 'S'}</p>
        </div>

        <div className="wishlist-content">
          {wishlistItems.length === 1 ? (
            // Layout for single item (side-by-side)
            <>
              <div className="wishlist-left single">
                {wishlistItems.map((product) => (
                  <div className="wishlist-item" key={product._id}>
                    <div className="wishlist-item-img">
                      <img src={product.image} alt="wishlist product" onClick={() => router(`/single-product/${product._id}`)} />
                      <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(product._id)}>
                        <PiHeartStraightFill />
                      </button>
                      <div className="wishlist-price">₹{product.price}</div>
                    </div>
                    <div className="wishlist-product-name">{product.title}</div>
                  </div>
                ))}
              </div>

              <div className="wishlist-right">
                <div className="wishlist-info-box">
                  <h3>Get more from your wishlist through the app</h3>
                  <ul>
                    <li>Instant notifications on items on sale or low in stock</li>
                    <li>Share your wishlist with friends and family</li>
                    <li>See which wishlist items are eligible for a voucher</li>
                  </ul>
                  <div className="scantodownload">
                    <p>Scan to download the adidas app</p>
                    <img src="data:image/webp;base64,UklGRi4CAABXRUJQVlA4WAoAAAAQAAAAlwAAmAAAQUxQSE4BAAAFgLpt2/Hn+fzt48+eVRlXjba4Y3+CotOqjWSrraktKf3ivP1sazbifhExAZD0f9L//wdmUe8fRTvTffg3gZK59RHznwQK6srmN+y/BU2icQwQDBIIgt9H4B4A/PexDwLIaGyY7P2RWAUjSkWak6FcBgYaMRhR+ihnOI4JTiJKYd57HiIkTqFhkrm7Ia8dAU/Yb4rZI2534gWA7M6j4Z+CUmelYmmcVKcj5BGHxQjO+0vU4wqeE35nDD6eS4kLjFQuUdECI2fEu7DMdpp/b5oW21Z2vgtB0yhjkKXKRLmAp3kYv8lpNUYvGYspFLiH74zco2xlRf7QGnxVhCJJXCpTiYlMPFXHU/c3Up/dHvIZ485bN2mKws8pbSq97DEH4Kvm1dOMFw/IImeE9+bebw2iJuI+Cj8w3px3sGuCP2jr+fY9/EmJKCT9n/T/P5IBVlA4ILoAAABwCwCdASqYAJkAPpFIn0snpKMhpggA8BIJaW7hcSBUYZufn3Be4L3Be4L3Be4L3Be4L2/WNmsAsjQDrR8M1rGh/0MPRRK1FIXO6qb6DnOetzX51qJZ359wXuC9wXuC9wXuC8AAAP7+pJ4cgBQ/aqdjMtvCynUv5RzJGv90mZzZ4TpqVrzfb2dtj+8RdNXy47WlPWaf68RB2YpYrAyVCpVetvYfboihgAnvwSf/1+P/9aM//66EAAAAAAA=" alt="arrow" />
                    <img src="data:image/webp;base64,UklGRjYWAABXRUJQVlA4ICoWAADw4gGdASpmBGYEPpFAm0k/o6KhKz/oA/ASCWlu8YDEowdnkfSyUIXnUJ4XrzIPwDbGf/WRoPp+i/8H/AD5hfn//v2/1h64n8A/Iv+AfoB8efwD8BfwG5gL93/gH8A+wD69QAP/70/y/fJX+Af4n+AfwD///wDcj/w7+7fwD+Af+X+Af//+AdmJ/Cv0A/gHuB////nf/8Y01QxgG3Jye/R7/KhjANuTk9+j3+VDGAbcnJ79Hv8qGMA25OT36Pf5UMYBtycnv0e/yoYwDbk5Pfo9/lQxgG3Jye/R7/KhjANuTk9+j3+VDGAbcnJ79Hv8qGMA25OT36Pf5UMYBtycnv0e/yoYwDbk5Pfo9/lQxgG3Jye/R7/KhjANuTk9+j3+VDGAbcnJ79Hv4JwXxFvKFAbUunhaUNer+579HuuOYSLeUKA1wWy/eF8E0CQbXN8Dcmx89o+PKFAbUunhaUODxa6fJyNZYx79Hv8qDH6oYv4wzANuRP1PkUDsRK/xzyv8qGMA25E/U+Tk733GJKsiZLeUKA1iU2BNgJv/m8g7j3YUBtS6eDIvFcglEIaBGYPjZyJxweKrW5kum+l9Yt5QkJ+uH8NycnuzKfqfJye/CS1lh/DbZ3O+Nc7/8HJ19GPWgV0B0kpYlNUMWo1RWuv8qDHtJu5qpQ4Pm+B0kpYiio5sPCAACLKiiXcHilLdmHW0WdIgUL6SWmirUITC2OGWyq2DC9Vh28oT/tR1nRmDSxKaoYBJSiDrnbGEEX7LXT5OTvgiUoaFlFXDe7N0bbKrYMRuD2xh7YMqfqfJyd79lVyXyoMe0ogbZ2UmmoNyJ+jDC2/tOJqhYejNikjHZ4p+hCIcH7B8KkD3IeDjEZ8zye7MqCkEyoYwCyOklN3ejwz5lPqpZMqGATKgyTvmDPg1gp62ASUogjAnJ3v2awH6oYwCyOklN3ejwz5lPqpBGXQW2qK9Cvjn0hIq9X/ZNAiUbONuFMeZQuER1TPJu8EoMYlXE074bk298mkpYlNUMAkpRDLye7Mp9VLJlKY/5cTc7lJttlrp7ESexiVO98kYpLI6VngZ6Pf453gRiGDcifVSySliNxtdf5UMYBsjEG22azLUOMRo0e8VcRJUcNuTkawURmvyhQG19C5Id5jwtIjnMXpfWLeUJff+wTNsZNTNdaRQZUSWZEMdVqmAquGawcJEyW8fQ0o1E9+j3irhvfo9/lKYjRo9/jnlf5UMAkpRBF+yq5KKuGayxj36PDXl8NycnuzIBsEBtS6eFpQ18uNOvu7pUBLlhHXRND5VV3GBWDAGKmiAVxj5YRvocYjPmVBSCSk0inCRbyhQG1DeKxM8kYpNuRP1Pk5Pfo+htKIIv2aA21EawURDjEZ8yn1WKUogz0e/yoYwCyRik25Ap/7k6X1i3lCgNqXTwZGvZrFYAlZAOKnTSTmztDHfdHvNAgKq40kwFK4PvYz+nEkwmHi8GawU9Bhm+dxxdUunhaUOD5vpfMixgG3Jye/R7/KhjANuTb6WPDV8qDHtLEbiad9KcnhjANuTk9+j3+VDF+orW7Dg0q4Vbk5D6IBA7yhP/0d6iQG8gTeTqSQq715a6C4yHEmh/gyBC8ZoAUAYTsRf3hqqp97siUgKtdfwTgviLdhrSOhjANuTk9+En3Znk9+En36IBF+yq2DSrVgZ6PfylELq3jHv0QDPCT79Hv8qGMAnuCAdy0nlE1z2y6C4Rq9kJR5/dkLPVwzV4Jfn7ovOc35tRFJzc5atTcMV6JwTxTd2JL9Gj379voJ31a8dADv9v7IAd83ciGBDGAbcnJ79Hho0e/lRAZrBRERYBWleKuG9+j3+OeV/lKY/ylEGeEuXjHv0e68KRyW6z92+74mEi3Y75IQDRujOLyTZEsYp7215FfNWu76udEHs7KurimhlcTCK4GmZEavqqyLmV3fDEqkmIueRrLD93Plxot1RXqY2uv8qGLUhmx+g9pu7wlEMvgM1go4bIxDYUKOFkdJKWB7LOG92Z5Pfo9/lQxgE9wA74ZExKwBD6SPX4rkvjE0kqTJvNrIcdxqPR5QnxWlwQzs8sF9PxNUfKebDDt3GyxRzBRPlFBe+6Mt9xBTH97tH8DK+riPMVX5VyHDGAbcnJ79Hv5SxG5l9+j3+Od4Gd8NP4YeC4Wuntlrp8ifqfIoKbUavlQxgG3Jye5SxpWWD8iuEVJlOWcRchwXrShwa73+7voqoEGsffpILNNzk09ZDna31xD5/iRMJM6Pe+3FetJ4QYdUUHygXnUOZYG+U2ltuTk9+E1vFSzO3vkjFJttlPxc0Db4oJqkcQbk/84UgkpYjceuJr+GG00RFjANuTb5+mUpj4q4b36PeKuG9+En3ZlP1Pk5GufWwY/yliU1QY/OeV/lQvsK5Q/sdv4hO4e1q6H1aPjG1fhkVouNjVKSJHofebYaFNEArjOXEaSqQhFgtJzfS3CyOkylWHwG1nHKCBnn2yVRPfo94rXX8pYlGlEEYE2+G5OT36IBno8M+bo3Jt75IxSWSMPCLFqIsYBttlrp6wBV1gZ6noZ+zZ9tmnKIv0+dqXVLp4UyLwgjYbf9vBj2miu+v8I1TOuUgmFCV2Ys6VkNBQ7uURkzinGvrFx4sqGMAskYpNts1gP1QxfxgERK/xzyvFa6GfNpynG4JSxWuho0QGXk9+j3+Upj/lQvQvejD7He86aJI2Zf+4OUVfEqNxDV+rigfxm8Lo17k6XrjdwLTbDikGRwA7wKEdFAX36EhzUUrWYWSs2zSvyq50aIOBOrEpqhgEyoYwDbk298jpNqJpVcN79Hv8qGL+MMwDbk5GssP3yX/Rg+Z5Pfo8M7bgSiIcs3zJ/r29MpCCw66GDgW6uZz9yEObLShwfN9L6xbyhKwlmTiXTwtKHB83jiB7gbVAexVhs6OCwRrtdf5UGPaapgpt3S/aowCZSmlWuv8qGMA25NvzzvwACIY51JPuzdG5OT36PeKqLmY5fFZ0D2Qc75+BqcOVkTJbrReRYW6Is5ejFNCKHXRGQmUvnjar/VuX6LlmFCxwz/BwtHpdO03JlEAFj24glYIRK9QgnkRTVLh6I3lxw25ORrLGPfiHD3+OeV4rXX8pYHqoE2/H1EUm3In1UskpRBGBOT3Znk9+jw0aPdYEmu/bd/ofnp4N59CqeQDg8jfS+rSVys4eMyo4T2+3ycdwIFCpQ1iNmqL+MAe0mwsQvxPqaMRrki3oICf9qOKkMCcnv0QDPR4aNHhuD2wEv4ULc1rvoKY/5SmP8pu7wktYKOFkdJlKaUaie/R7xVUemnEGbIA+ffgaEEM2fEP0aXXCKQfssCZDFTxEsKDxa5f2V9zr9XqBx6N6DI1LYBILNQrePlSlLjKSDZlN7lZ9euoLndDpJFwWy1df453gRfs0Bc1KbznzwAEUlUP4wDZF9Jynh4avjnldcYmxmGqGMA25OT36PDPmQOKoe1iY5q7C3UWxhm0zRUO7cUl7EkYIIaYzWkx1CB/C6ytAsKwrRG8FmjmUvplQKdbrzXosVZrMsUdJX5G5vkT8yuPVIwEmNUCU6eFpQZinJ78JLWWr2ZEJ2p79a9zsjan8n9BMfqUx/lKIZeUjZ8uLdFXDe/R4aNHv8pTEaNHv8pTH/Khi/jDLURYtRFgEylMRr1Pfo9/lKYjXqe/CT79Hv5dNIv8qGLWdvKFAI9JtZ+GU33Uxgj9fVY6rU/5VcMk4n5Lgu5HmgfNgTb+ODe2LNf830vb+QjWTSHjTP35vpfa0RSbcnJ79Hv8qGMA22zQFXG1YGWZT6qWTKhi/RB2eiLF/GYZzyv8qGMA25Nm4GJMPC0ocHzfS+sW7qFDjuU+JUXO/9psiYZLaEw1us7lVEGK5uepA89XpwG1Lk7z/D4w6yAtO2ZcsqdPAZkSIvoySPU9+j3+VDAJlQxgG3Jyd79mswEyoYwCyRh4OMf8qGLUOMRnzdG5E/U+Tk9+j3iq1i8/S6eFpQ4PkU88D8QSBcC4kQFHrm6orp8m3w22UqG2101LpwRK84Ybhc7By7GxmuASQ8kaqyLPxAuxG0ttycne/Za6fJye7Mp9VfVcS3ip6PDRogGej38pYHstXQ1n+p8g7UXdljHv0QCL71t1dYt5QnVEEX2p2sj0xUMjImWyzapjspxnK+wUlI3Nv2e/1Kr8ybwPE/2MyCIBy4Nts4x/l3m1kOiuZb1Kqva1noqTlXyf3S/KhgElKIZeT3ZlPqqWohxiNaApwDYMbOoCfqaMQbi0AIhhfr6/EpqhjANuTb3yOlaV/jneBGBNc2mBf7M9Ul5V9Zmd4Zy4cSP/UclfcvmViLja6/eN3/huqXTd958sQ/vBY2cBemJhIFlQxgFkdJKbu9HhnzKfqfJyNcUavjnlf5UGPaWJTUpwgEUncrxVcKe2Rtdf5SmIz5ujcm3vkdJlHtvGhPm4IyMq30122EXoznzPIZDOkRqsL5q149gCIw/yhvecgNu9FvKEo2rM4711DCHmXxMi0/VDGAWR0kpu70eGfMp+povzeFk0lKIM8JPuzacMv4wzANufMfA0sgi9Hv8pTEZ0Y105Yt5QoCq4Zq80un0L94hUdOnJbt58KbfFPqqIeEV6Rm80EAAzHzih4nkC2/tOBQp12dl9xXRwnIhMOrICrXX+VBj2liU1QxfxgD2liU9qW3WocY/yliUz0VjuWcRLoJ8tsAkpwlm8Y9+iANMo8PzfS+sW8oSaETGpRA2ecHzfS+sVerxQHer/uwxki8vD5vpexBK3GuguMMLJtzzUHlDYEEoo9lxwfCpAlikwS0/VDGAWSM7W+Nc8AAaev2VW2xgG22gC25+wiGOOiXLxu/pyJPNRVbbkP4bcnJ3wJye/R7/Kgx7SiDPR7/HPK/yoYwDbbNZmAWSMPBxiNGj3+VDGAWidYt5QoDal08LShWo77Jxj36IY8LShwfN9L6xbx92MAtE6xbPkUCuhjANuTk9+j3+VDGAbcnJ79Hv8qGMA25OT36Pf5UMYBtycnv0e/yoYwDbk5Pfo9/lQxgG3Jye/R7/KhjANuTk9+j3+VDGAbcnJ79Hv8qGMA25OT36Pf5UMYBtycnv0e/yoYwDbk5Pfo9/lQxgG3Jye/R7/KhjANuTk9+j3+VDGAbcnJ79Hv8qGMA25OT36Pf5UMYBr4AD+/ycwAAAAAAAAAAAH3WtwQBLGK7eSk9nOWdyJayXwmVMwYCo4nV44OvWbeXvM0q323BO5OmQebJ37Lrv//xDCTnOlz5qFnsPxPo42H4fcdbcSFfv//4hhAkGXwUVJ8HIcHXrNvMa226HFC5NnfWtwQBK71I+IzA8D+xuGTEJT4A4jaBhLVM5+fPjbP71+ORjituulvMYgLvHctGVd95W8lJ4b1rcEASxi26K2STaXqNlMghgJUhKM0Jt6Tt6fCmoPyI67SlefNSACV+ppYu68EFKgARCX5XDK3XbuCkrm7f97enwjWLmU4BtPFihjbkODr1m3lGNzcBvH0/8Ax9jeZqQFL26AAAADV4T19sPxP84nx/5PZ9Bn256bS+4AAwwut6A+pflcdyc3QC5P7G4ZMQlBxNQxRbfmXm9DiuHTKUDa/xWyetbggCVz9FzlQrNVbdJ/Y3DJfckmrO1j9m8VjAKchYPRLWAAEGO/+pspf2U+FJnSdv80AAVvgLy6VAWJAgYX5S5uA3j7FJzRdq8PA5ZR5nXQ3eHhcbn/FXTS4PHeJ4YSfzlFt+Zebxj7eddKgLEgOuQ7xPDBjZCocfqX5IO8TwwSZH9jcMmISi9DgwyVouBYzdYxkWXL5JJKjaaQhZlJznSP93BGaJjHcWAx4PyN5g9dpQ6V3Emmfd5YLHyHChGZMxUDyHB16zby+B6LD/M66G7w8A8zrobvJbhAbB3OmNBdeMIDr5tmn/G5F327nFprUBdFppxPUA9IGGStFwL9kqwoulQFiQHqtupdzcBvH3eNvIBo8mM77GA75U5Ekhvo26RaacT0KtOGlhZw6zH7VsQa7LMhxBDeigQDQGRgUJCd51I9J20kQlGH0ntLdn6FarqEAlvzPBFBT0wAHUTUfCUozbfYhOeznKyIQWUqE6WJwtNOJ6+fuNk4OvWbeT864SlHjT/5OJyt127gypaDXRn65u3/e3SDm4DePu395SoadbLC6VAWJAd6jQEZY9zLHh/yPTWtwQBJaLwptrSaXcsXHSaFnxOPYIOK8XuNJPQTA4av4Ukqv1AAAD2ez6clX1P/g0Bd5YFJL37MXAD7/J+BwA+/3X2Vwnt6GG6PwoTv+FGyJm157m7f97g2sFFt+Zebqx7M0Tg69Zt5jPvYf7c3Abx93DEDb4wgvmoiWrojg69Zt4Hkgbtip7AQkGHqDVW2QOrGu6k3yirNYP05r0AHtNTjcCd7uCNAgE5JpHbHMndwQcYPU6h/SSH1ZZJo8+KKRVs/meGxsbDThTJwaOAdUtowkg9Qaq5Pa7vaT6dW4eMMIL5qNImmtn3Qptf5uda3BAEsUS7q7XqwVCWy9hbUQhHVKBs1XJdY07hKUnA94EKGgGUrddu4Lfazf8QMewBxtuAShiT5qu9OoIYhKL5fUM5+Z4K7GUth45J+hcH/ns+nKME//8YgIQlF6ggAPjJz0KNFiEU4RIlkgHqDVv8wiC2PDMi4SlJxqiuVXrVFvkklmKIa/qwVCW3DW01KUDZihc3Abx93NmEcoprL5SjvE8MFCFRsROEAuH1oADJ38HEJRe6PZ9GYXjKWxCZXhok2PtL8XtuQhhT00hkl6SbhTQIPEvCXsn/KLt4Wzrw4HNsAxFbrt3BlORDDJWi4Qd0a61uCAJYowBn1YKhLbf5MaAjLHrZODr1m3YIeLK3XbuCpCcs3gkF9oMtrqZDLgTtuyJmPg9dmUkxNYBhmMJlTMGAbAB9KNVfrC33ClF8IrV1m02FMSH6RgAAAdb2fQZNufW0vx3v29cA3BusZnzUm9P0Kxn/yp1M/Qq2XeWYqsBVnePEArDszfWtwQBLGKwxU7ftleC0nILKVCbnd7mWxw6cs3JjQXXjDR3ei7V4dbdpwg82TuEypmDATfjJphVFt+ZebnIUYA8SbLPiQtth+Eo+YLJFQBfcflFIqSz4kMbAD7LcqcmktlKzgAeta3BAEsa8Z3HDDJWi4Xlj7UYrwCiCylQnHaMV4jSm9kGGStFwoLw4U7X7yqN8bI+5wdes28rW7ryeznLO5Etu1HbKVkTMmR5dzLbK8A5W67dwXxhXNwG8fWJcDZha8ZhsDLmUAkyEozQpMU9MFjkmkdQKzYfh9xwA8ShZFU3ajeMi4SlJyQiyS5uA3j7FdU5ZupCR1/R+KCEhhkrRcL+wHsTgWmnE9VqxeFprRd9a3BAEsRrjYoG7XgJpLMUXjzhjzyiilWAAGlgB9/MCy8KiK8M+tdh+FN93BGbh7+B1XPKHqDhIntylVzckMvARKX5V055dx6LnKha5G96jFeB/xWNFhhD1+8+rLOVuu3cGU5lMwuL6oz0e89INNa3BAEiCzOuhu8hHcoz4pNzQFFv+Nkn/7QAAAAAAAAAAAAAAAAAAAAAAA" alt="qr" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Layout for 2+ items (stacked)
            <div className="wishlist-stack-layout">
              <div className="wishlist-grid">
                {wishlistItems.map((product) => (
                  <div className="wishlist-item" key={product._id} onClick={() => router(`/single-product/${product._id}`)}>
                    <div className="wishlist-item-img">
                      <img src={product.image} alt="wishlist product" />
                      <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(product._id)}>
                        <PiHeartStraightFill />
                      </button>
                      <div className="wishlist-price">₹{product.price}</div>
                    </div>
                    <div className="wishlist-product-name">{product.title}</div>
                  </div>
                ))}
              </div>

              <div className="wishlist-right-full">
                <div className="wishlist-info-box">
                  <h3>Get more from your wishlist through the app</h3>
                  <ul>
                    <li>Instant notifications on items on sale or low in stock</li>
                    <li>Share your wishlist with friends and family</li>
                    <li>See which wishlist items are eligible for a voucher</li>
                  </ul>
                  <div className="scantodownload">
                    <p>Scan to download the adidas app</p>
                    <img src="data:image/webp;base64,UklGRi4CAABXRUJQVlA4WAoAAAAQAAAAlwAAmAAAQUxQSE4BAAAFgLpt2/Hn+fzt48+eVRlXjba4Y3+CotOqjWSrraktKf3ivP1sazbifhExAZD0f9L//wdmUe8fRTvTffg3gZK59RHznwQK6srmN+y/BU2icQwQDBIIgt9H4B4A/PexDwLIaGyY7P2RWAUjSkWak6FcBgYaMRhR+ihnOI4JTiJKYd57HiIkTqFhkrm7Ia8dAU/Yb4rZI2534gWA7M6j4Z+CUmelYmmcVKcj5BGHxQjO+0vU4wqeE35nDD6eS4kLjFQuUdECI2fEu7DMdpp/b5oW21Z2vgtB0yhjkKXKRLmAp3kYv8lpNUYvGYspFLiH74zco2xlRf7QGnxVhCJJXCpTiYlMPFXHU/c3Up/dHvIZ485bN2mKws8pbSq97DEH4Kvm1dOMFw/IImeE9+bebw2iJuI+Cj8w3px3sGuCP2jr+fY9/EmJKCT9n/T/P5IBVlA4ILoAAABwCwCdASqYAJkAPpFIn0snpKMhpggA8BIJaW7hcSBUYZufn3Be4L3Be4L3Be4L3Be4L2/WNmsAsjQDrR8M1rGh/0MPRRK1FIXO6qb6DnOetzX51qJZ359wXuC9wXuC9wXuC8AAAP7+pJ4cgBQ/aqdjMtvCynUv5RzJGv90mZzZ4TpqVrzfb2dtj+8RdNXy47WlPWaf68RB2YpYrAyVCpVetvYfboihgAnvwSf/1+P/9aM//66EAAAAAAA=" alt="arrow" />
                    <img src="data:image/webp;base64,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" alt="qr" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
